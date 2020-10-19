import Sequelize, { Model } from 'sequelize';

class VDadosMembrosComissao extends Model {
    static init(sequelize) {
        super.init(
            {
                cop_id: {
                    type: Sequelize.INTEGER,
                    primaryKey: true
                },
                pro_id: {
                    type: Sequelize.INTEGER,
                    allowNull: false
                },
                cargo: {
                    type: Sequelize.STRING,
                    allowNull: false
                },
                matricula: {
                    type: Sequelize.STRING,
                    allowNull: false
                },
                nome: {
                    type: Sequelize.STRING,
                    allowNull: false
                },
                login: {
                    type: Sequelize.STRING,
                    allowNull: false
                },
                area: {
                    type: Sequelize.STRING,
                    allowNull: false
                }

            },
            {
                tableName: 'v_dados_membros_comissao',
                schema: 'spa2',
                sequelize,
                operatorsAliases: false
            }
        );

        return this;
    }
}

export default VDadosMembrosComissao;
