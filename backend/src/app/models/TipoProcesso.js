import Sequelize, { Model } from 'sequelize';

class TipoProcesso extends Model {
    static init(sequelize) {
        super.init(
            {
                tpr_id: {
                    type: Sequelize.INTEGER,
                    defaultValue: "nextval('spa2.tipo_processo_tpr_id_seq')",
                    primaryKey: true,
                    autoIncrement: true
                },
                tpr_nome: {
                    type: Sequelize.STRING,
                    allowNull: false
                },
                tpr_visualizacao: {
                    type: Sequelize.INTEGER
                },
                versao: {
                    type: Sequelize.INTEGER,
                    allowNull: false,
                    defaultValue: 0
                },
                gen_id: {
                    type: Sequelize.INTEGER
                },
                flu_id: {
                    type: Sequelize.INTEGER
                },
                tpr_pessoal: {
                    type: Sequelize.BOOLEAN,
                    allowNull: false,
                    defaultValue: false
                },
                tpr_prazo_recurso: {
                    type: Sequelize.INTEGER,
                    allowNull: false,
                    defaultValue: 0
                },
                tpr_visivel: {
                    type: Sequelize.BOOLEAN,
                    allowNull: false,
                    defaultValue: true
                },
                tpr_tramitacao_aberta: {
                    type: Sequelize.BOOLEAN,
                    allowNull: false,
                    defaultValue: false
                }
            },
            {
                tableName: 'tipo_processo',
                schema: 'spa2',
                sequelize,
                operatorsAliases: false
            }
        );

        return this;
    }

    static associate(models) {
        this.belongsTo(models.Genero, {
            foreignKey: 'gen_id'
        });
        this.belongsTo(models.Fluxo, {
            foreignKey: 'flu_id'
        });
    }
}

export default TipoProcesso;
