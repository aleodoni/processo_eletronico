import Sequelize from 'sequelize';
import Autorizacao from '../app/models/Autorizacao';
import Auditoria from '../app/models/Auditoria';
import DataHoraAtual from '../app/models/DataHoraAtual';
import databaseConfig from '../config/database';

const models = [
  Autorizacao,
  Auditoria,
  DataHoraAtual,
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
