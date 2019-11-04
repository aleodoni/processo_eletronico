import Sequelize from 'sequelize';
import Autorizacao from '../app/models/Autorizacao';
import SetorUsuario from '../app/models/SetorUsuario';
import Auditoria from '../app/models/Auditoria';
import DataHoraAtual from '../app/models/DataHoraAtual';
import databaseConfig from '../config/database';

const models = [Autorizacao, Auditoria, DataHoraAtual, SetorUsuario];

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
