'use strict';

const functionName = 'spa2.verifica_observacao_tramite(int_pro_id integer, int_nod_id_recebe integer)';
const sql = `
'declare
  retorno boolean := false;
  observacao_tramite record;
begin
  for observacao_tramite in
  select count(*) as total_observacao_tramite from spa2.v_observacao_tramite where pro_id = int_pro_id and nod_id_recebe = int_nod_id_recebe
  loop
    if (observacao_tramite.total_observacao_tramite > 0) then
       retorno:= true;
    end if;
  end loop;
  return retorno;
end;'
`;

module.exports = {
    up: (queryInterface, Sequelize) => {
        return queryInterface.sequelize.query(`CREATE FUNCTION ${functionName} RETURNS boolean LANGUAGE plpgsql STABLE STRICT AS ${sql}`);
    },

    down: (queryInterface, Sequelize) => {
        return queryInterface.sequelize.query(`DROP FUNCTION ${functionName}`);
    }
};
