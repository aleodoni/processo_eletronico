import Sequelize, { Model } from 'sequelize';

class Tramite extends Model {
    static init(sequelize) {
        super.init(
            {
                tra_id: {
                    type: Sequelize.INTEGER,
                    primaryKey: true
                },
                tra_envio: {
                    type: Sequelize.NOW,
                    allowNull: false
                },
                tra_recebimento: {
                    type: Sequelize.NOW
                },
                pro_id: {
                    type: Sequelize.INTEGER,
                    allowNull: false
                },
                raz_id: {
                    type: Sequelize.INTEGER,
                    allowNull: false
                },
                login_envia: {
                    type: Sequelize.STRING,
                    allowNull: false
                },
                login_recebe: {
                    type: Sequelize.STRING
                },
                area_id_envia: {
                    type: Sequelize.INTEGER
                },
                area_id_recebe: {
                    type: Sequelize.INTEGER,
                    allowNull: false
                },
                nod_id_envia: {
                    type: Sequelize.INTEGER
                },
                nod_id_recebe: {
                    type: Sequelize.INTEGER,
                    allowNull: false
                },
                tra_observacao: {
                    type: Sequelize.INTEGER
                },
                tra_inicial: {
                    type: Sequelize.BOOLEAN,
                    defaultValue: false
                },
                versao: {
                    type: Sequelize.INTEGER,
                    allowNull: false,
                    defaultValue: 0
                }
            },
            {
                tableName: 'tramite',
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
        this.belongsTo(models.RazaoTramite, {
            foreignKey: 'raz_id'
        });
    }
}

export default Tramite;
