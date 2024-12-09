using Microsoft.EntityFrameworkCore;
using ProjetoIMC.Models;
using ProjetoIMC.Data;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddDbContext<AppDbContext>(options =>
    options.UseSqlite($"Data Source=Alisson.db"));

var app = builder.Build();

app.MapPost("/api/aluno/cadastrar", async (Aluno aluno, AppDbContext db) =>
{
    var existeAluno = await db.Alunos.AnyAsync(a => a.Nome == aluno.Nome && a.Sobrenome == aluno.Sobrenome);
    if (existeAluno)
    {
        return Results.BadRequest(new { message = "Aluno com nome/sobrenome já existente." });
    }

    db.Alunos.Add(aluno);
    await db.SaveChangesAsync();
    return Results.Created($"/api/aluno/{aluno.Id}", aluno);
});

app.MapPost("/api/imc/cadastrar", async (Imc imc, AppDbContext db) =>
{
    var aluno = await db.Alunos.FindAsync(imc.AlunoId);
    if (aluno is null)
    {
        return Results.BadRequest(new { message = "Aluno não encontrado." });
    }

    imc.Value = imc.Peso / (imc.Altura * imc.Altura);
    imc.Classificacao = ClassificarImc(imc.Value);
    imc.DataCriacao = DateTime.UtcNow;

    db.Imcs.Add(imc);
    await db.SaveChangesAsync();
    return Results.Created($"/api/imc/{imc.Id}", imc);
});

app.MapGet("/api/imc/listar", async (AppDbContext db) =>
{
    var imcs = await db.Imcs
        .Include(imc => imc.Aluno)
        .Select(imc => new
        {
            imc.Id,
            imc.Aluno.Nome,
            imc.Aluno.Sobrenome,
            imc.Altura,
            imc.Peso,
            imc.Value,
            imc.Classificacao,
            DataCriacao = imc.DataCriacao
        })
        .ToListAsync();
    return imcs;
});

app.MapGet("/api/imc/listarporaluno/{alunoId}", async (int alunoId, AppDbContext db) =>
    await db.Imcs.Where(imc => imc.AlunoId == alunoId).ToListAsync());

app.MapPut("/api/imc/alterar/{id}", async (int id, Imc updatedImc, AppDbContext db) =>
{
    var imc = await db.Imcs.FindAsync(id);
    if (imc is null) return Results.NotFound();

    imc.Altura = updatedImc.Altura;
    imc.Peso = updatedImc.Peso;
    imc.Value = imc.Peso / (imc.Altura * imc.Altura);
    imc.Classificacao = ClassificarImc(imc.Value);

    await db.SaveChangesAsync();
    return Results.NoContent();
});

string ClassificarImc(double imc)
{
    if (imc < 18.5) return "Abaixo do peso";
    if (imc < 24.9) return "Peso normal";
    if (imc < 29.9) return "Sobrepeso";
    return "Obesidade";
}

app.Run();