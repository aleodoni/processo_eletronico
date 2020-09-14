import React from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';
import Login from './pages/Login';
import Home from './pages/Home';
import CriarProcesso from './pages/CriarProcesso';
import ExecucaoDespesa from './pages/ExecucaoDespesa';
import CriarProcessoPasPad from './pages/CriarProcessoPasPad';
import CriarProcessoAposentadoriaAdm from './pages/CriarProcessoAposentadoriaAdm';
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
import DadosProcessoPasPad from './pages/DadosProcessoPasPad';
import RazaoTramite from './pages/RazaoTramite';
import TipoManifestacao from './pages/TipoManifestacao';
import Setor from './pages/Setor';
import Lotacao from './pages/Lotacao';
import Nodo from './pages/Nodo';
import MembroComissao from './pages/MembroComissao';
import Sigilo from './pages/Sigilo';
import ProximoTramite from './pages/ProximoTramite';
import RegraAposentacao from './pages/RegraAposentacao';
import CriarManifestacao from './pages/CriarManifestacao';
import CriarManifestacaoPasPad from './pages/CriarManifestacaoPasPad';
import CriarManifestacaoDecisaoPad from './pages/CriarManifestacaoDecisaoPad';
import CriarManifestacaoExecutiva from './pages/CriarManifestacaoExecutiva';
import CriarManifestacaoVisto from './pages/CriarManifestacaoVisto';
import CriarManifestacaoCiencia from './pages/CriarManifestacaoCiencia';
import CriarManifestacaoAverbacao from './pages/CriarManifestacaoAverbacao';
import CriarManifestacaoCienciaAverbacao from './pages/CriarManifestacaoCienciaAverbacao';
import CriarManifestacaoAvalHorario from './pages/CriarManifestacaoAvalHorario';
import CriaManifestacaoContagemTempo from './pages/CriaManifestacaoContagemTempo';
import CriarManifestacaoCienciaCalculo from './pages/CriarManifestacaoCienciaCalculo';
import CriarManifestacaoParecerProjurisAposentadoria from './pages/CriarManifestacaoParecerProjurisAposentadoria';
import TipoDocumento from './pages/TipoDocumento';
import Tramite from './pages/Tramite';
import EditaProcessoPagamento from './pages/EditaProcessoPagamento';

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
        <PrivateRoute exact path="/processo-execucao-despesa" component={ExecucaoDespesa} />
        <PrivateRoute
            exact
            path="/processo-cria-aposentadoria-adm"
            component={CriarProcessoAposentadoriaAdm}
        />
        <PrivateRoute exact path="/processo-pas-pad" component={CriarProcessoPasPad} />
        <PrivateRoute exact path="/telas" component={Tela} />
        <PrivateRoute exact path="/fluxos" component={Fluxo} />
        <PrivateRoute exact path="/generos" component={Genero} />
        <PrivateRoute exact path="/tipos-processo" component={TipoProcesso} />
        <PrivateRoute exact path="/modelo-menu" component={ModeloMenu} />
        <PrivateRoute exact path="/areas-menu" component={AreaMenu} />
        <PrivateRoute exact path="/menus" component={TelaMenu} />
        <PrivateRoute exact path="/nodos" component={Nodo} />
        <PrivateRoute exact path="/membros-comissao" component={MembroComissao} />
        <PrivateRoute exact path="/sigilos" component={Sigilo} />
        <PrivateRoute exact path="/razao" component={RazaoTramite} />
        <PrivateRoute exact path="/setores" component={Setor} />
        <PrivateRoute exact path="/lotacoes" component={Lotacao} />
        <PrivateRoute exact path="/tipos-manifestacao" component={TipoManifestacao} />
        <PrivateRoute exact path="/proximos-tramites" component={ProximoTramite} />
        <PrivateRoute exact path="/dados-processo/:id" component={DadosProcesso} />
        <PrivateRoute exact path="/dados-processo-pas-pad/:id" component={DadosProcessoPasPad} />
        <PrivateRoute exact path="/manifestacao-cria/:proId" component={CriarManifestacao} />
        <PrivateRoute
            exact
            path="/edita-processo-pagamento/:proId"
            component={EditaProcessoPagamento}
        />
        <PrivateRoute
            exact
            path="/manifestacao-cria-executiva/:proId"
            component={CriarManifestacaoExecutiva}
        />
        <PrivateRoute
            exact
            path="/manifestacao-cria-visto/:proId"
            component={CriarManifestacaoVisto}
        />
        <PrivateRoute
            exact
            path="/manifestacao-cria-ciencia/:proId"
            component={CriarManifestacaoCiencia}
        />
        <PrivateRoute
            exact
            path="/manifestacao-cria-averbacao/:proId"
            component={CriarManifestacaoAverbacao}
        />
        <PrivateRoute
            exact
            path="/manifestacao-cria-ciencia-averbacao/:proId"
            component={CriarManifestacaoCienciaAverbacao}
        />
        <PrivateRoute
            exact
            path="/manifestacao-cria-aval-horario/:proId"
            component={CriarManifestacaoAvalHorario}
        />
        <PrivateRoute
            exact
            path="/manifestacao-cria-contagem-tempo/:proId"
            component={CriaManifestacaoContagemTempo}
        />
        <PrivateRoute
            exact
            path="/manifestacao-cria-ciencia-calculo/:proId"
            component={CriarManifestacaoCienciaCalculo}
        />
        <PrivateRoute
            exact
            path="/manifestacao-cria-parecer-projuris-aposentadoria/:proId"
            component={CriarManifestacaoParecerProjurisAposentadoria}
        />
        <PrivateRoute
            exact
            path="/manifestacao-cria-pas-pad/:proId"
            component={CriarManifestacaoPasPad}
        />
        <PrivateRoute
            exact
            path="/manifestacao-cria-decisao-pad/:proId"
            component={CriarManifestacaoDecisaoPad}
        />
        <PrivateRoute exact path="/tramita/:id" component={Tramite} />
        <PrivateRoute exact path="/tipos-documento" component={TipoDocumento} />
        <PrivateRoute exact path="/regras-aposentacao" component={RegraAposentacao} />
        <Route path="*" component={Login} />
    </Switch>
);

PrivateRoute.propTypes = {
    component: PropTypes.elementType.isRequired,
};

export default Routes;
