import Sequelize, { Model } from 'sequelize';

class Manifestacao extends Model {
    static init(sequelize) {
        super.init(
            {
                man_id: {
                    type: Sequelize.INTEGER,
                    defaultValue: "nextval('spa2.manifestacao_man_id_seq')",
                    primaryKey: true,
                    autoIncrement: true
                },
                pro_id: {
                    type: Sequelize.INTEGER,
                    allowNull: false
                },
                tmn_id: {
                    type: Sequelize.INTEGER,
                    allowNull: false
                },
                man_data: {
                    type: Sequelize.NOW
                },
                man_login: {
                    type: Sequelize.STRING,
                    allowNull: false
                },
                man_visto_executiva: {
                    type: Sequelize.STRING
                },
                man_id_area: {
                    type: Sequelize.INTEGER,
                    allowNull: false
                },
                man_cancelada: {
                    type: Sequelize.BOOLEAN,
                    allowNull: false,
                    defaultValue: false
                },
                man_login_cancelamento: {
                    type: Sequelize.STRING
                },
                man_data_cancelamento: {
                    type: Sequelize.NOW
                },
                versao: {
                    type: Sequelize.INTEGER,
                    allowNull: false,
                    defaultValue: 0
                },
                nod_id: {
                    type: Sequelize.INTEGER
                },
                man_ciencia: {
                    type: Sequelize.STRING
                },
                man_averbacao: {
                    type: Sequelize.STRING
                },
                man_ciencia_averbacao: {
                    type: Sequelize.STRING
                },
                man_aval_horario: {
                    type: Sequelize.STRING
                },
                man_contagem_tempo: {
                    type: Sequelize.STRING
                },
                man_ciencia_calculo: {
                    type: Sequelize.STRING
                },
                man_tramitada: {
                    type: Sequelize.BOOLEAN,
                    allowNull: false,
                    defaultValue: false
                },
                man_parecer_projuris_aposentadoria: {
                    type: Sequelize.STRING
                },
                man_decisao_pad: {
                    type: Sequelize.STRING
                }

            },
            {
                tableName: 'manifestacao',
                schema: 'spa2',
                sequelize,
                operatorsAliases: false
            }
        );

        return this;
    }
}

export default Manifestacao;
