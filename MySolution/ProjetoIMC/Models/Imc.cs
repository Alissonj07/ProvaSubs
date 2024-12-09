namespace ProjetoIMC.Models
{
    public class Imc
    {
        public int Id { get; set; }
        public double Value { get; set; }
        public double Altura { get; set; }
        public double Peso { get; set; }
        public string Classificacao { get; set; }
        public int AlunoId { get; set; }
        public Aluno Aluno { get; set; }
        public DateTime DataCriacao { get; set; }
    }
}
