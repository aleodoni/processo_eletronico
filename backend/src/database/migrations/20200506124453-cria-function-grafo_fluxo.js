'use strict';

const functionName = 'spa2.grafo_fluxo(arg_flu integer)';
const sql = `
    'DECLARE
        retorno text = '''';
        titulo text;
        transicao record;
        no record;
        estado_no record;
        nodoInicial varchar = '''';
  BEGIN
    -- cabeçalho
    retorno := ''digraph Fluxo_''||to_char(arg_flu,''FM000000'')||E'' { \n'';

    SELECT flu_id || ''. ''|| flu_nome INTO titulo FROM spa2.fluxo WHERE flu_id = arg_flu;
    retorno := retorno || ''graph [ label = "'' || titulo || E''" fontsize = 16 labelloc = "t" labeljust = "c" fontname = "arial"]\n'';

    retorno := retorno || E''/* Setores (nodos) */ \n'';
    retorno := retorno || E''node [shape = box, fontsize = 10 style="rounded,filled"]\n'';
    FOR no IN
      SELECT nod_id, set_sigla, nod_inicio, nod_fim, nod_ordem
      FROM spa2.nodo INNER JOIN spa2.setor ON nodo.area_id::integer = setor.set_id
      WHERE flu_id = arg_flu
      ORDER BY nod_id
    LOOP
      retorno:= retorno || ''n''||no.nod_id||'' [ fontname = "arial" label = "'' || no.set_sigla || E''\\nNó: ''||no.nod_ordem ;
      IF no.nod_fim THEN
         retorno:= retorno || E''\\n(Fim)'';
      END IF;
      retorno:= retorno || E''"]\n'';
      IF no.nod_inicio THEN
        nodoInicial:= ''n''||no.nod_id;
      END IF;
    END LOOP;
    IF nodoInicial <> '''' THEN
      retorno := retorno || E''nInicio [ fontname = "arial" label="", fillcolor=black, shape=circle, style=filled ]\n'';
    END IF;

    retorno := retorno || E''/* Transições (arestas) */ \n'';
    retorno := retorno || E''edge [ fontsize=10 ]\n'';
    IF nodoInicial <> '''' THEN
      retorno := retorno || ''nInicio -> ''||nodoInicial||E'' [ fontname = "arial" label="Início" ]\n'';
    END IF;
    FOR transicao IN
      SELECT ''n''||nod_id||'' -> n''||nod_id_proximo as descricao,
        '' '' || r.raz_nome as rotulo
      FROM spa2.proximo_tramite px
        INNER JOIN spa2.razao_tramite r using (raz_id)
      WHERE flu_id = arg_flu
      LOOP
        retorno:= retorno || transicao.descricao || '' [ fontname = "arial" label = "'' || transicao.rotulo || E''"]\n'';
    END LOOP;

    -- fecha grafo
    retorno := retorno || E''} \n'';

    return retorno;
  END;'
`;

module.exports = {
    up: (queryInterface, Sequelize) => {
        return queryInterface.sequelize.query(`CREATE FUNCTION ${functionName} RETURNS text LANGUAGE plpgsql STABLE STRICT AS ${sql}`);
    },

    down: (queryInterface, Sequelize) => {
        return queryInterface.sequelize.query(`DROP FUNCTION ${functionName}`);
    }
};
