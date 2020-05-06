'use strict';

module.exports = {
    up: (queryInterface, Sequelize) => queryInterface.bulkInsert(
        { tableName: 'nodo', schema: 'spa2' },
        [
            {
                nod_id: 183,
                nod_inicio: true,
                flu_id: 10,
                versao: 0,
                area_id: '556',
                nod_fim: false,
                nod_dias_prazo: 10,
                nod_ordem: 1,
                nod_aval_executiva: false
            },
            {
                nod_id: 184,
                nod_inicio: false,
                flu_id: 10,
                versao: 0,
                area_id: '7',
                nod_fim: false,
                nod_dias_prazo: 10,
                nod_ordem: 2,
                nod_aval_executiva: false
            },
            {
                nod_id: 186,
                nod_inicio: false,
                flu_id: 10,
                versao: 0,
                area_id: '7',
                nod_fim: false,
                nod_dias_prazo: 10,
                nod_ordem: 4,
                nod_aval_executiva: false
            },
            {
                nod_id: 187,
                nod_inicio: false,
                flu_id: 10,
                versao: 0,
                area_id: '556',
                nod_fim: true,
                nod_dias_prazo: 10,
                nod_ordem: 5,
                nod_aval_executiva: false
            },
            {
                nod_id: 188,
                nod_inicio: true,
                flu_id: 9,
                versao: 0,
                area_id: 556,
                nod_fim: false,
                nod_dias_prazo: 10,
                nod_ordem: 1,
                nod_aval_executiva: false
            },
            {
                nod_id: 189,
                nod_inicio: false,
                flu_id: 9,
                versao: 0,
                area_id: '7',
                nod_fim: false,
                nod_dias_prazo: 10,
                nod_ordem: 2,
                nod_aval_executiva: false
            },
            {
                nod_id: 190,
                nod_inicio: false,
                flu_id: 9,
                versao: 0,
                area_id: '398',
                nod_fim: false,
                nod_dias_prazo: 10,
                nod_ordem: 3,
                nod_aval_executiva: false
            },
            {
                nod_id: 193,
                nod_inicio: true,
                flu_id: 11,
                versao: 0,
                area_id: '556',
                nod_fim: false,
                nod_dias_prazo: 10,
                nod_ordem: 1,
                nod_aval_executiva: false
            },
            {
                nod_id: 194,
                nod_inicio: false,
                flu_id: 11,
                versao: 0,
                area_id: '7',
                nod_fim: false,
                nod_dias_prazo: 10,
                nod_ordem: 2,
                nod_aval_executiva: false
            },
            {
                nod_id: 195,
                nod_inicio: false,
                flu_id: 11,
                versao: 0,
                area_id: '398',
                nod_fim: false,
                nod_dias_prazo: 10,
                nod_ordem: 3,
                nod_aval_executiva: false
            },
            {
                nod_id: 196,
                nod_inicio: false,
                flu_id: 11,
                versao: 0,
                area_id: '7',
                nod_fim: false,
                nod_dias_prazo: 10,
                nod_ordem: 4,
                nod_aval_executiva: false
            },
            {
                nod_id: 197,
                nod_inicio: false,
                flu_id: 11,
                versao: 0,
                area_id: '556',
                nod_fim: true,
                nod_dias_prazo: 10,
                nod_ordem: 5,
                nod_aval_executiva: false
            },
            {
                nod_id: 198,
                nod_inicio: true,
                flu_id: 5,
                versao: 0,
                area_id: '556',
                nod_fim: false,
                nod_dias_prazo: 10,
                nod_ordem: 1,
                nod_aval_executiva: false
            },
            {
                nod_id: 199,
                nod_inicio: false,
                flu_id: 5,
                versao: 0,
                area_id: '7',
                nod_fim: false,
                nod_dias_prazo: 10,
                nod_ordem: 2,
                nod_aval_executiva: false
            },
            {
                nod_id: 200,
                nod_inicio: false,
                flu_id: 5,
                versao: 0,
                area_id: '398',
                nod_fim: false,
                nod_dias_prazo: 10,
                nod_ordem: 3,
                nod_aval_executiva: false
            },
            {
                nod_id: 201,
                nod_inicio: false,
                flu_id: 5,
                versao: 0,
                area_id: '7',
                nod_fim: false,
                nod_dias_prazo: 10,
                nod_ordem: 4,
                nod_aval_executiva: false
            },
            {
                nod_id: 202,
                nod_inicio: false,
                flu_id: 5,
                versao: 0,
                area_id: '556',
                nod_fim: true,
                nod_dias_prazo: 10,
                nod_ordem: 5,
                nod_aval_executiva: false
            },
            {
                nod_id: 211,
                nod_inicio: true,
                flu_id: 18,
                versao: 0,
                area_id: '32',
                nod_fim: false,
                nod_dias_prazo: 5,
                nod_ordem: 1,
                nod_aval_executiva: false
            },
            {
                nod_id: 185,
                nod_inicio: false,
                flu_id: 10,
                versao: 0,
                area_id: '398',
                nod_fim: false,
                nod_dias_prazo: 10,
                nod_ordem: 3,
                nod_aval_executiva: true
            },
            {
                nod_id: 213,
                nod_inicio: false,
                flu_id: 9,
                versao: 0,
                area_id: '88',
                nod_fim: false,
                nod_dias_prazo: 10,
                nod_ordem: 4,
                nod_aval_executiva: true
            },
            {
                nod_id: 216,
                nod_inicio: false,
                flu_id: 9,
                versao: 0,
                area_id: '558',
                nod_fim: false,
                nod_dias_prazo: 10,
                nod_ordem: 5,
                nod_aval_executiva: true
            },
            {
                nod_id: 217,
                nod_inicio: false,
                flu_id: 9,
                versao: 0,
                area_id: '559',
                nod_fim: false,
                nod_dias_prazo: 10,
                nod_ordem: 6,
                nod_aval_executiva: true
            },
            {
                nod_id: 218,
                nod_inicio: false,
                flu_id: 9,
                versao: 0,
                area_id: '7',
                nod_fim: false,
                nod_dias_prazo: 10,
                nod_ordem: 7,
                nod_aval_executiva: false
            },
            {
                nod_id: 219,
                nod_inicio: false,
                flu_id: 9,
                versao: 0,
                area_id: '556',
                nod_fim: true,
                nod_dias_prazo: 10,
                nod_ordem: 8,
                nod_aval_executiva: false
            },
            {
                nod_id: 220,
                nod_inicio: true,
                flu_id: 14,
                versao: 0,
                area_id: '556',
                nod_fim: false,
                nod_dias_prazo: 10,
                nod_ordem: 1,
                nod_aval_executiva: false
            },
            {
                nod_id: 221,
                nod_inicio: false,
                flu_id: 14,
                versao: 0,
                area_id: '7',
                nod_fim: false,
                nod_dias_prazo: 10,
                nod_ordem: 2,
                nod_aval_executiva: false
            },
            {
                nod_id: 222,
                nod_inicio: false,
                flu_id: 14,
                versao: 0,
                area_id: '4',
                nod_fim: false,
                nod_dias_prazo: 10,
                nod_ordem: 3,
                nod_aval_executiva: false
            }
        ],
        {}
    ),

    down: (queryInterface, Sequelize) => queryInterface.bulkDelete(
        { tableName: 'nodo', schema: 'spa2' },
        null,
        {}
    )
};
