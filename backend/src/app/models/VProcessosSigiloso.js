import Sequelize, { Model } from 'sequelize';

class VProcessosSigiloso extends Model {
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
                tpr_nome: {
                    type: Sequelize.STRING
                },
                pro_nome: {
                    type: Sequelize.STRING
                },
                area_id: {
                    type: Sequelize.INTEGER
                },
                usu_autuador: {
                    type: Sequelize.STRING
                },
                nod_aval_executiva: {
                    type: Sequelize.BOOLEAN
                },
                tpr_pessoal: {
                    type: Sequelize.BOOLEAN
                },
                pessoal: {
                    type: Sequelize.STRING
                },
                nod_fim: {
                    type: Sequelize.BOOLEAN
                },
                nod_decisao: {
                    type: Sequelize.BOOLEAN
                },
                nod_dias_prazo: {
                    type: Sequelize.INTEGER
                },
                alerta: {
                    type: Sequelize.INTEGER
                },
                nod_ciencia: {
                    type: Sequelize.BOOLEAN
                },
                nod_averbacao: {
                    type: Sequelize.BOOLEAN
                },
                nod_ciencia_averbacao: {
                    type: Sequelize.BOOLEAN
                },
                nod_aval_horario: {
                    type: Sequelize.BOOLEAN
                },
                nod_contagem_tempo: {
                    type: Sequelize.BOOLEAN
                },
                nod_ciencia_calculo: {
                    type: Sequelize.BOOLEAN
                }
            },
            {
                tableName: 'v_processos_sigiloso',
                schema: 'spa2',
                sequelize,
                operatorsAliases: false
            }
        );

        return this;
    }
}

export default VProcessosSigiloso;
