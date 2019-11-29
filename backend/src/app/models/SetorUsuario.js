import Sequelize, { Model } from 'sequelize';

class SetorUsuario extends Model {
    static init(sequelize) {
        super.init(
            {
                set_id: {
                    type: Sequelize.INTEGER,
                    primaryKey: true
                },
                modelolotacao: Sequelize.INTEGER,
                nivellotacao: Sequelize.INTEGER,
                set_nome: Sequelize.STRING,
                set_sigla: Sequelize.STRING,
                ativo: Sequelize.STRING
            },
            {
                tableName: 'v_cmclotacaousuario',
                schema: 'spa2',
                sequelize,
                operatorsAliases: false
            }
        );

        return this;
    }
}

export default SetorUsuario;
