import Sequelize, { Model } from 'sequelize';

class VProcessosPessoais extends Model {
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
                area_id: {
                    type: Sequelize.INTEGER
                },
                usu_autuador: {
                    type: Sequelize.STRING
                },
                nod_aval_executiva: {
                    type: Sequelize.BOOLEAN
                }
            },
            {
                tableName: 'v_processos_pessoais',
                schema: 'spa2',
                sequelize,
                operatorsAliases: false
            }
        );

        return this;
    }
}

export default VProcessosPessoais;
