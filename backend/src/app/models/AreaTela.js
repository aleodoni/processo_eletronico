import Sequelize, { Model } from 'sequelize';

class AreaTela extends Model {
    static init(sequelize) {
        super.init(
            {
                set_id: {
                    type: Sequelize.STRING,
                    allowNull: false
                },
                tel_id: {
                    type: Sequelize.INTEGER,
                    primaryKey: true,
                    allowNull: false
                },
                tel_nome: {
                    type: Sequelize.STRING,
                    allowNull: false
                }
            },
            {
                tableName: 'v_telas_area',
                schema: 'spa2',
                sequelize,
                operatorsAliases: false
            }
        );

        return this;
    }
}

export default AreaTela;
