import Sequelize, { Model } from 'sequelize';

class ProcessoNAD extends Model {
    static init(sequelize) {
        super.init(
            {
                pna_id: {
                    type: Sequelize.INTEGER,
                    primaryKey: true,
                    autoIncrement: true
                },
                pro_id_pai: {
                    type: Sequelize.INTEGER,
                    allowNull: false
                },
                pna_nad: {
                    type: Sequelize.STRING,
                    allowNull: false
                }
            },
            {
                tableName: 'processo_nad',
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

export default ProcessoNAD;
