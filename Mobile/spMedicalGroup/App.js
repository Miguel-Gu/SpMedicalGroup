import 'react-native-gesture-handler';

import React from 'react';
import { StatusBar } from 'react-native';

import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';

const AuthStack = createStackNavigator();

import Login from './src/screens/login';
import ConsultaMedico from './src/screens/consultamedico';
import ConsultaPaciente from './src/screens/consultapaciente';

export default function Stack() {
  return (
    <NavigationContainer>
      <StatusBar
        hidden={true}
      />

      <AuthStack.Navigator
        initialRouteName="Login"
        screenOptions={{
          headerShown: false,
        }}>
        <AuthStack.Screen name="Login" component={Login} />
        <AuthStack.Screen name="ConsultaMedico" component={ConsultaMedico} />
        <AuthStack.Screen name="ConsultaPaciente" component={ConsultaPaciente} />
      </AuthStack.Navigator>
    </NavigationContainer>
  );
}