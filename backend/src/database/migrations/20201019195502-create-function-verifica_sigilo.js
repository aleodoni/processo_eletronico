'use strict';

const functionName = 'spa2.verifica_sigilo(str_login character varying)';
const sql = `
'declare
retorno boolean = false;
comissao_processante record;
presidencia record;
sigilo record;
begin
-- Verifica se o login está lotado na presidência
for presidencia in
select count(*) as total_presidencia from spa2.lotacao where pes_login = str_login and set_id = 88
loop
  if (presidencia.total_presidencia > 0) then
     retorno:= true;
  end if;
end loop;
-- Verifica na tabela de comissão processante
for comissao_processante in
  select count(*) as total_comissao_processante
  from spa2.comissao_processante a, spa2.membro_comissao b
  where a.mco_id = b.mco_id
  and b.mco_ativo
  and b.mco_login = str_login
loop
  if (comissao_processante.total_comissao_processante > 0) then
     retorno:= true;
  end if;
end loop;
-- Verifica na tabela de sigilo
for sigilo in
  select count(*) as total_sigilo
  from spa2.sigilo
  where sig_login = str_login
loop
  if (sigilo.total_sigilo > 0) then
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
