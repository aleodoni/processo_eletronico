import Sequelize, { Model } from 'sequelize';

class NomePasPad extends Model {
    static init(sequelize) {
        super.init(
            {
                nom_id: {
                    type: Sequelize.INTEGER,
                    defaultValue: "nextval('spa2.nome_pas_pad_nom_id_seq')",
                    primaryKey: true,
                    autoIncrement: true
                },
                nom_matricula: {
                    type: Sequelize.STRING,
                    allowNull: false
                },
                nom_nome: {
                    type: Sequelize.STRING,
                    allowNull: false
                },
                nom_area_id: {
                    type: Sequelize.INTEGER,
                    allowNull: false
                },
                nom_area_nome: {
                    type: Sequelize.STRING,
                    allowNull: false
                },
                pro_id: {
                    type: Sequelize.STRING,
                    allowNull: false
                },
                nom_login: {
                    type: Sequelize.STRING,
                    allowNull: false
                }
            },
            {
                tableName: 'nome_pas_pad',
                schema: 'spa2',
                sequelize,
                operatorsAliases: false
            }
        );

        return this;
    }
}

export default NomePasPad;
