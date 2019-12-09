import Sequelize, { Model } from 'sequelize';

class ProximoTramite extends Model {
    static init(sequelize) {
        super.init(
            {
                prx_id: {
                    type: Sequelize.INTEGER,
                    defaultValue: "nextval('spa2.proximo_tramite_prx_id_seq')",
                    primaryKey: true,
                    autoIncrement: true
                },
                prx_prioridade: {
                    type: Sequelize.INTEGER
                },
                nod_id: {
                    type: Sequelize.INTEGER
                },
                nod_id_proximo: {
                    type: Sequelize.INTEGER,
                    allowNull: false
                },
                raz_id: {
                    type: Sequelize.INTEGER
                },
                flu_id: {
                    type: Sequelize.INTEGER
                },
                versao: {
                    type: Sequelize.INTEGER,
                    allowNull: false,
                    defaultValue: 0
                }
            },
            {
                tableName: 'proximo_tramite',
                schema: 'spa2',
                sequelize,
                operatorsAliases: false
            }
        );

        return this;
    }

    static associate(models) {
        this.belongsTo(models.Fluxo, {
            foreignKey: 'flu_id'
        });
        this.belongsTo(models.Nodo, {
            foreignKey: 'nod_id'
        });
        this.belongsTo(models.RazaoTramite, {
            foreignKey: 'raz_id'
        });
    }
}

export default ProximoTramite;
