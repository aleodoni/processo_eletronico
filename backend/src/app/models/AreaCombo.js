import Sequelize, { Model } from 'sequelize';

class AreaCombo extends Model {
    static init(sequelize) {
        super.init(
            {
                set_id: {
                    type: Sequelize.STRING,
                    primaryKey: true
                },
                set_nome: Sequelize.STRING,
                set_tipo: Sequelize.STRING
            },
            {
                tableName: 'v_area_combo',
                schema: 'spa2',
                sequelize,
                operatorsAliases: false
            }
        );

        return this;
    }
}

export default AreaCombo;
