'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('nodo', {
      nod_id: {
        type: Sequelize.INTEGER,
        defaultValue: "nextval('spa2.nodo_nod_id_seq')",
        allowNull: false,
        autoIncrement: true,
        primaryKey: true
      },
      nod_inicio: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
        defaultValue: false,
        comment: 'Indica se é o primeiro nó deste fluxo de tramitação'
      },
      flu_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {model: 'fluxo', key: 'flu_id'},
        onUpdate: 'NO ACTION',
        onDelete: 'NO ACTION'
      },
      area_id: {
        type: Sequelize.STRING(4),
        allowNull: false,
      },
      nod_fim: {
        type: Sequelize.BOOLEAN,
        allowNull:false,
        defaultValue:false,
        comment: 'É o nodo final do fluxo do processo?'
      },
      nod_dias_prazo: {
        type: Sequelize.INTEGER,
        allowNull: false,
        defaultValue: 0,
        comment: 'Dias de prazo para o processo ficar no setor sem ter notificação'
      },
      nod_ordem: {
        type: Sequelize.INTEGER, 
        allowNull: false,
        defaultValue: 0,
        comment: 'Ordem de cadastro dos nós, necessário para não confundir ao montar o fluxo.'
      },
      nod_aval_executiva: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
        defaultValue: false,
        comment: 'Indica se neste nó só precisa de um "aval" da comissão executiva na manifestação.'
      },
      versao: {
        type: Sequelize.INTEGER,
        allowNull:false,
        defaultValue: 0,
        comment: 'Versao para lock otimista'
      },
    },
    {
      schema: 'spa2',
      comment: 'Nó do fluxo de tramitação dos tipos de processo'
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('nodo');
  }
};
