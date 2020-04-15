import Sequelize from 'sequelize';
import Autorizacao from '../app/models/Autorizacao';
import SetorUsuario from '../app/models/SetorUsuario';
import Area from '../app/models/Area';
import Setor from '../app/models/Setor';
import Lotacao from '../app/models/Lotacao';
import Tela from '../app/models/Tela';
import Genero from '../app/models/Genero';
import ModeloMenu from '../app/models/ModeloMenu';
import AreaMenu from '../app/models/AreaMenu';
import AreaTela from '../app/models/AreaTela';
import Menu from '../app/models/Menu';
import Fluxo from '../app/models/Fluxo';
import TipoProcesso from '../app/models/TipoProcesso';
import VMenu from '../app/models/VMenu';
import VMenuPai from '../app/models/VMenuPai';
import VAreaMenu from '../app/models/VAreaMenu';
import VTipoProcesso from '../app/models/VTipoProcesso';
import VTelaMenu from '../app/models/VTelaMenu';
import VDadosPessoa from '../app/models/VDadosPessoa';
import Auditoria from '../app/models/Auditoria';
import Processo from '../app/models/Processo';
import Nodo from '../app/models/Nodo';
import VNodo from '../app/models/VNodo';
import VDadosProcesso from '../app/models/VDadosProcesso';
import DataHoraAtual from '../app/models/DataHoraAtual';
import RazaoTramite from '../app/models/RazaoTramite';
import ProximoTramite from '../app/models/ProximoTramite';
import Arquivo from '../app/models/Arquivo';
import TipoManifestacao from '../app/models/TipoManifestacao';
import Manifestacao from '../app/models/Manifestacao';
import VDadosLogin from '../app/models/VDadosLogin';
import ArquivoManifestacao from '../app/models/ArquivoManifestacao';
import VNodoFluxo from '../app/models/VNodoFluxo';
import VProximoTramite from '../app/models/VProximoTramite';
import databaseConfig from '../config/database';

const models = [
    Autorizacao,
    Auditoria,
    DataHoraAtual,
    SetorUsuario,
    Area,
    Setor,
    Lotacao,
    Tela,
    Menu,
    VMenu,
    ModeloMenu,
    AreaMenu,
    AreaTela,
    Genero,
    VAreaMenu,
    VTelaMenu,
    VMenuPai,
    TipoProcesso,
    VTipoProcesso,
    VDadosPessoa,
    Fluxo,
    Processo,
    Nodo,
    VNodo,
    VDadosProcesso,
    RazaoTramite,
    ProximoTramite,
    Arquivo,
    TipoManifestacao,
    Manifestacao,
    VDadosLogin,
    ArquivoManifestacao,
    VNodoFluxo,
    VProximoTramite
];

class Database {
    constructor() {
        this.init();
    }

    init() {
        this.connection = new Sequelize(databaseConfig);
        models.map(model => model.init(this.connection));
        models.map(
            model => model.associate && model.associate(this.connection.models)
        );
    }
}
export default new Database();
