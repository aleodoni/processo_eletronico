import Sequelize, { Model } from 'sequelize';

class VProcessoEnvia extends Model {
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
                area_id: {
                    type: Sequelize.INTEGER
                },
                tpr_nome: {
                    type: Sequelize.STRING
                }
            },
            {
                tableName: 'v_processo_envia',
                schema: 'spa2',
                sequelize,
                operatorsAliases: false
            }
        );

        return this;
    }
}

export default VProcessoEnvia;
