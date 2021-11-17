import { useState, useEffect } from 'react';
import axios from 'axios';
import Cabecalho from '../../components/cabecalho/cabecalho';

export default function ConsultasMedicos() {
    const [listaConsultas, setListaConsultas] = useState([]);
    const [descricao, setDescricao] = useState('');
    const [idConsulta, setidConsulta] = useState(0);

    function buscarConsultasMedicos() {
        axios('http://localhost:5000/api/Consultum/todosMedico', {
            headers: {
                'Authorization': 'Bearer ' + localStorage.getItem('usuario-login')
            }
        })
            .then(response => {
                console.log(response)
                if (response.status === 200) {
                    setListaConsultas(response.data);

                }
            })
            .catch(erro => console.log(erro))
    }

    useEffect(buscarConsultasMedicos, []);

    function alterarDescricao(evento){
        evento.preventDefault();

        axios.post('http://localhost:5000/api/Consultum/incluir/' + idConsulta + '/' + descricao, {},{
            headers: {
                Authorization: 'Bearer ' + localStorage.getItem('usuario-login'),
            },})
            .then((resposta) => {
                console.log(resposta)
                buscarConsultasMedicos()
            })
            .catch((erro) => {
                console.log(erro)
            })
    }

    return (
        <div>
            <Cabecalho />
            <main className="tela_listagem">
                <div className="main_listagem">
                    <h1>Listar Consultas</h1>

                    {
                        listaConsultas.map((consulta) => {

                            return(
                                <table key={consulta.idConsulta} className="consulta">
                                    <div className="horizontal">
                                        <div className="dados_consulta">
                                            <tr>
                                                <td>Médico: </td>
                                                <td>{consulta.idMedicoNavigation.idUsuarioNavigation.nomeUsuario}</td>
                                            </tr>

                                            <tr>
                                                <td>Paciente: </td>
                                                <td>{consulta.idPacienteNavigation.idUsuarioNavigation.nomeUsuario}</td>
                                            </tr>
                                            <tr>
                                                <td>Data: </td>
                                                <td>{ Intl.DateTimeFormat("pt-BR", {
                                                    year: 'numeric', month: 'numeric', day: 'numeric',
                                                    hour: 'numeric', minute: 'numeric', hour12: true
                                                }).format(new Date(consulta.dataConsulta)) }</td>


                                            </tr>
                                            <tr>
                                                <td>Situação: </td>
                                                <td>{consulta.situacao}</td>
                                            </tr>
                                            <tr>
                                                <td>Descrição: </td>
                                                <td>{consulta.descricao}</td>
                                            </tr>
                                        </div>
                                    </div>
                                    <hr className="separacao_consulta"></hr>
                                </table>
                            )
                        })
                    }

                    <form onSubmit={alterarDescricao} className="form_descricao">
                        <select onClick={ (campo) => setidConsulta(campo.target.value)}>
                            <option default disabled selected>Selecione uma consulta </option>
                            {
                                listaConsultas.map((consulta) => {
                                    return(
                                        <option value={consulta.idConsulta} name="idConsulta" >
                                            Médico:{consulta.idMedicoNavigation.idUsuarioNavigation.nomeUsuario}_    
                                            Paciente:{consulta.idPacienteNavigation.idUsuarioNavigation.nomeUsuario}_   
                                            Data:{ Intl.DateTimeFormat("pt-BR", { year: 'numeric', month: 'numeric', day: 'numeric', hour: 'numeric', minute: 'numeric', hour12: true}).format(new Date(consulta.dataConsulta)) } 
                                        </option>
                                    )
                                })
                            }
                        </select>
                        <input type="text" value={descricao} onChange={ (campo) => setDescricao(campo.target.value)} placeholder="incluir descrição"></input>
                        <button type="submit">alterar descrição</button>
                    </form>


                </div>
            </main>
        </div>
    )
}
