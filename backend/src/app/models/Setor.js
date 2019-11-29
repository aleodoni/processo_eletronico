import Sequelize, { Model } from 'sequelize';

class Setor extends Model {
    static init(sequelize) {
        super.init(
            {
                set_id: {
                    type: Sequelize.INTEGER,
                    primaryKey: true
                },
                set_nome: Sequelize.STRING
            },
            {
                tableName: 'v_setor',
                schema: 'spa2',
                sequelize,
                operatorsAliases: false
            }
        );

        return this;
    }
}

export default Setor;
