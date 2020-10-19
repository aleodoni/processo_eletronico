'use strict';

const viewName = 'spa2.v_area_menu';

const sql = `
SELECT a.amu_id,
b.set_id,
c.mmu_id,
b.set_nome,
c.mmu_nome
FROM spa2.area_menu a,
spa2.v_area b,
spa2.modelo_menu c
WHERE (((a.set_id)::text = (b.set_id)::text) AND (a.mmu_id = c.mmu_id));
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
