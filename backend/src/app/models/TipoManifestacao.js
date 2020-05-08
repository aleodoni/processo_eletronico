import Sequelize, { Model } from 'sequelize';

class TipoManifestacao extends Model {
    static init(sequelize) {
        super.init(
            {
                tmn_id: {
                    type: Sequelize.INTEGER,
                    defaultValue: "nextval('spa2.tipo_manifestacao_tmn_id_seq')",
                    primaryKey: true,
                    autoIncrement: true
                },
                tmn_nome: {
                    type: Sequelize.STRING,
                    allowNull: false
                },
                versao: {
                    type: Sequelize.INTEGER,
                    allowNull: false,
                    defaultValue: 0
                },
                tmn_publica: {
                    type: Sequelize.BOOLEAN,
                    allowNull: false,
                    defaultValue: true
                }
            },

            {
                tableName: 'tipo_manifestacao',
                schema: 'spa2',
                sequelize,
                operatorsAliases: false
            }
        );

        return this;
    }
}

export default TipoManifestacao;
