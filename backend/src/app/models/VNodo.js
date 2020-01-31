import Sequelize, { Model } from 'sequelize';

class VPessoaCeri extends Model {
    static init(sequelize) {
        super.init(
            {
                pes_nome: {
                    type: Sequelize.STRING,
                    primaryKey: true
                },
                pes_aposentado: {
                    type: Sequelize.INTEGER
                },
                pes_sexo: {
                    type: Sequelize.STRING
                },
                pes_setor: {
                    type: Sequelize.STRING
                },
                pes_mes_nascimento: {
                    type: Sequelize.STRING
                },
                pes_dia_nascimento: {
                    type: Sequelize.STRING
                },
                pes_logradouro: {
                    type: Sequelize.STRING
                },
                pes_numero: {
                    type: Sequelize.STRING
                },
                pes_complemento: {
                    type: Sequelize.STRING
                },
                pes_cep: {
                    type: Sequelize.INTEGER
                },
                pes_cidade: {
                    type: Sequelize.STRING
                },
                pes_bairro: {
                    type: Sequelize.STRING
                },
                pes_uf: {
                    type: Sequelize.STRING
                }
            },
            {
                tableName: 'v_pessoa_ceri',
                schema: 'ceri',
                sequelize,
                operatorsAliases: false
            }
        );

        return this;
    }
}

export default VPessoaCeri;
