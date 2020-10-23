'use strict';

const viewName = 'spa2.v_arquivo_processo_pgto';

const sql = `
SELECT a.arq_id,
    a.arq_nome,
        CASE
            WHEN (b.tpd_id = ANY (ARRAY[42, 43, 44, 45, 46, 47, 48, 49, 50, 51, 52, 54])) THEN "substring"((a.arq_nome)::text, 34)
            WHEN (b.tpd_id <> ALL (ARRAY[42, 43, 44, 45, 46, 47, 48, 49, 50, 51, 52, 54])) THEN (a.arq_nome)::text
            ELSE NULL::text
        END AS arq_nome_visivel,
    a.pro_id,
    c.pro_ano,
    a.arq_tipo,
    a.arq_doc_id,
    a.arq_data,
    a.arq_login,
    a.arq_hash,
    a.arq_cancelado,
    b.tpd_id,
    b.tpd_nome
   FROM spa2.arquivo a,
    spa2.tipo_documento b,
    spa2.processo c
  WHERE ((a.tpd_id = b.tpd_id) AND (c.pro_id = a.pro_id))
  ORDER BY a.arq_id;
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
