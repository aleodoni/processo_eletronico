import Sequelize, { Model } from 'sequelize';

class Processo extends Model {
    static init(sequelize) {
        super.init(
            {
                pro_id: {
                    type: Sequelize.INTEGER,
                    primaryKey: true
                },
                pro_codigo: {
                    type: Sequelize.STRING
                },
                tpr_id: {
                    type: Sequelize.INTEGER,
                    allowNull: false
                },
                pro_iniciativa: {
                    type: Sequelize.STRING,
                    allowNull: false
                },
                pro_tipo_iniciativa: {
                    type: Sequelize.STRING,
                    allowNull: false
                },
                pro_nome: {
                    type: Sequelize.STRING
                },
                pro_matricula: {
                    type: Sequelize.INTEGER
                },
                pro_cpf: {
                    type: Sequelize.STRING
                },
                pro_cnpj: {
                    type: Sequelize.STRING
                },
                pro_contato_pj: {
                    type: Sequelize.STRING
                },
                pro_fone: {
                    type: Sequelize.STRING
                },
                pro_celular: {
                    type: Sequelize.STRING
                },
                pro_email: {
                    type: Sequelize.STRING
                },
                pro_encerramento: {
                    type: Sequelize.NOW
                },
                pro_assunto: {
                    type: Sequelize.STRING
                },
                versao: {
                    type: Sequelize.INTEGER,
                    allowNull: false,
                    defaultValue: 0
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
                area_id_iniciativa: {
                    type: Sequelize.STRING
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
                nod_id: {
                    type: Sequelize.INTEGER,
                    allowNull: false
                },
                pro_ano: {
                    type: Sequelize.INTEGER
                },
                pro_autuacao: {
                    type: Sequelize.NOW,
                    allowNull: false
                },
                pro_recurso: {
                    type: Sequelize.BOOLEAN,
                    allowNull: false
                },
                pro_com_abono: {
                    type: Sequelize.BOOLEAN,
                    allowNull: false
                },
                pro_num_com_abono: {
                    type: Sequelize.STRING
                },
                pro_processo_pai: {
                    type: Sequelize.STRING
                },
                pro_ip_externo: {
                    type: Sequelize.STRING
                },
                pro_enviado_externo: {
                    type: Sequelize.BOOLEAN
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
        this.belongsTo(models.TipoProcesso, {
            foreignKey: 'tpr_id'
        });
    }
}

export default Processo;
