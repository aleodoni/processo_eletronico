import Sequelize, { Model } from 'sequelize';

class VDadosLogin extends Model {
    static init(sequelize) {
        super.init(
            {
                matricula: {
                    type: Sequelize.STRING,
                    primaryKey: true
                },
                set_id: {
                    type: Sequelize.INTEGER
                },
                nome_setor: {
                    type: Sequelize.STRING
                },
                nome_sigla: {
                    type: Sequelize.STRING
                },
                nome: {
                    type: Sequelize.STRING
                },
                login: {
                    type: Sequelize.STRING
                },
                set_id_area: {
                    type: Sequelize.INTEGER
                },
                nome_area: {
                    type: Sequelize.STRING
                }
            },
            {
                tableName: 'v_dados_login',
                schema: 'spa2',
                sequelize,
                operatorsAliases: false
            }
        );

        return this;
    }
}

export default VDadosLogin;
