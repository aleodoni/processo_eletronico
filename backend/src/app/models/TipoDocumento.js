import Sequelize, { Model } from 'sequelize';

class TipoDocumento extends Model {
    static init(sequelize) {
        super.init(
            {
                tpd_id: {
                    type: Sequelize.INTEGER,
                    defaultValue: "nextval('spa2.tipo_documento_tpd_id_seq')",
                    primaryKey: true,
                    autoIncrement: true
                },
                tpd_nome: {
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
                tableName: 'tipo_documento',
                schema: 'spa2',
                sequelize,
                operatorsAliases: false
            }
        );

        return this;
    }
}

export default TipoDocumento;
