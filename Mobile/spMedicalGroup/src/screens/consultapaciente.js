import React, { Component } from 'react';
import {
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
    Image,
    TextInput,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import jwtDecode from 'jwt-decode';
import api from '../screens/services/api';

export default class ConsultaPaciente extends Component {
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
                
                const resposta = await api.get('/consultum/todospaciente',
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

    componentDidMount(){
        this.buscarConsultas();
    }
}
