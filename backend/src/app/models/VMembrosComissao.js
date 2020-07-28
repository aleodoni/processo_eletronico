import Sequelize, { Model } from 'sequelize';

class VMembrosComissao extends Model {
    static init(sequelize) {
        super.init(
            {
                mco_id: {
                    type: Sequelize.INTEGER,
                    primaryKey: true
                },
                mco_matricula: {
                    type: Sequelize.STRING,
                    allowNull: false
                },
                mco_nome: {
                    type: Sequelize.STRING,
                    allowNull: false
                },
                mco_login: {
                    type: Sequelize.STRING,
                    allowNull: false
                },
                set_nome: {
                    type: Sequelize.STRING,
                    allowNull: false
                },
                mco_ativo: {
                    type: Sequelize.BOOLEAN,
                    allowNull: false
                },
                ativo: {
                    type: Sequelize.STRING,
                    allowNull: false
                }

            },
            {
                tableName: 'v_membros_comissao',
                schema: 'spa2',
                sequelize,
                operatorsAliases: false
            }
        );

        return this;
    }
}

export default VMembrosComissao;
