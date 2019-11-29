import Sequelize, { Model } from 'sequelize';

class TipoIniciativa extends Model {
    static init(sequelize) {
        super.init(
            {
                tin_id: {
                    type: Sequelize.INTEGER,
                    defaultValue: "nextval('spa2.tipo_iniciativa_tin_id_seq')",
                    primaryKey: true,
                    autoIncrement: true
                },
                tin_nome: {
                    type: Sequelize.STRING,
                    allowNull: false
                },
                tin_tipo: {
                    type: Sequelize.INTEGER
                },
                versao: {
                    type: Sequelize.INTEGER,
                    allowNull: false,
                    defaultValue: 0
                }
            },
            {
                tableName: 'tipo_iniciativa',
                schema: 'spa2',
                sequelize,
                operatorsAliases: false
            }
        );

        return this;
    }
}

export default TipoIniciativa;
