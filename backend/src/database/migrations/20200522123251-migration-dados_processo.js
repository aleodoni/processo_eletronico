'use strict';

const viewName = 'spa2.v_dados_processo';

const sql = `
SELECT a.pro_id,
    a.pro_codigo,
    a.pro_nome,
    a.pro_matricula,
    spa2.formata_cpf_cnpj(a.pro_cpf) AS cpf,
    spa2.formata_cpf_cnpj(a.pro_cnpj) AS cnpj,
    a.pro_fone,
    a.pro_celular,
    a.pro_email,
    to_char(timezone('America/Sao_Paulo'::text, a.pro_encerramento), 'DD/MM/YYYY - HH24:MI'::text) AS pro_encerramento,
    a.pro_assunto,
    a.pro_numero,
    to_char(timezone('America/Sao_Paulo'::text, a.pro_autuacao), 'DD/MM/YYYY - HH24:MI'::text) AS pro_autuacao,
    a.usu_autuador,
    to_char(timezone('America/Sao_Paulo'::text, a.pro_ultimo_tramite), 'DD/MM/YYYY - HH24:MI'::text) AS pro_ultimo_tramite,
    a.usu_finalizador,
    a.usu_alteracao,
    to_char(timezone('America/Sao_Paulo'::text, a.usu_data_hora_alteracao), 'DD/MM/YYYY - HH24:MI'::text) AS usu_data_hora_alteracao,
    a.nod_id,
    a.set_id_autuador,
    a.area_id,
    a.set_id_finalizador,
    a.pro_iniciativa,
    a.pro_tipo_iniciativa,
    a.area_id_iniciativa,
    a.tpr_id,
    a.pro_contato_pj,
    a.pro_ano,
    b.tpr_nome,
    b.tpr_visualizacao,
    c.gen_nome,
    b.flu_id,
    d.flu_nome,
    e.set_nome AS area_atual_processo,
    f.set_nome AS area_iniciativa_processo,
    g.set_nome AS setor_autuador_processo,
    h.set_nome AS setor_finalizador_processo,
        CASE
            WHEN (b.tpr_visualizacao = 0) THEN 'Normal'::text
            WHEN (b.tpr_visualizacao = 1) THEN 'Restrito'::text
            WHEN (b.tpr_visualizacao = 2) THEN 'Sigiloso'::text
            ELSE NULL::text
        END AS visualizacao,
    i.nod_aval_executiva
   FROM ((((((((spa2.processo a
     JOIN spa2.tipo_processo b ON ((a.tpr_id = b.tpr_id)))
     JOIN spa2.genero c ON ((b.gen_id = c.gen_id)))
     LEFT JOIN spa2.fluxo d ON ((d.flu_id = b.flu_id)))
     JOIN spa2.v_area e ON ((e.set_id = (a.area_id)::integer)))
     JOIN spa2.v_area f ON ((f.set_id = (a.area_id)::integer)))
     JOIN spa2.v_setor g ON ((g.set_id = (a.set_id_autuador)::integer)))
     JOIN spa2.nodo i ON ((a.nod_id = i.nod_id)))
     LEFT JOIN spa2.v_setor h ON ((h.set_id = (a.set_id_finalizador)::integer)));
`;

module.exports = {
    up: (queryInterface, Sequelize) => {
        return queryInterface.sequelize.query(`CREATE VIEW ${viewName} AS ${sql}`);
    },

    down: (queryInterface, Sequelize) => {
        return queryInterface.sequelize.query(`DROP VIEW ${viewName}`);
    }
};
