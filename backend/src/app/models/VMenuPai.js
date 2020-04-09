import Sequelize, { Model } from 'sequelize';

class VMenuPai extends Model {
    static init(sequelize) {
        super.init(
            {
                men_id: {
                    type: Sequelize.INTEGER,
                    primaryKey: true
                },
                nome_pai: {
                    type: Sequelize.STRING
                }
            },
            {
                tableName: 'v_menu_pai',
                schema: 'spa2',
                sequelize,
                operatorsAliases: false
            }
        );

        return this;
    }
}

export default VMenuPai;
