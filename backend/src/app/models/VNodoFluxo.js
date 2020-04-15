import Sequelize, { Model } from 'sequelize';

class VNodoFluxo extends Model {
    static init(sequelize) {
        super.init(
            {
                nod_id: {
                    type: Sequelize.INTEGER,
                    primaryKey: true
                },
                flu_id: {
                    type: Sequelize.INTEGER
                },
                set_nome: {
                    type: Sequelize.STRING
                }
            },
            {
                tableName: 'v_nodo_fluxo',
                schema: 'spa2',
                sequelize,
                operatorsAliases: false
            }
        );

        return this;
    }
}

export default VNodoFluxo;
