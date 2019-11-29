import Sequelize, { Model } from 'sequelize';

class VTipoIniciativa extends Model {
    static init(sequelize) {
        super.init(
            {
                tin_id: {
                    type: Sequelize.INTEGER,
                    primaryKey: true
                },
                tin_tipo: {
                    type: Sequelize.INTEGER
                },
                tin_nome: {
                    type: Sequelize.STRING
                },
                tipo: {
                    type: Sequelize.STRING
                }
            },
            {
                tableName: 'v_tipo_iniciativa',
                schema: 'spa2',
                sequelize,
                operatorsAliases: false
            }
        );

        return this;
    }
}

export default VTipoIniciativa;
