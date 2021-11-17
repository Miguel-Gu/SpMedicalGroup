import React from 'react'
import logo from'../../assets/logo_spmedgroup_v2.png'
import { parseJwt } from '../../services/auth';
import Cadastro from '../../pages/cadastro/Cadastro';
import Listagem from '../../pages/listagem/Listagem';
import ListagemMedico from '../../pages/listagemMedico/ListagemMedico';
import ListagemPaciente from '../../pages/listagemPaciente/ListagemPaciente';

 export default function Cabecalho(){

    if (parseJwt().role === '3') {
        return (
            <header>
                <div className="container_header">
                    <img src={logo} className="logo" alt="logo"/>
                    <a href={Cadastro}>Cadastrar</a>
                    <a href={Listagem}>Listar</a>
                </div>
            </header>
        )
    }

    if (parseJwt().role === '2') {
        return (
            <header>
                <div className="container_header">
                    <img src={logo} className="logo" alt="logo"/>
                    <a href={ListagemMedico}>Listar</a>
                    <a href={ListagemMedico}>Alterar Descrição</a>
                </div>
            </header>            
        )
    }

    if (parseJwt().role === '1') {
        return (
            <header>
                <div className="container_header">
                    <img src={logo} className="logo" alt="logo"/>
                    <a href={ListagemPaciente}>Listar</a>
                </div>
            </header>              
        )
    }
}