import Sequelize, { Model } from 'sequelize';

class Area extends Model {
    static init(sequelize) {
        super.init(
            {
                set_id: {
                    type: Sequelize.STRING,
                    primaryKey: true
                },
                set_nome: Sequelize.STRING
            },
            {
                tableName: 'v_area',
                schema: 'spa2',
                sequelize,
                operatorsAliases: false
            }
        );

        return this;
    }
}

export default Area;
