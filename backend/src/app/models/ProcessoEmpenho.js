import Sequelize, { Model } from 'sequelize';

class ProcessoEmpenho extends Model {
    static init(sequelize) {
        super.init(
            {
                pen_id: {
                    type: Sequelize.INTEGER,
                    primaryKey: true,
                    autoIncrement: true
                },
                pro_id_pai: {
                    type: Sequelize.INTEGER,
                    allowNull: false
                },
                pen_empenho: {
                    type: Sequelize.STRING,
                    allowNull: false
                }
            },
            {
                tableName: 'processo_empenho',
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

export default ProcessoEmpenho;
