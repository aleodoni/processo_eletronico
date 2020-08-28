'use strict';

const functionName = 'spa2.ftd_arquivo()';
const sql = `
'begin
if not coalesce(old.arq_removendo,false) then ---> remoção controlada para remover arquivo físico junto com bd
  raise exception ''Arquivo deve ser removido via arquivo.remove para remover arquivo físico com o registro no banco de dados ("%").'',old.arq_id;
  return null;
else
  return old;
end if;
end
';


`;

module.exports = {
    up: (queryInterface, Sequelize) => {
        return queryInterface.sequelize.query(`CREATE FUNCTION ${functionName} RETURNS trigger LANGUAGE plpgsql AS ${sql}`);
    },

    down: (queryInterface, Sequelize) => {
        return queryInterface.sequelize.query(`DROP FUNCTION ${functionName}`);
    }
};
