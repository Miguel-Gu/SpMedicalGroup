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

export default class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: 'ricardo.lemos@spmedicalgroup.com.br',
            senha: '###',
        };
    }

    realizarLogin = async () => {

        console.warn(this.state.email + ' ' + this.state.senha);

        const resposta = await api.post('/Login', {
            email: this.state.email,
            senha: this.state.senha,
        });
        const token = resposta.data.token;
        await AsyncStorage.setItem('userToken', token);

        if (resposta.status == 200) {

            if (jwtDecode(token).role == 1) {

                console.warn(jwtDecode(token).role);
                console.warn('Paciente');
                //this.props.navigation.navigate('consultapaciente');

            }
            else if (jwtDecode(token).role == 2) {

                console.warn(jwtDecode(token).role)
                console.warn('Médico');
                this.props.navigation.navigate('ConsultaMedico');

            } else if (jwtDecode(token).role == 3) {

                console.warn(jwtDecode(token).role)
                console.warn('Administrador');

            }
        }
    };


    render() {
        return (
            <View style={styles.telaLogin}>
                <View style={styles.mainLogin}>
                    <Image
                        style={styles.logoLogin}
                        source={require('../../assets/img/logo_spmedgroup_v2.png')}
                    />

                    <View style={styles.formLogin}>

                        <View style={styles.inputsLogin}>

                            <TextInput
                                style={styles.inputLogin}
                                placeholder="Email"
                                placeholderTextColor="#C4C4C4"
                                keyboardType="email-address"
                                onChangeText={email => this.setState({ email })}
                            />

                            <TextInput
                                style={styles.inputLogin}
                                placeholder="Senha"
                                placeholderTextColor="#C4C4C4"
                                keyboardType="visible-password"
                                onChangeText={senha => this.setState({ senha })}
                            />

                        </View>

                        <TouchableOpacity
                            style={styles.botaoLogin}
                            onPress={this.realizarLogin}>
                            <Text style={styles.textoBotaoLogin}>Login</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        );
    }
}
const styles = StyleSheet.create({

    telaLogin: {
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
        height: '100%',
        backgroundColor: '#25A3E8',
    },

    mainLogin: {
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: '#FFFFFF',
        width: '80%',
        height: '80%',
        padding: 50,
    },

    logoLogin: {
        width: 200,
        height: 200,
    },

    formLogin: {
        justifyContent: 'space-between',
        alignItems: 'center',
        width: 200,
        height: 230,
    },

    inputsLogin: {
        justifyContent: 'space-between',
        height: 135,
    },

    inputLogin: {
        width: 200,
        borderBottomWidth: 1,
        marginTop: 12,
        paddingLeft: 5,
    },

    botaoLogin: {
        width: 200,
        height: 40,
        backgroundColor: '#25A3E8',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 5,
    },

    textoBotaoLogin: {
        fontFamily: 'Roboto',
        fontSize: 20,
        color: '#FFFFFF',
    }
});