import React from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import Login from './pages/Login';
import Home from './pages/Home';
import NaoEncontrado from './pages/NaoEncontrado';
import CriarProcesso from './pages/CriarProcesso';
import ConsultarProcesso from './pages/ConsultarProcesso';

const PrivateRoute = ({ component: Component, ...rest }) => <Route {...rest} render={props => (sessionStorage.getItem('token') !== null ? <Component {...props} /> : <Redirect to={{ pathname: '/', state: { from: props.location } }} />)} />;

const Routes = () => (
    <Switch>
        <Route exact path='/' component={Login} />
        <PrivateRoute exact path='/home' component={Home}/>
        <PrivateRoute exact path='/processo-consulta' component={ConsultarProcesso}/>
        <PrivateRoute exact path='/processo-cria' component={CriarProcesso}/>
        <Route path="/404" component={NaoEncontrado} />
        <Redirect to="/404" />
        <Route path='*' component={NaoEncontrado} />
    </Switch>
);

export default Routes;
