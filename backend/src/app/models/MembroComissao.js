import Sequelize, { Model } from 'sequelize';

class MembroComissao extends Model {
    static init(sequelize) {
        super.init(
            {
                mco_id: {
                    type: Sequelize.INTEGER,
                    defaultValue: "nextval('spa2.membro_comissao_mco_id_seq')",
                    primaryKey: true,
                    autoIncrement: true
                },
                area_id: {
                    type: Sequelize.INTEGER,
                    allowNull: false
                },
                mco_matricula: {
                    type: Sequelize.STRING,
                    allowNull: false
                },
                mco_nome: {
                    type: Sequelize.STRING,
                    allowNull: false
                },
                mco_area_id_membro: {
                    type: Sequelize.INTEGER,
                    allowNull: false
                },
                mco_ativo: {
                    type: Sequelize.BOOLEAN,
                    allowNull: false
                },
                mco_login: {
                    type: Sequelize.STRING,
                    allowNull: false
                }

            },
            {
                tableName: 'membro_comissao',
                schema: 'spa2',
                sequelize,
                operatorsAliases: false
            }
        );

        return this;
    }
}

export default MembroComissao;
