import React from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import Login from './pages/Login';
import Home from './pages/Home';
import CriarProcesso from './pages/CriarProcesso';
import ConsultarProcesso from './pages/ConsultarProcesso';
import ConsultarManifestacao from './pages/ConsultarManifestacao';
import Tela from './pages/Tela';
import Fluxo from './pages/Fluxo';
import Genero from './pages/Generos';
import TipoProcesso from './pages/TipoProcesso';
import ModeloMenu from './pages/ModeloMenu';
import AreaMenu from './pages/AreaMenu';
import TelaMenu from './pages/TelaMenu';
import DadosProcesso from './pages/DadosProcesso';
import RazaoTramite from './pages/RazaoTramite';
import TipoManifestacao from './pages/TipoManifestacao';
import Setor from './pages/Setor';
import Lotacao from './pages/Lotacao';
import Nodo from './pages/Nodo';
import ProximoTramite from './pages/ProximoTramite';
import CriarManifestacao from './pages/CriarManifestacao';
import CriarManifestacaoExecutiva from './pages/CriarManifestacaoExecutiva';
import TipoDocumento from './pages/TipoDocumento';
import Tramite from './pages/Tramite';

const PrivateRoute = ({ component: Component, ...rest }) => (
    <Route
        {...rest}
        render={props =>
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
        <Route exact path="/processo-eletronico" component={Login} />
        <PrivateRoute exact path="/home" component={Home} />
        <PrivateRoute exact path="/processo-consulta" component={ConsultarProcesso} />
        <PrivateRoute exact path="/manifestacao-consulta" component={ConsultarManifestacao} />
        <PrivateRoute exact path="/processo-cria" component={CriarProcesso} />
        <PrivateRoute exact path="/telas" component={Tela} />
        <PrivateRoute exact path="/fluxos" component={Fluxo} />
        <PrivateRoute exact path="/generos" component={Genero} />
        <PrivateRoute exact path="/tipos-processo" component={TipoProcesso} />
        <PrivateRoute exact path="/modelo-menu" component={ModeloMenu} />
        <PrivateRoute exact path="/areas-menu" component={AreaMenu} />
        <PrivateRoute exact path="/menus" component={TelaMenu} />
        <PrivateRoute exact path="/nodos" component={Nodo} />
        <PrivateRoute exact path="/razao" component={RazaoTramite} />
        <PrivateRoute exact path="/setores" component={Setor} />
        <PrivateRoute exact path="/lotacoes" component={Lotacao} />
        <PrivateRoute exact path="/tipos-manifestacao" component={TipoManifestacao} />
        <PrivateRoute exact path="/proximos-tramites" component={ProximoTramite} />
        <PrivateRoute exact path="/dados-processo/:id" component={DadosProcesso} />
        <PrivateRoute exact path="/manifestacao-cria/:proId" component={CriarManifestacao} />
        <PrivateRoute
            exact
            path="/manifestacao-cria-executiva/:proId"
            component={CriarManifestacaoExecutiva}
        />
        <PrivateRoute exact path="/tramita/:id" component={Tramite} />
        <PrivateRoute exact path="/tipos-documento" component={TipoDocumento} />
        <Route path="*" component={Login} />
    </Switch>
);

export default Routes;
