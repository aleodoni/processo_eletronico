'use strict';

const viewName = 'spa2.v_manifestacao';

const sql = `
SELECT a.man_id,
a.pro_id,
a.tmn_id,
b.tmn_nome,
a.man_login,
a.man_id_area,
c.set_nome,
a.man_cancelada,
a.man_login_cancelamento,
a.man_visto_executiva,
a.man_data_cancelamento,
a.man_data,
a.nod_id,
a.man_ciencia,
a.man_averbacao,
a.man_ciencia_averbacao,
a.man_aval_horario,
a.man_contagem_tempo,
a.man_ciencia_calculo,
a.man_tramitada,
a.man_parecer_projuris_aposentadoria
FROM spa2.manifestacao a,
spa2.tipo_manifestacao b,
spa2.v_area c,
spa2.processo d
WHERE ((a.tmn_id = b.tmn_id) AND (a.man_id_area = c.set_id) AND (a.pro_id = d.pro_id) AND (a.nod_id = d.nod_id));
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
