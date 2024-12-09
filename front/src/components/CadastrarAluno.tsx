import React, { useState } from 'react';
import axios from 'axios';

const CadastrarAluno: React.FC = () => {
    const [nome, setNome] = useState('');
    const [sobrenome, setSobrenome] = useState('');
    const [mensagem, setMensagem] = useState<string | null>(null);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            await axios.post('/api/aluno/cadastrar', { nome, sobrenome });
            setMensagem('Aluno cadastrado!');
        } catch (error: any) {
            setMensagem(error.response?.data?.message || 'Erro no cadastro do aluno.');
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <input
                type="text"
                value={nome}
                onChange={(e) => setNome(e.target.value)}
                placeholder="Nome"
                required
            />
            <input
                type="text"
                value={sobrenome}
                onChange={(e) => setSobrenome(e.target.value)}
                placeholder="Sobrenome"
                required
            />
            <button type="submit">Cadastrar Aluno</button>
            {mensagem && <p>{mensagem}</p>}
        </form>);};
export default CadastrarAluno;