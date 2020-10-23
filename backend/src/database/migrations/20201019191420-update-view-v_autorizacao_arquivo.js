'use strict';

const viewName = 'spa2.v_autorizacao_arquivo';

const sql = `
SELECT c.for_nome AS fornecedor,
    c.for_fone AS telefone,
    c.for_email AS email,
    c.for_contato AS contato,
    c.for_cnpj_cpf AS cnpj_cpf,
    a.aut_id,
    a.aut_referencia AS referencia,
    a.aut_nf AS nota_fiscal,
    to_char((a.aut_data_expedicao_nf)::timestamp with time zone, 'DD/MM/YYYY'::text) AS data_expedicao_nf,
    a.aut_valor AS valor,
    a.aut_ban_agencia AS agencia,
    a.aut_ban_conta_corrente AS conta_corrente,
    a.aut_fatura_boleto,
    to_char(timezone('America/Sao_Paulo'::text, a.aut_data_cadastro), 'DD/MM/YYYY - HH24:MI'::text) AS data_cadastro,
    a.pro_id,
    b.ban_nome AS banco
   FROM ((spa2.autorizacao_fornecimento a
     JOIN spa2.v_fornecedores c ON ((a.for_id = c.for_id)))
     LEFT JOIN spa2.banco b ON ((a.ban_id = b.ban_id)));
`;

module.exports = {
    up: async(queryInterface, Sequelize) => {
        const transaction = await queryInterface.sequelize.transaction();
        try {
            await queryInterface.sequelize.query(`DROP VIEW ${viewName}`);
            await queryInterface.sequelize.query(`CREATE OR REPLACE VIEW ${viewName} AS ${sql}`);
            await transaction.commit();
            return Promise.resolve();
        } catch (err) {
            await transaction.rollback();
            return Promise.reject(err);
        }
    },

    down: async(queryInterface, Sequelize) => {
        // await queryInterface.sequelize.query(`DROP VIEW ${viewName}`);
    }
};
