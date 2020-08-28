'use strict';

module.exports = {
    up: (queryInterface, Sequelize) => {
        return Promise.all([
            queryInterface.addConstraint('spa2.processo', {
                fields: ['pro_iniciativa'],
                type: 'check',
                name: 'chk_iniciativa',
                where: {
                    pro_iniciativa: ['Interna', 'Externa']
                }
            },
            {
                schema: 'spa2'
            }),

            queryInterface.addConstraint('spa2.processo', {
                fields: ['pro_tipo_iniciativa'],
                type: 'check',
                name: 'chk_tipo_iniciativa',
                where: {
                    pro_tipo_iniciativa: ['Servidor Público', 'Diretorias', 'Pessoa Física', 'Pessoa Jurídica']
                }
            },
            {
                schema: 'spa2'
            })
        ]);
    },

    down: (queryInterface, Sequelize) => {
        return Promise.all([
            queryInterface.removeConstraint('spa2.processo', 'chk_iniciativa'),
            queryInterface.removeConstraint('spa2.processo', 'chk_tipo_iniciativa')
        ]);
    }
};
