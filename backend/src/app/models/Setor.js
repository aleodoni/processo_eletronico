import Sequelize, { Model } from 'sequelize';

class Setor extends Model {
    static init(sequelize) {
        super.init(
            {
                set_id: {
                    type: Sequelize.INTEGER,
                    defaultValue: "nextval('spa2.setor_set_id_seq')",
                    primaryKey: true,
                    autoIncrement: true
                },
                set_nome: {
                    type: Sequelize.STRING,
                    allowNull: false
                },
                set_sigla: {
                    type: Sequelize.STRING,
                    allowNull: false
                },
                set_id_area: {
                    type: Sequelize.INTEGER,
                    allowNull: false
                },
                set_ativo: {
                    type: Sequelize.BOOLEAN,
                    allowNull: false
                },
                set_tipo: {
                    type: Sequelize.STRING,
                    allowNull: false
                }
            },
            {
                tableName: 'setor',
                schema: 'spa2',
                sequelize,
                operatorsAliases: false
            }
        );

        return this;
    }
}

export default Setor;
