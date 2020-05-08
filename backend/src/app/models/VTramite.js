import Sequelize, { Model } from 'sequelize';

class VTramite extends Model {
    static init(sequelize) {
        super.init(
            {
                tra_id: {
                    type: Sequelize.INTEGER,
                    primaryKey: true
                },
                pro_id: {
                    type: Sequelize.INTEGER
                },
                envio: {
                    type: Sequelize.STRING
                },
                login_envia: {
                    type: Sequelize.STRING
                },
                setor_envia: {
                    type: Sequelize.STRING
                },
                setor_recebe: {
                    type: Sequelize.STRING
                }
            },
            {
                tableName: 'v_tramite',
                schema: 'spa2',
                sequelize,
                operatorsAliases: false
            }
        );

        return this;
    }
}

export default VTramite;
