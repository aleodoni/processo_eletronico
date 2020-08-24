import Sequelize, { Model } from 'sequelize';

class ProcessoNotaFiscal extends Model {
    static init(sequelize) {
        super.init(
            {
                pnf_id: {
                    type: Sequelize.INTEGER,
                    primaryKey: true,
                    autoIncrement: true
                },
                pro_id_pai: {
                    type: Sequelize.INTEGER,
                    allowNull: false
                },
                pnf_nota_fiscal: {
                    type: Sequelize.STRING,
                    allowNull: false
                }
            },
            {
                tableName: 'processo_nota_fiscal',
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

export default ProcessoNotaFiscal;
