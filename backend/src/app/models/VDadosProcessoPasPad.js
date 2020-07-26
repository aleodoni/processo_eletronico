import Sequelize, { Model } from 'sequelize';

class VDadosProcessoPasPad extends Model {
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
                pro_assunto: {
                    type: Sequelize.STRING
                },
                pro_numero: {
                    type: Sequelize.INTEGER
                },
                pro_autuacao: {
                    type: Sequelize.STRING
                },
                pro_autuacao_data: {
                    type: Sequelize.NOW
                },
                usu_autuador: {
                    type: Sequelize.STRING
                },
                pro_ultimo_tramite: {
                    type: Sequelize.STRING
                },
                usu_finalizador: {
                    type: Sequelize.STRING
                },
                nod_id: {
                    type: Sequelize.INTEGER
                },
                area_id: {
                    type: Sequelize.STRING
                },
                set_id_finalizador: {
                    type: Sequelize.STRING
                },
                pro_iniciativa: {
                    type: Sequelize.STRING
                },
                pro_tipo_iniciativa: {
                    type: Sequelize.STRING
                },
                area_id_iniciativa: {
                    type: Sequelize.STRING
                },
                tpr_id: {
                    type: Sequelize.INTEGER
                },
                pro_ano: {
                    type: Sequelize.INTEGER
                },
                tpr_nome: {
                    type: Sequelize.STRING
                },
                tpr_visualizacao: {
                    type: Sequelize.INTEGER
                },
                gen_nome: {
                    type: Sequelize.STRING
                },
                flu_id: {
                    type: Sequelize.INTEGER
                },
                flu_nome: {
                    type: Sequelize.STRING
                },
                area_atual_processo: {
                    type: Sequelize.STRING
                },
                visualizacao: {
                    type: Sequelize.STRING
                }
            },
            {
                tableName: 'v_dados_processo_pas_pad',
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

export default VDadosProcessoPasPad;
