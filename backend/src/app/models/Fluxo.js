import Sequelize, { Model } from 'sequelize';

class Fluxo extends Model {
    static init(sequelize) {
        super.init(
            {
                flu_id: {
                    type: Sequelize.INTEGER,
                    defaultValue: "nextval('spa2.fluxo_flu_id_seq')",
                    primaryKey: true,
                    autoIncrement: true
                },
                flu_nome: {
                    type: Sequelize.STRING,
                    allowNull: false
                }
            },
            {
                tableName: 'fluxo',
                schema: 'spa2',
                sequelize,
                operatorsAliases: false
            }
        );

        return this;
    }
}

export default Fluxo;
