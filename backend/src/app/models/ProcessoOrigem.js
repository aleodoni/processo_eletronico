import Sequelize, { Model } from 'sequelize';

class ProcessoOrigem extends Model {
    static init(sequelize) {
        super.init(
            {
                pro_id_origem: {
                    type: Sequelize.INTEGER,
                    // defaultValue: "nextval('spa2.processo_origem_por_id_seq')",
                    primaryKey: true,
                    autoIncrement: true
                },
                pro_id_pai: {
                    type: Sequelize.INTEGER,
                    allowNull: false
                },
                pro_id_atual: {
                    type: Sequelize.INTEGER,
                    allowNull: false
                }
            },
            {
                tableName: 'processo_origem',
                schema: 'spa2',
                sequelize,
                operatorsAliases: false
            }
        );

        return this;
    }

    static associate(models) {
        this.belongsTo(models.Processo, {
            foreignKey: 'pro_id'
        });
    }
}

export default ProcessoOrigem;
