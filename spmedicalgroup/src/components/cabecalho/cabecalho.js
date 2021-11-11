import React from 'react'
import logo from'../../assets/logo_spmedgroup_v2.png'

 export default function Cabecalho(){
 
      return(
            <header>
                <div className="container_header">
                    <img src={logo} class="logo"/>
                    <a href="">Cadastrar</a>
                    <a href="">Listar</a>
                    <a href="">Descrição</a>
                    <p>Administrador</p>
                </div>
            </header>
      )
}