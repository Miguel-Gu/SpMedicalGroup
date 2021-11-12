import { useState, useEffect } from 'react';
import axios from 'axios';
import { render } from '@testing-library/react';
import Cabecalho from '../../components/cabecalho/cabecalho';

export default function ConsultasPaciente() {
    const [listaConsultas, setListaConsultas] = useState([]);

    function buscarConsultasPaciente() {
        axios('http://localhost:5000/api/Consultum/todosPaciente', {
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

    useEffect(buscarConsultasPaciente, []);


    render()
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
                </div>
            </main>
        </div>
    )
}