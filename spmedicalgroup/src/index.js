import React from 'react';
import ReactDOM from 'react-dom';
import { Redirect, Route, BrowserRouter as Router, Switch } from 'react-router-dom';
import { parseJwt, usuarioAutenticado } from './services/auth';
import './estilo.css';

import Login from './pages/login/Login';
//import Cadastro from './pages/cadastro/Cadastro';
//import Descricao from './pages/descricao/Descricao';
import Listagem from './pages/listagem/Listagem';
//import ListagemMedico from './pages/listagemMedico/ListagemMedico';
//import ListagemPaciente from './pages/listagemPaciente/ListagemPaciente';
//import NotFound from './pages/notFound/NotFound';


//<Route path="/cadastro" component={Cadastro}/>
//<Route path="/descricao" component={Descricao}/>
//<Route path="/notfound" component={NotFound}/>
//<Redirect to="/notfound"/>
//<Route path="/listagemMedico" component={ListagemMedico}/>
//<Route path="/listagemPaciente" component={ListagemPaciente}/>


import reportWebVitals from './reportWebVitals';

const PermissaoAdm = ({ component: Component }) => (
  <Route
    render={(props) =>
      usuarioAutenticado() && parseJwt().role === '1' ? (
        // operador spread
        <Component {...props} />
      ) : (
        <Redirect to="login" />
      )
    }
  />
);

const PermissaoComum = ({ component: Component }) => (
  <Route
    render={(props) =>
      usuarioAutenticado() && parseJwt().role === '2' ? (
        // operador spread
        <Component {...props} />
      ) : (
        <Redirect to="login" />
      )
    }
  />
);


const routing = (
  <Router>
    <div>
      <Switch>
        <Route path="/login" component={Login}/>
        <Route path="/listagem" component={Listagem}/>

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
