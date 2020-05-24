import Sequelize, { Model } from 'sequelize';

class VDadosProcesso extends Model {
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
                    type: Sequelize.INTEGER
                },
                pro_iniciativa: {
                    type: Sequelize.STRING
                },
                pro_tipo_iniciativa: {
                    type: Sequelize.STRING
                },
                pro_nome: {
                    type: Sequelize.STRING
                },
                pro_matricula: {
                    type: Sequelize.INTEGER
                },
                cpf: {
                    type: Sequelize.STRING
                },
                cnpj: {
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
                    type: Sequelize.STRING
                },
                pro_assunto: {
                    type: Sequelize.STRING
                },
                pro_numero: {
                    type: Sequelize.INTEGER
                },
                usu_autuador: {
                    type: Sequelize.STRING
                },
                set_id_autuador: {
                    type: Sequelize.STRING
                },
                area_id: {
                    type: Sequelize.STRING
                },
                area_id_iniciativa: {
                    type: Sequelize.STRING
                },
                pro_ultimo_tramite: {
                    type: Sequelize.STRING
                },
                usu_finalizador: {
                    type: Sequelize.STRING
                },
                set_id_finalizador: {
                    type: Sequelize.STRING
                },
                nod_id: {
                    type: Sequelize.INTEGER
                },
                pro_autuacao: {
                    type: Sequelize.STRING
                },
                pro_autuacao_data: {
                    type: Sequelize.NOW
                },
                pro_ano: {
                    type: Sequelize.INTEGER
                },
                tpr_nome: {
                    type: Sequelize.STRING
                },
                gen_nome: {
                    type: Sequelize.STRING
                },
                flu_nome: {
                    type: Sequelize.STRING
                },
                area_atual_processo: {
                    type: Sequelize.STRING
                },
                area_iniciativa_processo: {
                    type: Sequelize.STRING
                },
                setor_autuador_processo: {
                    type: Sequelize.STRING
                },
                setor_finalizador_processo: {
                    type: Sequelize.STRING
                },
                flu_id: {
                    type: Sequelize.INTEGER
                },
                visualizacao: {
                    type: Sequelize.STRING
                },
                nod_aval_executiva: {
                    type: Sequelize.BOOLEAN
                },
                nod_fim: {
                    type: Sequelize.BOOLEAN
                }
            },
            {
                tableName: 'v_dados_processo',
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

export default VDadosProcesso;
