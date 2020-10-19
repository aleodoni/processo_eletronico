'use strict';

const viewName = 'spa2.nodo_expandido';

const sql = `
SELECT n.flu_id,
n.nod_id,
setor.set_id,
setor.set_nome,
setor.set_sigla
FROM (spa2.nodo n
 JOIN spa2.setor setor ON (((n.area_id)::integer = setor.set_id)))
WHERE ((setor.set_tipo <> 'E'::bpchar) AND setor.set_ativo)
UNION
SELECT n.flu_id,
n.nod_id,
setor.set_id,
setor.set_nome,
setor.set_sigla
FROM (spa2.nodo n
 CROSS JOIN spa2.setor setor)
WHERE ((setor.set_tipo = 'G'::bpchar) AND setor.set_ativo AND ((n.area_id)::integer = 557))
UNION
SELECT n.flu_id,
n.nod_id,
setor.set_id,
setor.set_nome,
setor.set_sigla
FROM (spa2.nodo n
 CROSS JOIN spa2.setor setor)
WHERE ((setor.set_tipo <> 'E'::bpchar) AND setor.set_ativo AND ((n.area_id)::integer = 556));

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
