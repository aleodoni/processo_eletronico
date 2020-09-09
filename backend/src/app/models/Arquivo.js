import Sequelize, { Model } from 'sequelize';

class Arquivo extends Model {
    static init(sequelize) {
        super.init(
            {
                arq_id: {
                    type: Sequelize.INTEGER,
                    defaultValue: "nextval('spa2.arquivo_arq_id_seq')",
                    primaryKey: true,
                    autoIncrement: true
                },
                arq_nome: {
                    type: Sequelize.STRING,
                    allowNull: false
                },
                pro_id: {
                    type: Sequelize.INTEGER
                },
                man_id: {
                    type: Sequelize.INTEGER
                },
                arq_tipo: {
                    type: Sequelize.STRING
                },
                arq_removendo: {
                    type: Sequelize.BOOLEAN
                },
                arq_doc_id: {
                    type: Sequelize.INTEGER
                },
                arq_doc_tipo: {
                    type: Sequelize.STRING
                },
                versao: {
                    type: Sequelize.INTEGER,
                    allowNull: false,
                    defaultValue: 0
                },
                tpd_id: {
                    type: Sequelize.INTEGER,
                    allowNull: false
                },
                arq_data: {
                    type: Sequelize.NOW
                },
                arq_login: {
                    type: Sequelize.STRING,
                    allowNull: false
                },
                arq_hash: {
                    type: Sequelize.STRING
                }
            },
            {
                tableName: 'arquivo',
                schema: 'spa2',
                sequelize,
                operatorsAliases: false
            }
        );

        return this;
    }

    static associate(models) {
        this.belongsTo(models.Processo, {
            foreignKey: 'pro_id'
        });
    }
}

export default Arquivo;
