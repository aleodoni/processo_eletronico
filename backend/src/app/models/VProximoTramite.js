import Sequelize, { Model } from 'sequelize';

class VProximoTramite extends Model {
    static init(sequelize) {
        super.init(
            {
                prx_id: {
                    type: Sequelize.INTEGER,
                    primaryKey: true
                },
                flu_id: {
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
                nodo: {
                    type: Sequelize.STRING
                },
                nodo_proximo: {
                    type: Sequelize.STRING
                },
                raz_nome: {
                    type: Sequelize.STRING
                },
                prx_prioridade: {
                    type: Sequelize.INTEGER
                }
            },
            {
                tableName: 'v_proximo_tramite',
                schema: 'spa2',
                sequelize,
                operatorsAliases: false
            }
        );

        return this;
    }
}

export default VProximoTramite;
