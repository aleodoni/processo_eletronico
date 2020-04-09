import Sequelize, { Model } from 'sequelize';

class AreaMenu extends Model {
    static init(sequelize) {
        super.init(
            {
                amu_id: {
                    type: Sequelize.INTEGER,
                    defaultValue: "nextval('spa2.area_menu_mmu_id_seq')",
                    primaryKey: true,
                    autoIncrement: true
                },
                set_id: {
                    type: Sequelize.STRING,
                    allowNull: false
                },
                mmu_id: {
                    type: Sequelize.INTEGER,
                    allowNull: false
                },
                versao: {
                    type: Sequelize.INTEGER,
                    allowNull: false,
                    defaultValue: 0
                }
            },
            {
                tableName: 'area_menu',
                schema: 'spa2',
                sequelize,
                operatorsAliases: false
            }
        );

        return this;
    }
}

export default AreaMenu;
