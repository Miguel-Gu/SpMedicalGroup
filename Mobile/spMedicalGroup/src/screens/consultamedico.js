import React, { Component } from 'react';
import {
    StyleSheet,
    Text,
    View,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import api from '../screens/services/api';
import { FlatList } from 'react-native-gesture-handler';

export default class ConsultaMedico extends Component {
    constructor(props) {
        super(props);
        this.state = {
            listaConsultas: [],
        };
    }

    buscarConsultas = async () => {
        try {
            const token = await AsyncStorage.getItem('userToken');

            if (token != null) {

                const resposta = await api.get('/consultum/todosmedico',
                    {
                        headers: {
                            Authorization: 'Bearer ' + token,
                        },
                    });

                if (resposta.status == 200) {
                    console.warn(resposta);
                    const dadosDaApi = resposta.data;
                    this.setState({ listaConsultas: dadosDaApi });

                }
            }
        } catch (error) {
            console.warn(error);
        }
    };

    componentDidMount() {
        this.buscarConsultas();
    };

    render() {
        return (
            <View style={styles.telaListagem}>
                <View style={styles.mainListagem}>

                    <Text style={styles.tituloListagem}>Listar Consultas</Text>

                    <View style={styles.lista}>
                        <FlatList
                            data={this.state.listaConsultas}
                            renderItem={this.renderItem}
                        />
                    </View>

                </View>
            </View>
        );
    }

    renderItem = ({ item }) => (
        <View style={styles.consulta}>
            <Text style={styles.textoConsulta}>Médico: {item.idMedicoNavigation.idUsuarioNavigation.nomeUsuario}</Text>
            <Text style={styles.textoConsulta}>Paciente: {item.idPacienteNavigation.idUsuarioNavigation.nomeUsuario}</Text>
            <Text style={styles.textoConsulta}>
                Data: 
                {Intl.DateTimeFormat("pt-BR", {
                    year: 'numeric', month: 'short', day: 'numeric',
                    hour: 'numeric', minute: 'numeric', hour12: false
                }).format(new Date(item.dataConsulta))}
            </Text>
            <Text style={styles.textoConsulta}>Situação: {item.situacao}</Text>
            <Text style={styles.textoConsulta}>Descrição: {item.descricao}</Text>
        </View>
    );

}
const styles = StyleSheet.create({

    telaListagem: {
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
        height: '100%',
        backgroundColor: '#25A3E8',
    },

    mainListagem: {
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: '#FFFFFF',
        width: '80%',
        height: '80%',
        padding: 25,
    },

    tituloListagem: {
        fontSize: 31,
        fontFamily: 'Titillium Web',
        color: '#000000',
    },

    lista: {
        height: '90%',
        marginBottom: 50,
    },

    consulta: {
        marginTop: 35,
        justifyContent: 'space-between',
        height: 145,
    },

    textoConsulta: {
        fontSize: 15,
        fontFamily: 'Titillium Web',
        color: '#000000',
    }

});