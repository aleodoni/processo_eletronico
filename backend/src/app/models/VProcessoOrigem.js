import Sequelize, { Model } from 'sequelize';

class VProcessoOrigem extends Model {
    static init(sequelize) {
        super.init(
            {
                pro_id_atual: {
                    type: Sequelize.INTEGER,
                    primaryKey: true
                },
                processo_atual: {
                    type: Sequelize.STRING
                },
                pro_id_origem: {
                    type: Sequelize.INTEGER
                },
                processo_origem: {
                    type: Sequelize.STRING
                }
            },
            {
                tableName: 'v_processo_origem',
                schema: 'spa2',
                sequelize,
                operatorsAliases: false
            }
        );

        return this;
    }
}

export default VProcessoOrigem;
