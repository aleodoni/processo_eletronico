import Sequelize, { Model } from 'sequelize';

class VAreaTramitacaoPessoal extends Model {
    static init(sequelize) {
        super.init(
            {
                pes_login: {
                    type: Sequelize.STRING,
                    primaryKey: true
                },
                area_id: Sequelize.INTEGER,
                set_nome: Sequelize.STRING
            },
            {
                tableName: 'v_area_tramitacao_pessoal',
                schema: 'spa2',
                sequelize,
                operatorsAliases: false
            }
        );

        return this;
    }
}

export default VAreaTramitacaoPessoal;
