'use strict';

const viewName = 'spa2.v_tipo_documento';

const sql = `
SELECT tipo_documento.tpd_id,
tipo_documento.tpd_nome,
tipo_documento.tpd_visivel,
    CASE
        WHEN tipo_documento.tpd_visivel THEN 'Sim'::text
        ELSE 'Não'::text
    END AS visivel,
tipo_documento.tpd_solicitacao_pgto,
    CASE
        WHEN tipo_documento.tpd_solicitacao_pgto THEN 'Sim'::text
        ELSE 'Não'::text
    END AS solicitacao_pgto,
('anexo'::text || tipo_documento.tpd_id) AS nome_campo_anexo,
('arquivo'::text || tipo_documento.tpd_id) AS nome_campo_arquivo
FROM spa2.tipo_documento
ORDER BY tipo_documento.tpd_nome;
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
