import { React, Component } from 'react';
import axios from 'axios';
import Cabecalho from '../../components/cabecalho/cabecalho';

export default class Cadastro extends Component {
    constructor(props) {
        super(props);

        this.state = {
            idMedico: 0,
            idPaciente: 0,
            dataConsulta: new Date(),
            descricao: '',
            situacao: '',

            listaMedicos: [],
            listaPacientes: [],
            isLoading: false,
        };
    }

    buscarMedicos = () => {
        axios('http://localhost:5000/api/medico/ListarTodos', {
            headers: {
                Authorization: 'Bearer ' + localStorage.getItem('usuario-login'),
            },
        })
            .then((resposta) => {
                console.log(resposta)
                if (resposta.status === 200) {
                    this.setState({listaMedicos: resposta.data});
                    console.log(this.state.listaMedicos);
                }
            })
            .catch((erro) => console.log(erro));
    };

    buscarPacientes = () => {
        axios('http://localhost:5000/api/paciente/ListarTodos', {
            headers: {
                Authorization: 'Bearer ' + localStorage.getItem('usuario-login'),
            },
        })
            .then((resposta) => {
                console.log(resposta)
                if (resposta.status === 200) {
                    this.setState({listaPacientes: resposta.data});
                    console.log(this.state.listaPacientes);
                }
            })
            .catch((erro) => console.log(erro));
    };



    cadastrarConsulta = (event) => {
        event.preventDefault();

        this.setState({ isLoading: true});

        let consulta = {
            idMedico: this.state.idMedico,
            idPaciente: this.state.idPaciente,
            dataConsulta: new Date(this.state.dataConsulta),
            descricao: 'Agendada',
            situacao: 'Agendada',
        };

        axios
            .post('http://localhost:5000/api/Consultum/cadastrar', consulta, {
                headers: {
                    Authorization: 'Bearer ' + localStorage.getItem('usuario-login'),
                },
            })
            .then((resposta) => {
                console.log(resposta)
                if (resposta.status === 201) {
                    console.log('Evento cadastrado!');
                    this.setState({ isLoading: false});
                }
            })
            .catch((erro) => {
                console.log(erro);
                this.setState({ isLoading: false});
            })

    };

    atualizaStateCampo = (campo) => {
        console.log(campo.target.value)
        console.log(campo.target.name)
        this.setState({ [campo.target.name]: campo.target.value });
        
    }

    componentDidMount() {
        this.buscarMedicos();
        this.buscarPacientes();
    }

    render() {
        return (
            <div>
                    <Cabecalho />
                    <main class="tela_cadastro">
                        <div class="main_cadastro">
                            <h1>Cadastrar consulta</h1>

                            <form class="form_cadastro" onSubmit={this.cadastrarConsulta}>

                                <select id="medicos" name="idMedico" onChange={this.atualizaStateCampo}>
                                    {this.state.listaMedicos.map((medico) => {
                                        return (
                                            <option key={medico.idMedico} value={medico.idMedico} name="idMedico">
                                                {medico.idUsuarioNavigation.nomeUsuario}
                                            </option>
                                        );
                                    })}
                                </select>

                                <select id="paciente" name="idPaciente" onChange={this.atualizaStateCampo}>
                                    {this.state.listaPacientes.map((paciente) => {
                                        return (
                                            <option key={paciente.idPaciente} value={paciente.idPaciente} name="idPaciente">
                                                {paciente.idUsuarioNavigation.nomeUsuario}
                                            </option>
                                        );
                                    })}
                                </select>

                                <input type="datetime-local" name="dataConsulta" placeholder="Data" value={this.dataConsulta} onChange={this.atualizaStateCampo}/>
                                <button type="submit" class="botao_cadastro">Cadastrar</button>
                            </form>
                        </div>
                    </main>
            </div>
        )
    }

}