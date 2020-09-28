import Sequelize, { Model } from 'sequelize';

class VObservacaoTramite extends Model {
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
                nod_id_recebe: {
                    type: Sequelize.INTEGER
                },
                nod_id_envia: {
                    type: Sequelize.INTEGER
                },
                login_envia: {
                    type: Sequelize.STRING
                },
                data_hora: {
                    type: Sequelize.STRING
                },
                tra_observacao: {
                    type: Sequelize.STRING
                },
                area_id_envia: {
                    type: Sequelize.INTEGER
                },
                set_nome: {
                    type: Sequelize.STRING
                }
            },
            {
                tableName: 'v_observacao_tramite',
                schema: 'spa2',
                sequelize,
                operatorsAliases: false
            }
        );

        return this;
    }
}

export default VObservacaoTramite;
