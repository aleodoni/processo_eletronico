import Sequelize, { Model } from 'sequelize';

class VNodoDecisao extends Model {
    static init(sequelize) {
        super.init(
            {
                nod_id: {
                    type: Sequelize.INTEGER,
                    primaryKey: true
                },
                pro_id: {
                    type: Sequelize.INTEGER
                },
                nod_decisao: {
                    type: Sequelize.BOOLEAN
                }
            },
            {
                tableName: 'v_nodo_decisao',
                schema: 'spa2',
                sequelize,
                operatorsAliases: false
            }
        );

        return this;
    }
}

export default VNodoDecisao;
