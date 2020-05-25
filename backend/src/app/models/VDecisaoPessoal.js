import Sequelize, { Model } from 'sequelize';

class VDecisaoPessoal extends Model {
    static init(sequelize) {
        super.init(
            {
                pro_id: {
                    type: Sequelize.INTEGER,
                    primaryKey: true
                },
                tpr_id: {
                    type: Sequelize.INTEGER
                },
                flu_id: {
                    type: Sequelize.INTEGER
                },
                nod_id: {
                    type: Sequelize.INTEGER
                },
                area_id: {
                    type: Sequelize.STRING
                },
                nod_decisao: {
                    type: Sequelize.BOOLEAN
                },
                man_visto_executiva: {
                    type: Sequelize.STRING
                }
            },
            {
                tableName: 'v_decisao_pessoal',
                schema: 'spa2',
                sequelize,
                operatorsAliases: false
            }
        );

        return this;
    }
}

export default VDecisaoPessoal;
