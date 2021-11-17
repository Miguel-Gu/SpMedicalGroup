import { Component } from 'react';
import axios from 'axios';
import { parseJwt } from '../../services/auth';

import logo from'../../assets/logo_spmedgroup_v2.png'

export default class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: 'ligia@gmail.com',
            senha: '###',
            erroMensagem: '',
            isLoading: false,
        };
    }



    efetuaLogin = (event) => {

        event.preventDefault();

        this.setState({ erroMensagem: '', isLoading: true });

        axios
            .post('http://localhost:5000/api/Login', {
                email: this.state.email,
                senha: this.state.senha,
            })

            .then((resposta) => {
                if (resposta.status === 200) {
                    localStorage.setItem('usuario-login', resposta.data.token);
                    this.setState({ isLoading: false });

                    let base64 = localStorage.getItem('usuario-login').split('.')[1];
                    console.log(base64);

                    //console.log(this.props);

                    if (parseJwt().role === '3') {
                       this.props.history.push('/listagem');
                    }
                    if (parseJwt().role === '2') {
                       this.props.history.push('/listagemMedico');
                    }
                    if (parseJwt().role === '1') {
                       this.props.history.push('/listagemPaciente');
                    }
                }
            })

            .catch(() => {
                this.setState({
                    erroMensagem: 'E-mail e/ou senha inválidos!',
                    isLoading: false,
                });
            });
    };

    atualizaStateCampo = (campo) => {
        this.setState({ [campo.target.name]: campo.target.value});
    };

    render() {
        return (
            <div>
                <main className="tela_login">
                    <div className="main_login">
                        <img src={logo} className="logo_login" alt="SpMedicalGroup"/>
                        <form className="form_login" onSubmit={this.efetuaLogin}>
                            <input type="email" name="email" value={this.state.email} onChange={this.atualizaStateCampo} placeholder="Email"/>
                            <input type="password" name="senha" value={this.state.senha} onChange={this.atualizaStateCampo} placeholder="Senha"/>
                            <button type="submit" className="botao_login">Login</button>
                        </form>
                    </div>
                </main>
            </div>
        );
    }
}