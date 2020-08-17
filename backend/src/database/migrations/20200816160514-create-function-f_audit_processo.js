'use strict';

const functionName = 'spa2.f_audit_processo()';
const sql = `
'declare
Chave     spa2.audit_banco.REG_CHAVE%type;
Coluna    spa2.audit_banco.REG_COLUNA%type;
Data      constant timestamp without time zone:= CURRENT_TIMESTAMP;
Operacao  spa2.audit_banco.REG_OPERACAO%type;
Tabela    constant spa2.audit_banco.REG_TABELA%type := ''processo'';
Terminal  spa2.audit_banco.REG_TERMINAL%type;
Usuario   spa2.audit_banco.REG_LOGIN%type;
Valor     spa2.audit_banco.REG_VALOR_ANTERIOR%type;
begin
-----> Usuário que faz a operação
select session_user, coalesce(inet_client_addr(),''127.0.0.1'') into Usuario, Terminal;
-----> Chave da linha alterada
if (tg_op = ''INSERT'') then
   Chave:= trim(to_char(new.pro_id,''99999999''));
else
   Chave:= trim(to_char(old.pro_id,''99999999''));
end if;

if (tg_op = ''INSERT'') then
   -----> Na inserção não grava valores das COLUNAs
   Operacao:= ''I'';
   Coluna:= NULL;
   Valor:= NULL;
   insert into spa2.audit_banco
     (REG_LOGIN, REG_TABELA, REG_CHAVE, REG_DATA, REG_OPERACAO, REG_TERMINAL, REG_COLUNA, REG_VALOR_ANTERIOR)
     values (Usuario, Tabela, Chave, Data, Operacao, Terminal, Coluna, Valor);

elsif (tg_op = ''DELETE'') then
   Operacao := ''D'';
   if old.pro_id is not null then
      Coluna:= ''pro_id'';
      Valor:= trim(to_char(old.pro_id,''99999999''));
      insert into spa2.audit_banco
        (REG_LOGIN, REG_TABELA, REG_CHAVE, REG_DATA, REG_OPERACAO, REG_TERMINAL, REG_COLUNA, REG_VALOR_ANTERIOR)
        values (Usuario, Tabela, Chave, Data, Operacao, Terminal, Coluna, Valor);
   end if;
   if old.pro_codigo is not null then
      Coluna:= ''pro_codigo'';
      Valor:= old.pro_codigo;
      insert into spa2.audit_banco
        (REG_LOGIN, REG_TABELA, REG_CHAVE, REG_DATA, REG_OPERACAO, REG_TERMINAL, REG_COLUNA, REG_VALOR_ANTERIOR)
        values (Usuario, Tabela, Chave, Data, Operacao, Terminal, Coluna, Valor);
   end if;
   if old.pro_nome is not null then
      Coluna:= ''pro_nome'';
      Valor:= old.pro_nome;
      insert into spa2.audit_banco
        (REG_LOGIN, REG_TABELA, REG_CHAVE, REG_DATA, REG_OPERACAO, REG_TERMINAL, REG_COLUNA, REG_VALOR_ANTERIOR)
        values (Usuario, Tabela, Chave, Data, Operacao, Terminal, Coluna, Valor);
   end if;
   if old.pro_assunto is not null then
      Coluna:= ''pro_assunto'';
      Valor:= old.pro_assunto;
      insert into spa2.audit_banco
        (REG_LOGIN, REG_TABELA, REG_CHAVE, REG_DATA, REG_OPERACAO, REG_TERMINAL, REG_COLUNA, REG_VALOR_ANTERIOR)
        values (Usuario, Tabela, Chave, Data, Operacao, Terminal, Coluna, Valor);
   end if;
   if old.pro_cpf is not null then
      Coluna:= ''pro_cpf'';
      Valor:= old.pro_cpf;
      insert into spa2.audit_banco
        (REG_LOGIN, REG_TABELA, REG_CHAVE, REG_DATA, REG_OPERACAO, REG_TERMINAL, REG_COLUNA, REG_VALOR_ANTERIOR)
        values (Usuario, Tabela, Chave, Data, Operacao, Terminal, Coluna, Valor);
   end if;
   if old.pro_cnpj is not null then
      Coluna:= ''pro_cnpj'';
      Valor:= old.pro_cnpj;
      insert into spa2.audit_banco
        (REG_LOGIN, REG_TABELA, REG_CHAVE, REG_DATA, REG_OPERACAO, REG_TERMINAL, REG_COLUNA, REG_VALOR_ANTERIOR)
        values (Usuario, Tabela, Chave, Data, Operacao, Terminal, Coluna, Valor);
   end if;
   if old.pro_celular is not null then
      Coluna:= ''pro_celular'';
      Valor:= old.pro_celular;
      insert into spa2.audit_banco
        (REG_LOGIN, REG_TABELA, REG_CHAVE, REG_DATA, REG_OPERACAO, REG_TERMINAL, REG_COLUNA, REG_VALOR_ANTERIOR)
        values (Usuario, Tabela, Chave, Data, Operacao, Terminal, Coluna, Valor);
   end if;
    if old.pro_fone is not null then
      Coluna:= ''pro_fone'';
      Valor:= old.pro_fone;
      insert into spa2.audit_banco
        (REG_LOGIN, REG_TABELA, REG_CHAVE, REG_DATA, REG_OPERACAO, REG_TERMINAL, REG_COLUNA, REG_VALOR_ANTERIOR)
        values (Usuario, Tabela, Chave, Data, Operacao, Terminal, Coluna, Valor);
   end if;
   if old.pro_email is not null then
      Coluna:= ''pro_email'';
      Valor:= old.pro_email;
      insert into spa2.audit_banco
        (REG_LOGIN, REG_TABELA, REG_CHAVE, REG_DATA, REG_OPERACAO, REG_TERMINAL, REG_COLUNA, REG_VALOR_ANTERIOR)
        values (Usuario, Tabela, Chave, Data, Operacao, Terminal, Coluna, Valor);
   end if;
    if old.usu_autuador is not null then
      Coluna:= ''usu_autuador'';
      Valor:= old.usu_autuador;
      insert into spa2.audit_banco
        (REG_LOGIN, REG_TABELA, REG_CHAVE, REG_DATA, REG_OPERACAO, REG_TERMINAL, REG_COLUNA, REG_VALOR_ANTERIOR)
        values (Usuario, Tabela, Chave, Data, Operacao, Terminal, Coluna, Valor);
   end if;
    if old.usu_finalizador is not null then
      Coluna:= ''usu_finalizador'';
      Valor:= old.usu_finalizador;
      insert into spa2.audit_banco
        (REG_LOGIN, REG_TABELA, REG_CHAVE, REG_DATA, REG_OPERACAO, REG_TERMINAL, REG_COLUNA, REG_VALOR_ANTERIOR)
        values (Usuario, Tabela, Chave, Data, Operacao, Terminal, Coluna, Valor);
   end if;
   if old.tpr_id is not null then
      Coluna:= ''tpr_id'';
      Valor:= old.tpr_id;
      insert into spa2.audit_banco
        (REG_LOGIN, REG_TABELA, REG_CHAVE, REG_DATA, REG_OPERACAO, REG_TERMINAL, REG_COLUNA, REG_VALOR_ANTERIOR)
        values (Usuario, Tabela, Chave, Data, Operacao, Terminal, Coluna, Valor);
   end if;
   if old.pro_tipo_iniciativa is not null then
      Coluna:= ''pro_tipo_iniciativa'';
      Valor:= old.pro_tipo_iniciativa;
      insert into spa2.audit_banco
        (REG_LOGIN, REG_TABELA, REG_CHAVE, REG_DATA, REG_OPERACAO, REG_TERMINAL, REG_COLUNA, REG_VALOR_ANTERIOR)
        values (Usuario, Tabela, Chave, Data, Operacao, Terminal, Coluna, Valor);
   end if;
    if old.pro_matricula is not null then
      Coluna:= ''pro_matricula'';
      Valor:= old.pro_matricula;
      insert into spa2.audit_banco
        (REG_LOGIN, REG_TABELA, REG_CHAVE, REG_DATA, REG_OPERACAO, REG_TERMINAL, REG_COLUNA, REG_VALOR_ANTERIOR)
        values (Usuario, Tabela, Chave, Data, Operacao, Terminal, Coluna, Valor);
   end if;
    if old.pro_numero is not null then
      Coluna:= ''pro_numero'';
      Valor:= old.pro_numero;
      insert into spa2.audit_banco
        (REG_LOGIN, REG_TABELA, REG_CHAVE, REG_DATA, REG_OPERACAO, REG_TERMINAL, REG_COLUNA, REG_VALOR_ANTERIOR)
        values (Usuario, Tabela, Chave, Data, Operacao, Terminal, Coluna, Valor);
   end if;
   if old.set_id_autuador is not null then
      Coluna:= ''set_id_autuador'';
      Valor:= old.set_id_autuador;
      insert into spa2.audit_banco
        (REG_LOGIN, REG_TABELA, REG_CHAVE, REG_DATA, REG_OPERACAO, REG_TERMINAL, REG_COLUNA, REG_VALOR_ANTERIOR)
        values (Usuario, Tabela, Chave, Data, Operacao, Terminal, Coluna, Valor);
   end if;
    if old.area_id is not null then
      Coluna:= ''area_id'';
      Valor:= old.area_id;
      insert into spa2.audit_banco
        (REG_LOGIN, REG_TABELA, REG_CHAVE, REG_DATA, REG_OPERACAO, REG_TERMINAL, REG_COLUNA, REG_VALOR_ANTERIOR)
        values (Usuario, Tabela, Chave, Data, Operacao, Terminal, Coluna, Valor);
   end if;
   if old.set_id_finalizador is not null then
      Coluna:= ''set_id_finalizador'';
      Valor:= old.set_id_finalizador;
      insert into spa2.audit_banco
        (REG_LOGIN, REG_TABELA, REG_CHAVE, REG_DATA, REG_OPERACAO, REG_TERMINAL, REG_COLUNA, REG_VALOR_ANTERIOR)
        values (Usuario, Tabela, Chave, Data, Operacao, Terminal, Coluna, Valor);
   end if;
    if old.nod_id is not null then
      Coluna:= ''nod_id'';
      Valor:= old.nod_id;
      insert into spa2.audit_banco
        (REG_LOGIN, REG_TABELA, REG_CHAVE, REG_DATA, REG_OPERACAO, REG_TERMINAL, REG_COLUNA, REG_VALOR_ANTERIOR)
        values (Usuario, Tabela, Chave, Data, Operacao, Terminal, Coluna, Valor);
   end if;
   if old.pro_encerramento is not null then
      Coluna:= ''pro_encerramento'';
      Valor:= to_char(old.pro_encerramento,''DD/MM/YYYY HH24:MI:SS'');
      insert into spa2.audit_banco
        (REG_LOGIN, REG_TABELA, REG_CHAVE, REG_DATA, REG_OPERACAO, REG_TERMINAL, REG_COLUNA, REG_VALOR_ANTERIOR)
        values (Usuario, Tabela, Chave, Data, Operacao, Terminal, Coluna, Valor);
   end if;
   if old.pro_ultimo_tramite is not null then
      Coluna:= ''pro_ultimo_tramite'';
      Valor:= to_char(old.pro_ultimo_tramite,''DD/MM/YYYY HH24:MI:SS'');
      insert into spa2.audit_banco
        (REG_LOGIN, REG_TABELA, REG_CHAVE, REG_DATA, REG_OPERACAO, REG_TERMINAL, REG_COLUNA, REG_VALOR_ANTERIOR)
        values (Usuario, Tabela, Chave, Data, Operacao, Terminal, Coluna, Valor);
   end if;
   if old.pro_autuacao is not null then
      Coluna:= ''pro_autuacao'';
      Valor:= to_char(old.pro_autuacao,''DD/MM/YYYY HH24:MI:SS'');
      insert into spa2.audit_banco
        (REG_LOGIN, REG_TABELA, REG_CHAVE, REG_DATA, REG_OPERACAO, REG_TERMINAL, REG_COLUNA, REG_VALOR_ANTERIOR)
        values (Usuario, Tabela, Chave, Data, Operacao, Terminal, Coluna, Valor);
   end if;
   if old.pro_ano is not null then
      Coluna:= ''pro_ano'';
      Valor:= old.pro_ano;
      insert into spa2.audit_banco
        (REG_LOGIN, REG_TABELA, REG_CHAVE, REG_DATA, REG_OPERACAO, REG_TERMINAL, REG_COLUNA, REG_VALOR_ANTERIOR)
        values (Usuario, Tabela, Chave, Data, Operacao, Terminal, Coluna, Valor);
   end if;
   if old.pro_iniciativa is not null then
      Coluna:= ''pro_iniciativa'';
      Valor:= old.pro_iniciativa;
      insert into spa2.audit_banco
        (REG_LOGIN, REG_TABELA, REG_CHAVE, REG_DATA, REG_OPERACAO, REG_TERMINAL, REG_COLUNA, REG_VALOR_ANTERIOR)
        values (Usuario, Tabela, Chave, Data, Operacao, Terminal, Coluna, Valor);
   end if;
   if old.area_id_iniciativa is not null then
      Coluna:= ''area_id_iniciativa'';
      Valor:= old.area_id_iniciativa;
      insert into spa2.audit_banco
        (REG_LOGIN, REG_TABELA, REG_CHAVE, REG_DATA, REG_OPERACAO, REG_TERMINAL, REG_COLUNA, REG_VALOR_ANTERIOR)
        values (Usuario, Tabela, Chave, Data, Operacao, Terminal, Coluna, Valor);
   end if;
   if old.pro_contato_pj is not null then
      Coluna:= ''pro_contato_pj'';
      Valor:= old.pro_contato_pj;
      insert into spa2.audit_banco
        (REG_LOGIN, REG_TABELA, REG_CHAVE, REG_DATA, REG_OPERACAO, REG_TERMINAL, REG_COLUNA, REG_VALOR_ANTERIOR)
        values (Usuario, Tabela, Chave, Data, Operacao, Terminal, Coluna, Valor);
   end if;

elsif (tg_op = ''UPDATE'') then
   Operacao := ''U'';
   if (new.pro_id is distinct from old.pro_id) then
      Coluna:= ''pro_id'';
      Valor:= trim(to_char(old.pro_id,''99999999''));
      insert into spa2.audit_banco
        (REG_LOGIN, REG_TABELA, REG_CHAVE, REG_DATA, REG_OPERACAO, REG_TERMINAL, REG_COLUNA, REG_VALOR_ANTERIOR)
        values (Usuario, Tabela, Chave, Data, Operacao, Terminal, Coluna, Valor);
   end if;
   if (new.pro_codigo is distinct from old.pro_codigo) then
      Coluna:= ''pro_codigo'';
      Valor:= old.pro_codigo;
      insert into spa2.audit_banco
        (REG_LOGIN, REG_TABELA, REG_CHAVE, REG_DATA, REG_OPERACAO, REG_TERMINAL, REG_COLUNA, REG_VALOR_ANTERIOR)
        values (Usuario, Tabela, Chave, Data, Operacao, Terminal, Coluna, Valor);
   end if;
   if (new.pro_nome is distinct from old.pro_nome) then
      Coluna:= ''pro_nome'';
      Valor:= old.pro_nome;
      insert into spa2.audit_banco
        (REG_LOGIN, REG_TABELA, REG_CHAVE, REG_DATA, REG_OPERACAO, REG_TERMINAL, REG_COLUNA, REG_VALOR_ANTERIOR)
        values (Usuario, Tabela, Chave, Data, Operacao, Terminal, Coluna, Valor);
   end if;
   if (new.pro_assunto is distinct from old.pro_assunto) then
      Coluna:= ''pro_assunto'';
      Valor:= old.pro_assunto;
      insert into spa2.audit_banco
        (REG_LOGIN, REG_TABELA, REG_CHAVE, REG_DATA, REG_OPERACAO, REG_TERMINAL, REG_COLUNA, REG_VALOR_ANTERIOR)
        values (Usuario, Tabela, Chave, Data, Operacao, Terminal, Coluna, Valor);
   end if;
   if (new.pro_cpf is distinct from old.pro_cpf) then
      Coluna:= ''pro_cpf'';
      Valor:= old.pro_cpf;
      insert into spa2.audit_banco
        (REG_LOGIN, REG_TABELA, REG_CHAVE, REG_DATA, REG_OPERACAO, REG_TERMINAL, REG_COLUNA, REG_VALOR_ANTERIOR)
        values (Usuario, Tabela, Chave, Data, Operacao, Terminal, Coluna, Valor);
   end if;
    if (new.pro_cnpj is distinct from old.pro_cnpj) then
      Coluna:= ''pro_cnpj'';
      Valor:= old.pro_cnpj;
      insert into spa2.audit_banco
        (REG_LOGIN, REG_TABELA, REG_CHAVE, REG_DATA, REG_OPERACAO, REG_TERMINAL, REG_COLUNA, REG_VALOR_ANTERIOR)
        values (Usuario, Tabela, Chave, Data, Operacao, Terminal, Coluna, Valor);
   end if;
    if (new.pro_celular is distinct from old.pro_celular) then
      Coluna:= ''pro_celular'';
      Valor:= old.pro_celular;
      insert into spa2.audit_banco
        (REG_LOGIN, REG_TABELA, REG_CHAVE, REG_DATA, REG_OPERACAO, REG_TERMINAL, REG_COLUNA, REG_VALOR_ANTERIOR)
        values (Usuario, Tabela, Chave, Data, Operacao, Terminal, Coluna, Valor);
   end if;
   if (new.pro_fone is distinct from old.pro_fone) then
      Coluna:= ''pro_fone'';
      Valor:= old.pro_fone;
      insert into spa2.audit_banco
        (REG_LOGIN, REG_TABELA, REG_CHAVE, REG_DATA, REG_OPERACAO, REG_TERMINAL, REG_COLUNA, REG_VALOR_ANTERIOR)
        values (Usuario, Tabela, Chave, Data, Operacao, Terminal, Coluna, Valor);
   end if;
   if (new.pro_email is distinct from old.pro_email) then
      Coluna:= ''pro_email'';
      Valor:= old.pro_email;
      insert into spa2.audit_banco
        (REG_LOGIN, REG_TABELA, REG_CHAVE, REG_DATA, REG_OPERACAO, REG_TERMINAL, REG_COLUNA, REG_VALOR_ANTERIOR)
        values (Usuario, Tabela, Chave, Data, Operacao, Terminal, Coluna, Valor);
   end if;
   if (new.usu_autuador is distinct from old.usu_autuador) then
      Coluna:= ''usu_autuador'';
      Valor:= old.usu_autuador;
      insert into spa2.audit_banco
        (REG_LOGIN, REG_TABELA, REG_CHAVE, REG_DATA, REG_OPERACAO, REG_TERMINAL, REG_COLUNA, REG_VALOR_ANTERIOR)
        values (Usuario, Tabela, Chave, Data, Operacao, Terminal, Coluna, Valor);
   end if;
   if (new.usu_finalizador is distinct from old.usu_finalizador) then
      Coluna:= ''usu_finalizador'';
      Valor:= old.usu_finalizador;
      insert into spa2.audit_banco
        (REG_LOGIN, REG_TABELA, REG_CHAVE, REG_DATA, REG_OPERACAO, REG_TERMINAL, REG_COLUNA, REG_VALOR_ANTERIOR)
        values (Usuario, Tabela, Chave, Data, Operacao, Terminal, Coluna, Valor);
   end if;
    if (new.tpr_id is distinct from old.tpr_id) then
      Coluna:= ''tpr_id'';
      Valor:= old.tpr_id;
      insert into spa2.audit_banco
        (REG_LOGIN, REG_TABELA, REG_CHAVE, REG_DATA, REG_OPERACAO, REG_TERMINAL, REG_COLUNA, REG_VALOR_ANTERIOR)
        values (Usuario, Tabela, Chave, Data, Operacao, Terminal, Coluna, Valor);
   end if;
   if (new.pro_tipo_iniciativa is distinct from old.pro_tipo_iniciativa) then
      Coluna:= ''pro_tipo_iniciativa'';
      Valor:= old.pro_tipo_iniciativa;
      insert into spa2.audit_banco
        (REG_LOGIN, REG_TABELA, REG_CHAVE, REG_DATA, REG_OPERACAO, REG_TERMINAL, REG_COLUNA, REG_VALOR_ANTERIOR)
        values (Usuario, Tabela, Chave, Data, Operacao, Terminal, Coluna, Valor);
   end if;
   if (new.pro_matricula is distinct from old.pro_matricula) then
      Coluna:= ''pro_matricula'';
      Valor:= old.pro_matricula;
      insert into spa2.audit_banco
        (REG_LOGIN, REG_TABELA, REG_CHAVE, REG_DATA, REG_OPERACAO, REG_TERMINAL, REG_COLUNA, REG_VALOR_ANTERIOR)
        values (Usuario, Tabela, Chave, Data, Operacao, Terminal, Coluna, Valor);
   end if;
   if (new.pro_ano is distinct from old.pro_ano) then
      Coluna:= ''pro_ano'';
      Valor:= old.pro_ano;
      insert into spa2.audit_banco
        (REG_LOGIN, REG_TABELA, REG_CHAVE, REG_DATA, REG_OPERACAO, REG_TERMINAL, REG_COLUNA, REG_VALOR_ANTERIOR)
        values (Usuario, Tabela, Chave, Data, Operacao, Terminal, Coluna, Valor);
   end if;
   if (new.pro_numero is distinct from old.pro_numero) then
      Coluna:= ''pro_numero'';
      Valor:= old.pro_numero;
      insert into spa2.audit_banco
        (REG_LOGIN, REG_TABELA, REG_CHAVE, REG_DATA, REG_OPERACAO, REG_TERMINAL, REG_COLUNA, REG_VALOR_ANTERIOR)
        values (Usuario, Tabela, Chave, Data, Operacao, Terminal, Coluna, Valor);
   end if;
   if (new.set_id_autuador is distinct from old.set_id_autuador) then
      Coluna:= ''set_id_autuador'';
      Valor:= old.set_id_autuador;
      insert into spa2.audit_banco
        (REG_LOGIN, REG_TABELA, REG_CHAVE, REG_DATA, REG_OPERACAO, REG_TERMINAL, REG_COLUNA, REG_VALOR_ANTERIOR)
        values (Usuario, Tabela, Chave, Data, Operacao, Terminal, Coluna, Valor);
   end if;
    if (new.area_id is distinct from old.area_id) then
      Coluna:= ''area_id'';
      Valor:= old.area_id;
      insert into spa2.audit_banco
        (REG_LOGIN, REG_TABELA, REG_CHAVE, REG_DATA, REG_OPERACAO, REG_TERMINAL, REG_COLUNA, REG_VALOR_ANTERIOR)
        values (Usuario, Tabela, Chave, Data, Operacao, Terminal, Coluna, Valor);
   end if;
   if (new.set_id_finalizador is distinct from old.set_id_finalizador) then
      Coluna:= ''set_id_finalizador'';
      Valor:= old.set_id_finalizador;
      insert into spa2.audit_banco
        (REG_LOGIN, REG_TABELA, REG_CHAVE, REG_DATA, REG_OPERACAO, REG_TERMINAL, REG_COLUNA, REG_VALOR_ANTERIOR)
        values (Usuario, Tabela, Chave, Data, Operacao, Terminal, Coluna, Valor);
   end if;
    if (new.nod_id is distinct from old.nod_id) then
      Coluna:= ''nod_id'';
      Valor:= old.nod_id;
      insert into spa2.audit_banco
        (REG_LOGIN, REG_TABELA, REG_CHAVE, REG_DATA, REG_OPERACAO, REG_TERMINAL, REG_COLUNA, REG_VALOR_ANTERIOR)
        values (Usuario, Tabela, Chave, Data, Operacao, Terminal, Coluna, Valor);
   end if;
   if (new.pro_encerramento is distinct from old.pro_encerramento) then
      Coluna:= ''pro_encerramento'';
      Valor:= to_char(old.pro_encerramento,''DD/MM/YYYY HH24:MI:SS'');
      insert into spa2.audit_banco
        (REG_LOGIN, REG_TABELA, REG_CHAVE, REG_DATA, REG_OPERACAO, REG_TERMINAL, REG_COLUNA, REG_VALOR_ANTERIOR)
        values (Usuario, Tabela, Chave, Data, Operacao, Terminal, Coluna, Valor);
   end if;
    if (new.pro_ultimo_tramite is distinct from old.pro_ultimo_tramite) then
      Coluna:= ''pro_ultimo_tramite'';
      Valor:= to_char(old.pro_ultimo_tramite,''DD/MM/YYYY HH24:MI:SS'');
      insert into spa2.audit_banco
        (REG_LOGIN, REG_TABELA, REG_CHAVE, REG_DATA, REG_OPERACAO, REG_TERMINAL, REG_COLUNA, REG_VALOR_ANTERIOR)
        values (Usuario, Tabela, Chave, Data, Operacao, Terminal, Coluna, Valor);
   end if;
   if (new.pro_autuacao is distinct from old.pro_autuacao) then
      Coluna:= ''pro_autuacao'';
      Valor:= to_char(old.pro_autuacao,''DD/MM/YYYY HH24:MI:SS'');
      insert into spa2.audit_banco
        (REG_LOGIN, REG_TABELA, REG_CHAVE, REG_DATA, REG_OPERACAO, REG_TERMINAL, REG_COLUNA, REG_VALOR_ANTERIOR)
        values (Usuario, Tabela, Chave, Data, Operacao, Terminal, Coluna, Valor);
   end if;
   if (new.pro_iniciativa is distinct from old.pro_iniciativa) then
      Coluna:= ''pro_iniciativa'';
      Valor:= old.pro_iniciativa;
      insert into spa2.audit_banco
        (REG_LOGIN, REG_TABELA, REG_CHAVE, REG_DATA, REG_OPERACAO, REG_TERMINAL, REG_COLUNA, REG_VALOR_ANTERIOR)
        values (Usuario, Tabela, Chave, Data, Operacao, Terminal, Coluna, Valor);
   end if;
   if (new.area_id_iniciativa is distinct from old.area_id_iniciativa) then
      Coluna:= ''area_id_iniciativa'';
      Valor:= old.area_id_iniciativa;
      insert into spa2.audit_banco
        (REG_LOGIN, REG_TABELA, REG_CHAVE, REG_DATA, REG_OPERACAO, REG_TERMINAL, REG_COLUNA, REG_VALOR_ANTERIOR)
        values (Usuario, Tabela, Chave, Data, Operacao, Terminal, Coluna, Valor);
   end if;
   if (new.pro_contato_pj is distinct from old.pro_contato_pj) then
      Coluna:= ''pro_contato_pj'';
      Valor:= old.pro_contato_pj;
      insert into spa2.audit_banco
        (REG_LOGIN, REG_TABELA, REG_CHAVE, REG_DATA, REG_OPERACAO, REG_TERMINAL, REG_COLUNA, REG_VALOR_ANTERIOR)
        values (Usuario, Tabela, Chave, Data, Operacao, Terminal, Coluna, Valor);
   end if;

end if;
if (tg_op = ''DELETE'') then
   return null;
else
   return new;
end if;
end;
';

`;

module.exports = {
    up: (queryInterface, Sequelize) => {
        return queryInterface.sequelize.query(`CREATE FUNCTION ${functionName} RETURNS trigger LANGUAGE plpgsql STRICT SECURITY DEFINER AS ${sql}`);
    },

    down: (queryInterface, Sequelize) => {
        return queryInterface.sequelize.query(`DROP FUNCTION ${functionName}`);
    }
};
