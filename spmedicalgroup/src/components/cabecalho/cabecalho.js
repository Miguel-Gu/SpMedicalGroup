import React from 'react'
import logo from'../../assets/logo_spmedgroup_v2.png'

 export default function Cabecalho(){
 
      return(
            <header>
                <div className="container_header">
                    <img src={logo} className="logo" alt="logo"/>
                    <a>Cadastrar</a>
                    <a>Listar</a>
                    <a>Descrição</a>
                    <p>Administrador</p>
                </div>
            </header>
      )
}