import Sequelize, { Model } from 'sequelize';

class RazaoTramite extends Model {
    static init(sequelize) {
        super.init(
            {
                raz_id: {
                    type: Sequelize.INTEGER,
                    defaultValue: "nextval('spa2.razao_tramite_raz_id_seq')",
                    primaryKey: true,
                    autoIncrement: true
                },
                raz_nome: {
                    type: Sequelize.STRING,
                    allowNull: false
                }
            },
            {
                tableName: 'razao_tramite',
                schema: 'spa2',
                sequelize,
                operatorsAliases: false
            }
        );

        return this;
    }
}

export default RazaoTramite;
