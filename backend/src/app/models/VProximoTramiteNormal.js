import Sequelize, { Model } from 'sequelize';

class VProximoTramiteNormal extends Model {
    static init(sequelize) {
        super.init(
            {
                prx_id: {
                    type: Sequelize.INTEGER,
                    primaryKey: true
                },
                pro_id: {
                    type: Sequelize.INTEGER
                },
                nod_id: {
                    type: Sequelize.INTEGER
                },
                nod_id_proximo: {
                    type: Sequelize.INTEGER
                },
                raz_id: {
                    type: Sequelize.INTEGER
                },
                raz_nome: {
                    type: Sequelize.STRING
                },
                set_id: {
                    type: Sequelize.INTEGER
                },
                set_nome: {
                    type: Sequelize.STRING
                },
                set_sigla: {
                    type: Sequelize.STRING
                }
            },
            {
                tableName: 'proximo_tramite_normal',
                schema: 'spa2',
                sequelize,
                operatorsAliases: false
            }
        );

        return this;
    }
}

export default VProximoTramiteNormal;
