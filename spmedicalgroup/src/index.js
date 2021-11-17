import React from 'react';
import ReactDOM from 'react-dom';
import { Route, BrowserRouter as Router, Switch, Redirect } from 'react-router-dom';
//import { Redirect, Route, BrowserRouter as Router, Switch } from 'react-router-dom';
//import { parseJwt, usuarioAutenticado } from './services/auth';
import './estilo.css';

import Login from './pages/login/Login';
import Cadastro from './pages/cadastro/Cadastro';
import Listagem from './pages/listagem/Listagem';
import ListagemMedico from './pages/listagemMedico/ListagemMedico';
import ListagemPaciente from './pages/listagemPaciente/ListagemPaciente';
//import NotFound from './pages/notFound/NotFound';

//<Route path="/notfound" component={NotFound}/>
//<Redirect to="/notfound"/>

import reportWebVitals from './reportWebVitals';

const routing = (
  <Router>
    <div>
      <Switch>
        <Route path="/login" component={Login}/>
        <Route path="/listagem" component={Listagem}/>
        <Route path="/listagemMedico" component={ListagemMedico}/>
        <Route path="/listagemPaciente" component={ListagemPaciente}/>
        <Route path="/cadastro" component={Cadastro}/>
        <Route path="/"><Redirect to="/login"/></Route>
      </Switch>
    </div>
  </Router>
)

ReactDOM.render(
  routing,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
