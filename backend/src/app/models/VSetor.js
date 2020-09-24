import Sequelize, { Model } from 'sequelize';

class VSetor extends Model {
    static init(sequelize) {
        super.init(
            {
                set_id: {
                    type: Sequelize.INTEGER,
                    primaryKey: true
                },
                set_nome: {
                    type: Sequelize.STRING
                },
                set_sigla: {
                    type: Sequelize.STRING
                },
                set_id_area: {
                    type: Sequelize.INTEGER,
                    allowNull: false
                },
                set_ativo: {
                    type: Sequelize.BOOLEAN
                },
                set_tipo: {
                    type: Sequelize.STRING
                }
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

export default VSetor;
