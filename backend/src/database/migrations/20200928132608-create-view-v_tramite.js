'use strict';

const viewName = 'spa2.v_tramite';

const sql = `
SELECT row_number() OVER (ORDER BY a.tra_envio) AS seq,
a.tra_id,
a.pro_id,
to_char(a.tra_envio, 'DD/MM/YYYY - HH24:MI'::text) AS envio,
a.login_envia,
setor_envia.set_nome AS setor_envia,
setor_recebe.set_nome AS setor_recebe,
    CASE
        WHEN (a.tra_inicial = true) THEN 'Sim'::text
        ELSE 'Não'::text
    END AS inicial
FROM ((spa2.tramite a
 JOIN spa2.setor setor_envia ON ((setor_envia.set_id = a.area_id_envia)))
 JOIN spa2.setor setor_recebe ON ((setor_recebe.set_id = a.area_id_recebe)))
ORDER BY a.tra_envio;
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
