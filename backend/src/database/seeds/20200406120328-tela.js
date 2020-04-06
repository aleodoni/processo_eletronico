'use strict';

module.exports = {
    up: (queryInterface, Sequelize) => queryInterface.bulkInsert(
        { tableName: 'tela', schema: 'spa2' },
        [
            {
                tel_id: 22,
                tel_nome: 'Home',
                versao: 0
            },
            {
                tel_id: 23,
                tel_nome: 'Procesos',
                versao: 0
            },
            {
                tel_id: 24,
                tel_nome: 'Memorandos',
                versao: 0
            },
            {
                tel_id: 25,
                tel_nome: 'Manifestações',
                versao: 0
            },
            {
                tel_id: 26,
                tel_nome: 'Cadastros',
                versao: 0
            },
            {
                tel_id: 27,
                tel_nome: 'Manutenção',
                versao: 0
            },
            {
                tel_id: 28,
                tel_nome: 'Trâmites',
                versao: 0
            },
            {
                tel_id: 32,
                tel_nome: 'Complementar dados',
                versao: 0
            },
            {
                tel_id: 30,
                tel_nome: 'Consultar processo',
                versao: 0
            },
            {
                tel_id: 31,
                tel_nome: 'Criar processo',
                versao: 0
            },
            {
                tel_id: 34,
                tel_nome: 'Reabrir processo',
                versao: 0
            },
            {
                tel_id: 35,
                tel_nome: 'Consultar memorando',
                versao: 0
            },
            {
                tel_id: 36,
                tel_nome: 'Criar memorando',
                versao: 0
            },
            {
                tel_id: 37,
                tel_nome: 'Consultar manifestação',
                versao: 0
            },
            {
                tel_id: 38,
                tel_nome: 'Criar manifestação',
                versao: 0
            },
            {
                tel_id: 353,
                tel_nome: 'Menus',
                versao: 0
            },
            {
                tel_id: 413,
                tel_nome: 'Fluxos',
                versao: 0
            },
            {
                tel_id: 46,
                tel_nome: 'Enviar',
                versao: 0
            },
            {
                tel_id: 47,
                tel_nome: 'Receber',
                versao: 0
            },
            {
                tel_id: 539,
                tel_nome: 'Dados processo',
                versao: 0
            },
            {
                tel_id: 479,
                tel_nome: 'Nodos',
                versao: 0
            },
            {
                tel_id: 337,
                tel_nome: 'Telas',
                versao: 0
            },
            {
                tel_id: 33,
                tel_nome: 'Encerrar processo',
                versao: 0
            },
            {
                tel_id: 397,
                tel_nome: 'Tipos de processo',
                versao: 0
            },
            {
                tel_id: 343,
                tel_nome: 'Gêneros',
                versao: 0
            },
            {
                tel_id: 348,
                tel_nome: 'Modelos de menus',
                versao: 0
            },
            {
                tel_id: 349,
                tel_nome: 'Áreas de menus',
                versao: 0
            },
            {
                tel_id: 623,
                tel_nome: 'Razões de trâmite',
                versao: 0
            },
            {
                tel_id: 624,
                tel_nome: 'Setores',
                versao: 0
            }
        ],
        {}
    ),

    down: (queryInterface, Sequelize) => queryInterface.bulkDelete(
        { tableName: 'tela', schema: 'spa2' },
        null,
        {}
    )
};
