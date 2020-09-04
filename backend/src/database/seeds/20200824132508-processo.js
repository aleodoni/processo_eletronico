'use strict';

module.exports = {
    up: async(queryInterface, Sequelize) => {
        await queryInterface.bulkInsert(
            { tableName: 'processo', schema: 'spa2' },
            [
                {
                    pro_id: 1,
                    pro_codigo: '00132/2020',
                    pro_nome: 'Tarcísio Socher',
                    pro_matricula: 2146,
                    pro_cpf: null,
                    pro_cnpj: null,
                    pro_fone: '(41) 33333333',
                    pro_celular: '(41) 44444444',
                    pro_email: 'teste@teste.com',
                    pro_assunto: null,
                    versao: 0,
                    pro_numero: 132,
                    usu_autuador: 'tarcisio.socher',
                    usu_finalizador: 'tarcisio.socher',
                    nod_id: 251,
                    set_id_autuador: 330,
                    area_id: 32,
                    set_id_finalizador: 32,
                    pro_iniciativa: 'Interna',
                    pro_tipo_iniciativa: 'Servidor Público',
                    area_id_iniciativa: 32,
                    tpr_id: 17,
                    pro_contato_pj: null,
                    pro_ano: 2020,
                    pro_ultimo_tramite: '2020-06-18',
                    pro_encerramento: '2020-06-18',
                    pro_autuacao: '2020-06-18',
                    pro_recurso: false,
                    pro_com_abono: false,
                    pro_num_com_abono: null
                }
            ],
            {}

        );

        await queryInterface.sequelize.query('select setval(\'spa2.processo_pro_id_seq\', coalesce(max(pro_id), 0)+1, false) from spa2.processo;');
    },

    down: (queryInterface, Sequelize) => queryInterface.bulkDelete(
        { tableName: 'processo', schema: 'spa2' },
        null,
        {}
    )
};
