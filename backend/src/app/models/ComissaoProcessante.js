import Sequelize, { Model } from 'sequelize';

class ComissaoProcessante extends Model {
    static init(sequelize) {
        super.init(
            {
                cop_id: {
                    type: Sequelize.INTEGER,
                    defaultValue: "nextval('spa2.comissao_processante_cop_id_seq')",
                    primaryKey: true,
                    autoIncrement: true
                },
                mco_id: {
                    type: Sequelize.INTEGER,
                    allowNull: false
                },
                pro_id: {
                    type: Sequelize.STRING,
                    allowNull: false
                },
                cop_presidente: {
                    type: Sequelize.BOOLEAN,
                    allowNull: false
                }

            },
            {
                tableName: 'comissao_processante',
                schema: 'spa2',
                sequelize,
                operatorsAliases: false
            }
        );

        return this;
    }
}

export default ComissaoProcessante;
