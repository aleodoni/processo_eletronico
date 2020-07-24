import Sequelize, { Model } from 'sequelize';

class ComissaoProcessante extends Model {
    static init(sequelize) {
        super.init(
            {
                cop_id: {
                    type: Sequelize.INTEGER,
                    defaultValue: "nextval('spa2.comissao_processante_cop_id_seq')",
                    primaryKey: true,
                    autoIncrement: true
                },
                cop_matricula_membro: {
                    type: Sequelize.STRING,
                    allowNull: false
                },
                cop_nome_membro: {
                    type: Sequelize.STRING,
                    allowNull: false
                },
                cop_area_id_membro: {
                    type: Sequelize.INTEGER,
                    allowNull: false
                },
                cop_area_nome_membro: {
                    type: Sequelize.STRING,
                    allowNull: false
                },
                area_id: {
                    type: Sequelize.STRING,
                    allowNull: false
                },
                pro_id: {
                    type: Sequelize.STRING,
                    allowNull: false
                },
                cop_ativo: {
                    type: Sequelize.BOOLEAN,
                    allowNull: false
                },
                cop_login: {
                    type: Sequelize.STRING,
                    allowNull: false
                }
            },
            {
                tableName: 'comissao_processante',
                schema: 'spa2',
                sequelize,
                operatorsAliases: false
            }
        );

        return this;
    }
}

export default ComissaoProcessante;
