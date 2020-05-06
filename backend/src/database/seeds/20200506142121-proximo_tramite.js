'use strict';

module.exports = {
    up: (queryInterface, Sequelize) => queryInterface.bulkInsert(
        { tableName: 'proximo_tramite', schema: 'spa2' },
        [
            {
                prx_id: 2,
                prx_prioridade: 10,
                nod_id: 183,
                nod_id_proximo: 184,
                raz_id: 82,
                versao: 0,
                flu_id: 10
            },
            {
                prx_id: 3,
                prx_prioridade: 10,
                nod_id: 184,
                nod_id_proximo: 185,
                raz_id: 82,
                versao: 0,
                flu_id: 10
            },
            {
                prx_id: 4,
                prx_prioridade: 10,
                nod_id: 185,
                nod_id_proximo: 186,
                raz_id: 82,
                versao: 0,
                flu_id: 10
            },
            {
                prx_id: 6,
                prx_prioridade: 10,
                nod_id: 188,
                nod_id_proximo: 189,
                raz_id: 82,
                versao: 0,
                flu_id: 9
            },
            {
                prx_id: 7,
                prx_prioridade: 10,
                nod_id: 189,
                nod_id_proximo: 190,
                raz_id: 82,
                versao: 0,
                flu_id: 9
            },
            {
                prx_id: 10,
                prx_prioridade: 10,
                nod_id: 193,
                nod_id_proximo: 194,
                raz_id: 82,
                versao: 0,
                flu_id: 11
            },
            {
                prx_id: 11,
                prx_prioridade: 10,
                nod_id: 194,
                nod_id_proximo: 195,
                raz_id: 82,
                versao: 0,
                flu_id: 11
            },
            {
                prx_id: 12,
                prx_prioridade: 10,
                nod_id: 195,
                nod_id_proximo: 196,
                raz_id: 82,
                versao: 0,
                flu_id: 11
            },
            {
                prx_id: 13,
                prx_prioridade: 10,
                nod_id: 196,
                nod_id_proximo: 197,
                raz_id: 82,
                versao: 0,
                flu_id: 11
            },
            {
                prx_id: 14,
                prx_prioridade: 10,
                nod_id: 198,
                nod_id_proximo: 199,
                raz_id: 82,
                versao: 0,
                flu_id: 5
            },
            {
                prx_id: 15,
                prx_prioridade: 10,
                nod_id: 199,
                nod_id_proximo: 200,
                raz_id: 82,
                versao: 0,
                flu_id: 5
            },
            {
                prx_id: 16,
                prx_prioridade: 10,
                nod_id: 200,
                nod_id_proximo: 201,
                raz_id: 82,
                versao: 0,
                flu_id: 5
            },
            {
                prx_id: 17,
                prx_prioridade: 10,
                nod_id: 201,
                nod_id_proximo: 202,
                raz_id: 82,
                versao: 0,
                flu_id: 5
            },
            {
                prx_id: 25,
                prx_prioridade: 10,
                nod_id: 190,
                nod_id_proximo: 213,
                raz_id: 105,
                versao: 0,
                flu_id: 9
            },
            {
                prx_id: 27,
                prx_prioridade: 10,
                nod_id: 213,
                nod_id_proximo: 216,
                raz_id: 105,
                versao: 0,
                flu_id: 9
            },
            {
                prx_id: 28,
                prx_prioridade: 10,
                nod_id: 216,
                nod_id_proximo: 217,
                raz_id: 105,
                versao: 0,
                flu_id: 9
            },
            {
                prx_id: 29,
                prx_prioridade: 10,
                nod_id: 217,
                nod_id_proximo: 218,
                raz_id: 82,
                versao: 0,
                flu_id: 9
            },
            {
                prx_id: 30,
                prx_prioridade: 10,
                nod_id: 218,
                nod_id_proximo: 219,
                raz_id: 82,
                versao: 0,
                flu_id: 9
            },
            {
                prx_id: 36,
                prx_prioridade: 10,
                nod_id: 186,
                nod_id_proximo: 187,
                raz_id: 82,
                versao: 0,
                flu_id: 10
            },
            {
                prx_id: 37,
                prx_prioridade: 10,
                nod_id: 220,
                nod_id_proximo: 221,
                raz_id: 82,
                versao: 0,
                flu_id: 14
            },
            {
                prx_id: 38,
                prx_prioridade: 10,
                nod_id: 220,
                nod_id_proximo: 222,
                raz_id: 105,
                versao: 0,
                flu_id: 14
            }

        ],
        {}
    ),

    down: (queryInterface, Sequelize) => queryInterface.bulkDelete(
        { tableName: 'proximo_tramite', schema: 'spa2' },
        null,
        {}
    )
};
