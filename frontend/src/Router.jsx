import React from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import Login from './pages/Login';
import Home from './pages/Home';
import CriarProcesso from './pages/CriarProcesso';
import ConsultarProcesso from './pages/ConsultarProcesso';
import Tela from './pages/Tela';
import Genero from './pages/Generos';
import ModeloMenu from './pages/ModeloMenu';
import AreaMenu from './pages/AreaMenu';

const PrivateRoute = ({ component: Component, ...rest }) => <Route {...rest} render={props => (sessionStorage.getItem('token') !== null ? <Component {...props} /> : <Redirect to={{ pathname: '/', state: { from: props.location } }} />)} />;

const Routes = () => (
    <Switch>
        <Route exact path='/' component={Login} />
        <Route exact path='/processo-eletronico' component={Login} />
        <PrivateRoute exact path='/home' component={Home}/>
        <PrivateRoute exact path='/processo-consulta' component={ConsultarProcesso}/>
        <PrivateRoute exact path='/processo-cria' component={CriarProcesso}/>
        <PrivateRoute exact path='/telas' component={Tela}/>
        <PrivateRoute exact path='/generos' component={Genero}/>
        <PrivateRoute exact path='/modelo-menu' component={ModeloMenu}/>
        <PrivateRoute exact path='/areas-menu' component={AreaMenu}/>
        <Route path='*' component={Login} />
    </Switch>
);

export default Routes;