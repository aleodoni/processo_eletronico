'use strict';

module.exports = {
    up: (queryInterface, Sequelize) => queryInterface.bulkInsert(
        { tableName: 'menu', schema: 'spa2' },
        [
            {
                men_id: 37,
                men_id_pai: null,
                men_nome: 'Home',
                men_url: '/home',
                tel_id: 22,
                versao: 0,
                mmu_id: 1,
                men_ordem_pai: 1,
                tel_interna: false
            },
            {
                men_id: 38,
                men_id_pai: null,
                men_nome: 'Processos',
                men_url: null,
                tel_id: 23,
                versao: 0,
                mmu_id: 1,
                men_ordem_pai: 2,
                tel_interna: false
            },
            {
                men_id: 39,
                men_id_pai: null,
                men_nome: 'Memorandos',
                men_url: null,
                tel_id: 24,
                versao: 0,
                mmu_id: 1,
                men_ordem_pai: 3,
                tel_interna: false
            },
            {
                men_id: 40,
                men_id_pai: null,
                men_nome: 'Manifestações',
                men_url: null,
                tel_id: 25,
                versao: 0,
                mmu_id: 1,
                men_ordem_pai: 4,
                tel_interna: false
            },
            {
                men_id: 42,
                men_id_pai: null,
                men_nome: 'Trâmites',
                men_url: null,
                tel_id: 28,
                versao: 0,
                mmu_id: 1,
                men_ordem_pai: 5,
                tel_interna: false
            },
            {
                men_id: 43,
                men_id_pai: null,
                men_nome: 'Manutenção',
                men_url: null,
                tel_id: 27,
                versao: 0,
                mmu_id: 1,
                men_ordem_pai: 7,
                tel_interna: false
            },
            {
                men_id: 64,
                men_id_pai: null,
                men_nome: 'Home',
                men_url: '/home',
                tel_id: 22,
                versao: 0,
                mmu_id: 2,
                men_ordem_pai: 1,
                tel_interna: false
            },
            {
                men_id: 65,
                men_id_pai: null,
                men_nome: 'Processos',
                men_url: null,
                tel_id: 23,
                versao: 0,
                mmu_id: 2,
                men_ordem_pai: 2,
                tel_interna: false
            },
            {
                men_id: 66,
                men_id_pai: null,
                men_nome: 'Memorandos',
                men_url: null,
                tel_id: 24,
                versao: 0,
                mmu_id: 2,
                men_ordem_pai: 3,
                tel_interna: false
            },
            {
                men_id: 67,
                men_id_pai: null,
                men_nome: 'Manifestações',
                men_url: null,
                tel_id: 25,
                versao: 0,
                mmu_id: 2,
                men_ordem_pai: 4,
                tel_interna: false
            },
            {
                men_id: 68,
                men_id_pai: null,
                men_nome: 'Trâmites',
                men_url: null,
                tel_id: 28,
                versao: 0,
                mmu_id: 2,
                men_ordem_pai: 5,
                tel_interna: false
            },
            {
                men_id: 440,
                men_id_pai: null,
                men_nome: 'Dados processo',
                men_url: '/dados-processo',
                tel_id: 539,
                versao: 0,
                mmu_id: 1,
                men_ordem_pai: null,
                tel_interna: true
            },
            {
                men_id: 441,
                men_id_pai: null,
                men_nome: 'Dados processo',
                men_url: '/dados-processo',
                tel_id: 539,
                versao: 0,
                mmu_id: 2,
                men_ordem_pai: null,
                tel_interna: true
            },
            {
                men_id: 45,
                men_id_pai: 38,
                men_nome: 'Consultar',
                men_url: '/processo-consulta',
                tel_id: 30,
                versao: 0,
                mmu_id: 1,
                men_ordem_pai: null,
                tel_interna: false
            },
            {
                men_id: 74,
                men_id_pai: 67,
                men_nome: 'Consultar',
                men_url: '/home',
                tel_id: 37,
                versao: 0,
                mmu_id: 2,
                men_ordem_pai: null,
                tel_interna: false
            },
            {
                men_id: 71,
                men_id_pai: 65,
                men_nome: 'Criar',
                men_url: '/processo-cria',
                tel_id: 31,
                versao: 0,
                mmu_id: 2,
                men_ordem_pai: null,
                tel_interna: false
            },
            {
                men_id: 46,
                men_id_pai: 38,
                men_nome: 'Criar novo',
                men_url: '/processo-cria',
                tel_id: 31,
                versao: 0,
                mmu_id: 1,
                men_ordem_pai: null,
                tel_interna: false
            },
            {
                men_id: 75,
                men_id_pai: 67,
                men_nome: 'Criar nova',
                men_url: '/home',
                tel_id: 38,
                versao: 0,
                mmu_id: 2,
                men_ordem_pai: null,
                tel_interna: false
            },
            {
                men_id: 76,
                men_id_pai: 68,
                men_nome: 'Enviar',
                men_url: '/home',
                tel_id: 46,
                versao: 0,
                mmu_id: 2,
                men_ordem_pai: null,
                tel_interna: false
            },
            {
                men_id: 70,
                men_id_pai: 65,
                men_nome: 'Consultar',
                men_url: '/processo-consulta',
                tel_id: 30,
                versao: 0,
                mmu_id: 2,
                men_ordem_pai: null,
                tel_interna: false
            },
            {
                men_id: 47,
                men_id_pai: 38,
                men_nome: 'Complementar dados',
                men_url: '/complementar-dados',
                tel_id: 32,
                versao: 0,
                mmu_id: 1,
                men_ordem_pai: null,
                tel_interna: false
            },
            {
                men_id: 48,
                men_id_pai: 38,
                men_nome: 'Encerrar',
                men_url: '/home',
                tel_id: 33,
                versao: 0,
                mmu_id: 1,
                men_ordem_pai: null,
                tel_interna: false
            },
            {
                men_id: 49,
                men_id_pai: 38,
                men_nome: 'Reabrir',
                men_url: '/processo-consulta',
                tel_id: 34,
                versao: 0,
                mmu_id: 1,
                men_ordem_pai: null,
                tel_interna: false
            },
            {
                men_id: 50,
                men_id_pai: 39,
                men_nome: 'Consultar',
                men_url: '/home',
                tel_id: 35,
                versao: 0,
                mmu_id: 1,
                men_ordem_pai: null,
                tel_interna: false
            },
            {
                men_id: 51,
                men_id_pai: 39,
                men_nome: 'Criar novo',
                men_url: '/home',
                tel_id: 36,
                versao: 0,
                mmu_id: 1,
                men_ordem_pai: null,
                tel_interna: false
            },
            {
                men_id: 52,
                men_id_pai: 40,
                men_nome: 'Consultar',
                men_url: '/home',
                tel_id: 37,
                versao: 0,
                mmu_id: 1,
                men_ordem_pai: null,
                tel_interna: false
            },
            {
                men_id: 53,
                men_id_pai: 40,
                men_nome: 'Criar nova',
                men_url: '/home',
                tel_id: 38,
                versao: 0,
                mmu_id: 1,
                men_ordem_pai: null,
                tel_interna: false
            },
            {
                men_id: 59,
                men_id_pai: 42,
                men_nome: 'Enviar',
                men_url: '/home',
                tel_id: 46,
                versao: 0,
                mmu_id: 1,
                men_ordem_pai: null,
                tel_interna: false
            },
            {
                men_id: 60,
                men_id_pai: 42,
                men_nome: 'Receber',
                men_url: '/home',
                tel_id: 47,
                versao: 0,
                mmu_id: 1,
                men_ordem_pai: null,
                tel_interna: false
            },
            {
                men_id: 73,
                men_id_pai: 66,
                men_nome: 'Criar novo',
                men_url: '/home',
                tel_id: 36,
                versao: 0,
                mmu_id: 2,
                men_ordem_pai: null,
                tel_interna: false
            },
            {
                men_id: 328,
                men_id_pai: 43,
                men_nome: 'Tipos de processo',
                men_url: '/tipos-processo',
                tel_id: 397,
                versao: 0,
                mmu_id: 1,
                men_ordem_pai: null,
                tel_interna: false
            },
            {
                men_id: 344,
                men_id_pai: 43,
                men_nome: 'Fluxos',
                men_url: '/fluxos',
                tel_id: 413,
                versao: 0,
                mmu_id: 1,
                men_ordem_pai: null,
                tel_interna: false
            },
            {
                men_id: 282,
                men_id_pai: 43,
                men_nome: 'Telas',
                men_url: '/telas',
                tel_id: 337,
                versao: 0,
                mmu_id: 1,
                men_ordem_pai: null,
                tel_interna: false
            },
            {
                men_id: 63,
                men_id_pai: 43,
                men_nome: 'Gêneros',
                men_url: '/generos',
                tel_id: 343,
                versao: 0,
                mmu_id: 1,
                men_ordem_pai: null,
                tel_interna: false
            },
            {
                men_id: 61,
                men_id_pai: 43,
                men_nome: 'Áreas de menu',
                men_url: '/areas-menu',
                tel_id: 349,
                versao: 0,
                mmu_id: 1,
                men_ordem_pai: null,
                tel_interna: false
            },
            {
                men_id: 62,
                men_id_pai: 43,
                men_nome: 'Modelos de menus',
                men_url: '/modelo-menu',
                tel_id: 348,
                versao: 0,
                mmu_id: 1,
                men_ordem_pai: null,
                tel_interna: false
            },
            {
                men_id: 289,
                men_id_pai: 43,
                men_nome: 'Menus',
                men_url: '/menus',
                tel_id: 353,
                versao: 0,
                mmu_id: 1,
                men_ordem_pai: null,
                tel_interna: false
            },
            {
                men_id: 526,
                men_id_pai: 43,
                men_nome: 'Razões de trâmite',
                men_url: '/razao',
                tel_id: 623,
                versao: 0,
                mmu_id: 1,
                men_ordem_pai: null,
                tel_interna: false
            }
        ],
        {}
    ),

    down: (queryInterface, Sequelize) => queryInterface.bulkDelete(
        { tableName: 'menu', schema: 'spa2' },
        null,
        {}
    )
};
