import Sequelize, { Model } from 'sequelize';

class VAutorizacaoProcesso extends Model {
    static init(sequelize) {
        super.init(
            {
                aut_id: {
                    type: Sequelize.INTEGER,
                    primaryKey: true
                },
                aut_referencia: {
                    type: Sequelize.STRING
                },
                aut_ban_agencia: {
                    type: Sequelize.STRING
                },
                aut_ban_conta_corrente: {
                    type: Sequelize.STRING
                },
                aut_valor: {
                    type: Sequelize.STRING
                },
                ban_nome: {
                    type: Sequelize.STRING
                },
                pro_id: {
                    type: Sequelize.INTEGER
                }
            },
            {
                tableName: 'v_autorizacao_processo',
                schema: 'spa2',
                sequelize,
                operatorsAliases: false
            }
        );

        return this;
    }
}

export default VAutorizacaoProcesso;
