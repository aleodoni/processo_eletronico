import Sequelize, { Model } from 'sequelize';

class Nodo extends Model {
    static init(sequelize) {
        super.init(
            {
                nod_id: {
                    type: Sequelize.INTEGER,
                    defaultValue: "nextval('spa2.nodo_nod_id_seq')",
                    primaryKey: true,
                    autoIncrement: true
                },
                flu_id: {
                    type: Sequelize.INTEGER,
                    allowNull: false
                },
                area_id: {
                    type: Sequelize.STRING,
                    allowNull: false
                },
                nod_inicio: {
                    type: Sequelize.BOOLEAN,
                    allowNull: false
                },
                nod_fim: {
                    type: Sequelize.BOOLEAN,
                    allowNull: false
                },
                versao: {
                    type: Sequelize.INTEGER,
                    allowNull: false,
                    defaultValue: 0
                },
                nod_dias_prazo: {
                    type: Sequelize.INTEGER,
                    allowNull: false,
                    defaultValue: 0
                },
                nod_ordem: {
                    type: Sequelize.INTEGER,
                    allowNull: false,
                    defaultValue: 0
                },
                nod_aval_executiva: {
                    type: Sequelize.BOOLEAN,
                    allowNull: false,
                    defaultValue: false
                },
                nod_decisao: {
                    type: Sequelize.BOOLEAN,
                    allowNull: false,
                    defaultValue: false
                },
                nod_interessado: {
                    type: Sequelize.BOOLEAN,
                    allowNull: false,
                    defaultValue: false
                },
                nod_ciencia: {
                    type: Sequelize.BOOLEAN,
                    allowNull: false,
                    defaultValue: false
                },
                nod_averbacao: {
                    type: Sequelize.BOOLEAN,
                    allowNull: false,
                    defaultValue: false
                },
                nod_ciencia_averbacao: {
                    type: Sequelize.BOOLEAN,
                    allowNull: false,
                    defaultValue: false
                },
                nod_aval_horario: {
                    type: Sequelize.BOOLEAN,
                    allowNull: false,
                    defaultValue: false
                },
                nod_contagem_tempo: {
                    type: Sequelize.BOOLEAN,
                    allowNull: false,
                    defaultValue: false
                },
                nod_ciencia_calculo: {
                    type: Sequelize.BOOLEAN,
                    allowNull: false,
                    defaultValue: false
                },
                nod_parecer_projuris_aposentadoria: {
                    type: Sequelize.BOOLEAN,
                    allowNull: false,
                    defaultValue: false
                },
                nod_decisao_pad: {
                    type: Sequelize.BOOLEAN,
                    allowNull: false,
                    defaultValue: false
                }
            },
            {
                tableName: 'nodo',
                schema: 'spa2',
                sequelize,
                operatorsAliases: false
            }
        );

        return this;
    }
}

export default Nodo;
