import Sequelize, { Model } from 'sequelize';

class VTipoDocumento extends Model {
    static init(sequelize) {
        super.init(
            {
                tpd_id: {
                    type: Sequelize.INTEGER,
                    primaryKey: true
                },
                tpd_nome: {
                    type: Sequelize.STRING
                },
                tpd_visivel: {
                    type: Sequelize.BOOLEAN
                },
                visivel: {
                    type: Sequelize.STRING
                }
            },
            {
                tableName: 'v_tipo_documento',
                schema: 'spa2',
                sequelize,
                operatorsAliases: false
            }
        );

        return this;
    }
}

export default VTipoDocumento;
