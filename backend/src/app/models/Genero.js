import Sequelize, { Model } from 'sequelize';

class Genero extends Model {
    static init(sequelize) {
        super.init(
            {
                gen_id: {
                    type: Sequelize.INTEGER,
                    defaultValue: "nextval('spa2.genero_gen_id_seq')",
                    primaryKey: true,
                    autoIncrement: true
                },
                gen_nome: {
                    type: Sequelize.STRING,
                    allowNull: false
                },
                versao: {
                    type: Sequelize.INTEGER,
                    allowNull: false,
                    defaultValue: 0
                }
            },
            {
                tableName: 'genero',
                schema: 'spa2',
                sequelize,
                operatorsAliases: false
            }
        );

        return this;
    }
}

export default Genero;
