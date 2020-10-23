'use strict';

const viewName = 'spa2.v_autorizacao_processo';

const sql = `
SELECT a.aut_id,
    a.aut_referencia,
    a.aut_ban_agencia,
    a.aut_ban_conta_corrente,
    to_char(a.aut_valor, 'L9G999G990D99'::text) AS aut_valor,
    b.ban_nome,
    a.pro_id
   FROM (spa2.autorizacao_fornecimento a
     LEFT JOIN spa2.banco b ON ((a.ban_id = b.ban_id)));
`;

module.exports = {
    up: async(queryInterface, Sequelize) => {
        const transaction = await queryInterface.sequelize.transaction();
        try {
            await queryInterface.sequelize.query(`CREATE OR REPLACE VIEW ${viewName} AS ${sql}`);
            await transaction.commit();
            return Promise.resolve();
        } catch (err) {
            await transaction.rollback();
            return Promise.reject(err);
        }
    },

    down: async(queryInterface, Sequelize) => {
        await queryInterface.sequelize.query(`DROP VIEW ${viewName}`);
    }
};
