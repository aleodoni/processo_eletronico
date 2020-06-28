import Sequelize, { Model } from 'sequelize';

class RegraAposentacao extends Model {
    static init(sequelize) {
        super.init(
            {
                reg_id: {
                    type: Sequelize.INTEGER,
                    // defaultValue: "nextval('regra_aposentacao_reg_id_seq')",
                    primaryKey: true,
                    autoIncrement: true
                },
                reg_nome: {
                    type: Sequelize.STRING,
                    allowNull: false
                }
            },
            {
                tableName: 'regra_aposentacao',
                schema: 'spa2',
                sequelize,
                operatorsAliases: false
            }
        );

        return this;
    }
}

export default RegraAposentacao;
