using Microsoft.EntityFrameworkCore;
using ProjetoIMC.Models;

namespace ProjetoIMC.Data
{
    public class AppDbContext : DbContext
    {
        public DbSet<Aluno> Alunos { get; set; }
        public DbSet<Imc> Imcs { get; set; }

        public AppDbContext(DbContextOptions<AppDbContext> options) : base(options) { }
    }
}
