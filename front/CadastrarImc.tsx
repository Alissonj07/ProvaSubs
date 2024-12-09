import React, { useState, useEffect } from 'react';
import axios from 'axios';

interface Aluno {
    id: number;
    nome: string;
    sobrenome: string;
}

const CadastrarImc: React.FC = () => {
    const [alunos, setAlunos] = useState<Aluno[]>([]);
    const [alunoId, setAlunoId] = useState<number | null>(null);
    const [altura, setAltura] = useState<number>(0);
    const [peso, setPeso] = useState<number>(0);
    const [mensagem, setMensagem] = useState<string | null>(null);

    useEffect(() => {
        const fetchAlunos = async () => {
            const response = await axios.get('/api/aluno/listar');
            setAlunos(response.data);
        };

        fetchAlunos();
    }, []);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const response = await axios.post('/api/imc/cadastrar', { alunoId, altura, peso });
            setMensagem('IMC cadastrado com sucesso!');
        } catch (error) {
            setMensagem(error.response?.data?.message || 'Erro ao cadastrar IMC.');
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <select value={alunoId || ''} onChange={(e) => setAlunoId(parseInt(e.target.value))} required>
                <option value="" disabled>Selecione um aluno</option>
                {alunos.map(aluno => (
                    <option key={aluno.id} value={aluno.id}>
                        {aluno.nome} {aluno.sobrenome}
                    </option>
                ))}
            </select>
            <input
                type="number"
                value={altura}
                onChange={(e) => setAltura(parseFloat(e.target.value))}
                placeholder="Altura (m)"
                step="0.01"
                required
            />
            <input
                type="number"
                value={peso}
                onChange={(e) => setPeso(parseFloat(e.target.value))}
                placeholder="Peso (kg)"
                step="0.1"
                required
            />
            <button type="submit">Cadastrar IMC</button>
            {mensagem && <p>{mensagem}</p>}
        </form>);};
export default CadastrarImc;