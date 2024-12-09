import React, { useState, useEffect } from 'react';
import axios from 'axios';

interface Imc {
id: number;
nome: string;
sobrenome: string;
altura: number;
peso: number;
value: number;
classificacao: string;
dataCriacao: string;
}

const ListarImc: React.FC = () => {
    const [imcs, setImcs] = useState<Imc[]>([]);
    const [mensagem, setMensagem] = useState<string | null>(null);

    useEffect(() => {
        const fetchImcs = async () => {
            const response = await axios.get('/api/imc/listar');
            setImcs(response.data);
        };

        fetchImcs();
    }, []);

    const handleAlterar = async (imc: Imc) => {
        try {
            await axios.put(`/api/imc/alterar/${imc.id}`, imc);
            setMensagem('IMC alterado com sucesso!');
        } catch (error) {
            if (axios.isAxiosError(error)) {
                setMensagem(error.response?.data?.message || 'Erro ao alterar IMC.');
            } else {
                setMensagem('Erro desconhecido ao alterar IMC.');
            }
        }
    };

    return (
        <div>
            <h2>Lista de IMCs</h2>
            {mensagem && <p>{mensagem}</p>}
            <table>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Nome</th>
                        <th>Sobrenome</th>
                        <th>Altura</th>
                        <th>Peso</th>
                        <th>IMC</th>
                        <th>Classificação</th>
                        <th>Data de Criação</th>
                        <th>Ações</th>
                    </tr>
                </thead>
                <tbody>
                    {imcs.map(imc => (
                        <tr key={imc.id}>
                            <td>{imc.id}</td>
                            <td>{imc.nome}</td>
                            <td>{imc.sobrenome}</td>
                            <td>
                                <input
                                    type="number"
                                    value={imc.altura}
                                    onChange={(e) => setImcs(imcs.map(i => i.id === imc.id ? { ...i, altura: parseFloat(e.target.value) } : i))}
                                />
                            </td>
                            <td>
                                <input
                                    type="number"
                                    value={imc.peso}
                                    onChange={(e) => setImcs(imcs.map(i => i.id === imc.id ? { ...i, peso: parseFloat(e.target.value) } : i))}
                                />
                            </td>
                            <td>{imc.value.toFixed(2)}</td>
                            <td>{imc.classificacao}</td>
                            <td>{new Date(imc.dataCriacao).toLocaleDateString()}</td>
                            <td>
                                <button onClick={() => handleAlterar(imc)}>Salvar</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>);};
export default ListarImc;