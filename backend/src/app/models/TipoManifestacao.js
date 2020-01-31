import Sequelize, { Model } from 'sequelize';

class TipoManifestacao extends Model {
    static init(sequelize) {
        super.init(
            {
                tma_id: {
                    type: Sequelize.INTEGER,
                    defaultValue: "nextval('spa2.tipo_manifestacao_tma_id_seq')",
                    primaryKey: true,
                    autoIncrement: true
                },
                tma_nome: {
                    type: Sequelize.STRING,
                    allowNull: false
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
