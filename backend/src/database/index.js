import Sequelize from 'sequelize';
import Autorizacao from '../app/models/Autorizacao';
import SetorUsuario from '../app/models/SetorUsuario';
import Area from '../app/models/Area';
import Setor from '../app/models/Setor';
import Tela from '../app/models/Tela';
import Genero from '../app/models/Genero';
import ModeloMenu from '../app/models/ModeloMenu';
import AreaMenu from '../app/models/AreaMenu';
import AreaTela from '../app/models/AreaTela';
import Menu from '../app/models/Menu';
import Fluxo from '../app/models/Fluxo';
import TipoProcesso from '../app/models/TipoProcesso';
import TipoIniciativa from '../app/models/TipoIniciativa';
import VMenu from '../app/models/VMenu';
import VMenuPai from '../app/models/VMenuPai';
import VAreaMenu from '../app/models/VAreaMenu';
import VTipoProcesso from '../app/models/VTipoProcesso';
import VTipoIniciativa from '../app/models/VTipoIniciativa';
import VTelaMenu from '../app/models/VTelaMenu';
import VDadosPessoa from '../app/models/VDadosPessoa';
import Auditoria from '../app/models/Auditoria';
import Processo from '../app/models/Processo';
import DataHoraAtual from '../app/models/DataHoraAtual';
import databaseConfig from '../config/database';

const models = [
    Autorizacao,
    Auditoria,
    DataHoraAtual,
    SetorUsuario,
    Area,
    Setor,
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
    TipoIniciativa,
    VTipoProcesso,
    VTipoIniciativa,
    VDadosPessoa,
    Fluxo,
    Processo
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
