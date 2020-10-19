'use strict';

const viewName = 'spa2.v_arquivos_manifestacao';

const sql = `
SELECT row_number() OVER (ORDER BY b.arq_id) AS contador,
b.arq_id,
b.arq_nome,
b.man_id,
b.arq_tipo,
to_char(timezone('America/Sao_Paulo'::text, b.arq_data), 'DD/MM/YYYY - HH24:MI'::text) AS data,
b.arq_login,
e.tpd_nome
FROM (spa2.arquivo b
 JOIN spa2.tipo_documento e ON ((e.tpd_id = b.tpd_id)));
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
