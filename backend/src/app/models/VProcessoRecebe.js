import Sequelize, { Model } from 'sequelize';

class VProcessoRecebe extends Model {
    static init(sequelize) {
        super.init(
            {
                pro_id: {
                    type: Sequelize.INTEGER,
                    primaryKey: true
                },
                pro_codigo: {
                    type: Sequelize.STRING
                },
                tra_envio: {
                    type: Sequelize.STRING
                },
                login_envia: {
                    type: Sequelize.STRING
                },
                area_id_pendente: {
                    type: Sequelize.INTEGER
                },
                tpr_nome: {
                    type: Sequelize.STRING
                }
            },
            {
                tableName: 'v_processo_recebe',
                schema: 'spa2',
                sequelize,
                operatorsAliases: false
            }
        );

        return this;
    }
}

export default VProcessoRecebe;
