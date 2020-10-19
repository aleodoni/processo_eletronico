'use strict';

const viewName = 'spa2.v_prazo_recurso';

const sql = `
SELECT a.pro_id,
a.pro_codigo,
b.tpr_nome AS tipo_processo,
a.pro_matricula AS matricula,
a.pro_nome AS nome,
a.pro_email AS email,
b.tpr_prazo_recurso AS prazo_recurso,
date_part('day'::text, (now() - (a.pro_encerramento)::timestamp with time zone)) AS dias,
    CASE
        WHEN (date_part('day'::text, (now() - (a.pro_encerramento)::timestamp with time zone)) > (b.tpr_prazo_recurso)::double precision) THEN true
        ELSE false
    END AS estourou_prazo
FROM spa2.processo a,
spa2.tipo_processo b
WHERE (a.pro_recurso AND (a.tpr_id = b.tpr_id));
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
