import React from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import Login from './pages/Login';
import Home from './pages/Home';
import AlteraSenha from './pages/AlteraSenha';

const PrivateRoute = ({ component: Component, ...rest }) => (
    <Route
        {...rest}
        render={(props) =>
            sessionStorage.getItem('token') !== null ? (
                <Component {...props} />
            ) : (
                <Redirect to={{ pathname: '/', state: { from: props.location } }} />
            )
        }
    />
);

const Routes = () => (
    <Switch>
        <Route exact path="/" component={Login} />
        <Route exact path="/processo-eletronico-ext-contab" component={Login} />
        <PrivateRoute exact path="/home" component={Home} />
        <PrivateRoute exact path="/altera-senha" component={AlteraSenha} />
        <Route path="*" component={Login} />
    </Switch>
);

export default Routes;
