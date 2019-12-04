import Sequelize, { Model } from 'sequelize';

class VNodo extends Model {
    static init(sequelize) {
        super.init(
            {
                nod_id: {
                    type: Sequelize.INTEGER,
                    primaryKey: true
                },
                flu_id: {
                    type: Sequelize.INTEGER,
                    allowNull: false
                },
                area_id: {
                    type: Sequelize.STRING,
                    allowNull: false
                },
                nod_inicio: {
                    type: Sequelize.BOOLEAN,
                    allowNull: false
                },
                nod_fim: {
                    type: Sequelize.BOOLEAN,
                    allowNull: false
                },
                area: {
                    type: Sequelize.STRING
                },
                fluxo: {
                    type: Sequelize.STRING
                },
                inicio: {
                    type: Sequelize.STRING
                },
                fim: {
                    type: Sequelize.STRING
                }
            },
            {
                tableName: 'v_nodo',
                schema: 'spa2',
                sequelize,
                operatorsAliases: false
            }
        );

        return this;
    }
}

export default VNodo;
