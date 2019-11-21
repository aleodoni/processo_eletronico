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
import VMenu from '../app/models/VMenu';
import VAreaMenu from '../app/models/VAreaMenu';
import Auditoria from '../app/models/Auditoria';
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
