import React from 'react'
import logo from'../../assets/logo_spmedgroup_v2.png'
import { parseJwt } from '../../services/auth';
import {Link} from 'react-router-dom';

 export default function Cabecalho(){

    if (parseJwt().role === '3') {
        return (
            <header>
                <div className="container_header">
                    <img src={logo} className="logo" alt="logo"/>
                    <Link to="/cadastro">Cadastrar</Link>
                    <Link to="/listagem">Listar</Link>
                </div>
            </header>
        )
    }

    if (parseJwt().role === '2') {
        return (
            <header>
                <div className="container_header">
                    <img src={logo} className="logo" alt="logo"/>
                    <Link to="/listagemMedico">Listar</Link>
                    <Link to="/listagemMedico">Descrição</Link>
                </div>
            </header>            
        )
    }

    if (parseJwt().role === '1') {
        return (
            <header>
                <div className="container_header">
                    <img src={logo} className="logo" alt="logo"/>
                    <Link to="/listagemPaciente">Listar</Link>
                </div>
            </header>              
        )
    }
}