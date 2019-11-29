import Sequelize, { Model } from 'sequelize';

class Processo extends Model {
    static init(sequelize) {
        super.init(
            {
                pro_id: {
                    type: Sequelize.INTEGER,
                    defaultValue: "nextval('spa2.processo_pro_id_seq')",
                    primaryKey: true,
                    autoIncrement: true
                },
                pro_codigo: {
                    type: Sequelize.STRING,
                    allowNull: false
                },
                tpr_id: {
                    type: Sequelize.INTEGER,
                    allowNull: false
                },
                tin_id: {
                    type: Sequelize.INTEGER,
                    allowNull: false
                },
                ini_nome: {
                    type: Sequelize.STRING,
                    allowNull: false
                },
                ini_matricula: {
                    type: Sequelize.INTEGER
                },
                ini_cpf: {
                    type: Sequelize.STRING
                },
                ini_cnpj: {
                    type: Sequelize.STRING
                },
                ini_fone: {
                    type: Sequelize.STRING
                },
                ini_celular: {
                    type: Sequelize.STRING
                },
                ini_email: {
                    type: Sequelize.STRING
                },
                pro_encerramento: {
                    type: Sequelize.NOW
                },
                pro_assunto: {
                    type: Sequelize.STRING,
                    allowNull: false
                },
                versao: {
                    type: Sequelize.INTEGER,
                    allowNull: false,
                    defaultValue: 0
                },
                pro_numero: {
                    type: Sequelize.INTEGER,
                    allowNull: false
                },
                pro_autuacao: {
                    type: Sequelize.NOW,
                    allowNull: false
                },
                usu_autuador: {
                    type: Sequelize.STRING,
                    allowNull: false
                },
                set_id_autuador: {
                    type: Sequelize.STRING,
                    allowNull: false
                },
                area_id: {
                    type: Sequelize.STRING,
                    allowNull: false
                },
                pro_ultimo_tramite: {
                    type: Sequelize.NOW
                },
                usu_finalizador: {
                    type: Sequelize.STRING
                },
                set_id_finalizador: {
                    type: Sequelize.STRING
                },
                usu_alteracao: {
                    type: Sequelize.STRING,
                    allowNull: false
                },
                usu_data_hora_alteracao: {
                    type: Sequelize.NOW,
                    allowNull: false
                },
                nod_id: {
                    type: Sequelize.INTEGER,
                    allowNull: false
                }
            },
            {
                tableName: 'processo',
                schema: 'spa2',
                sequelize,
                operatorsAliases: false
            }
        );

        return this;
    }

    static associate(models) {
        this.belongsTo(models.TipoIniciativa, {
            foreignKey: 'tin_id'
        });
        this.belongsTo(models.TipoProcesso, {
            foreignKey: 'tpr_id'
        });
    }
}

export default Processo;
