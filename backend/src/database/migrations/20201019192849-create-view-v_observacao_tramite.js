'use strict';

const viewName = 'spa2.v_observacao_tramite';

const sql = `
SELECT a.tra_id,
    a.pro_id,
    a.nod_id_recebe,
    a.nod_id_envia,
    a.login_envia,
    to_char(timezone('America/Sao_Paulo'::text, a.tra_envio), 'DD/MM/YYYY - HH24:MI'::text) AS data_hora,
    a.tra_observacao,
    a.area_id_envia,
    b.set_nome
   FROM spa2.tramite a,
    spa2.v_setor b
  WHERE ((a.tra_observacao IS NOT NULL) AND (a.area_id_envia = b.set_id));
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
