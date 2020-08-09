import Sequelize, { Model } from 'sequelize';

class VGenero extends Model {
    static init(sequelize) {
        super.init(
            {
                gen_id: {
                    type: Sequelize.INTEGER,
                    primaryKey: true
                },
                gen_nome: {
                    type: Sequelize.STRING
                },
                gen_visivel: {
                    type: Sequelize.BOOLEAN
                },
                visivel: {
                    type: Sequelize.STRING
                }
            },
            {
                tableName: 'v_genero',
                schema: 'spa2',
                sequelize,
                operatorsAliases: false
            }
        );

        return this;
    }
}

export default VGenero;
