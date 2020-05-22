import Sequelize, { Model } from 'sequelize';

class VNodo extends Model {
    static init(sequelize) {
        super.init(
            {
                nod_id: {
                    type: Sequelize.INTEGER,
                    primaryKey: true
                },
                nod_inicio: {
                    type: Sequelize.BOOLEAN
                },
                nod_fim: {
                    type: Sequelize.BOOLEAN
                },
                inicio: {
                    type: Sequelize.STRING
                },
                fim: {
                    type: Sequelize.STRING
                },
                flu_id: {
                    type: Sequelize.INTEGER
                },
                fluxo: {
                    type: Sequelize.STRING
                },
                area_id: {
                    type: Sequelize.INTEGER
                },
                area: {
                    type: Sequelize.STRING
                },
                nod_dias_prazo: {
                    type: Sequelize.INTEGER
                },
                nod_ordem: {
                    type: Sequelize.INTEGER
                },
                nod_aval_executiva: {
                    type: Sequelize.BOOLEAN
                },
                aval_executiva: {
                    type: Sequelize.STRING
                },
                nod_decisao: {
                    type: Sequelize.BOOLEAN
                },
                decisao: {
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
