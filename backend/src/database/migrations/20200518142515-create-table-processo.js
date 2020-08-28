'use strict';

// const functionName = 'spa2.f_data_hora_autuacao()';
// const triggerName = 'data_hora_autuacao';
// const functionName2 = 'spa2.f_numeracao_autuacao()';
// const triggerName2 = 'numeracao_autuacao';

module.exports = {
    up: async(queryInterface, Sequelize) => {
        return Promise.all([
            queryInterface.createTable('processo', {
                pro_id: {
                    type: Sequelize.INTEGER,
                    allowNull: false,
                    autoIncrement: true,
                    primaryKey: true
                },
                pro_codigo: {
                    type: Sequelize.STRING(10)
                },
                pro_nome: {
                    type: Sequelize.STRING(100)
                },
                pro_matricula: {
                    type: Sequelize.INTEGER
                },
                pro_cpf: {
                    type: Sequelize.STRING(11)
                },
                pro_cnpj: {
                    type: Sequelize.STRING
                },
                pro_fone: {
                    type: Sequelize.STRING(30)
                },
                pro_celular: {
                    type: Sequelize.STRING(30)
                },
                pro_email: {
                    type: Sequelize.STRING(100)
                },
                pro_assunto: {
                    type: Sequelize.TEXT
                },
                versao: {
                    type: Sequelize.INTEGER,
                    allowNull: false,
                    defaultValue: 0
                },
                pro_numero: {
                    type: Sequelize.INTEGER
                },
                pro_autuacao: {
                    type: Sequelize.DATE,
                    allowNull: false
                },
                usu_autuador: {
                    type: Sequelize.STRING(50),
                    allowNull: false
                },
                usu_finalizador: {
                    type: Sequelize.STRING(50)
                },
                usu_data_hora_alteracao: {
                    type: Sequelize.DATE,
                    allowNull: false
                },
                nod_id: {
                    type: Sequelize.INTEGER,
                    allowNull: false
                },
                set_id_autuador: {
                    type: Sequelize.STRING(4),
                    allowNull: false
                },
                area_id: {
                    type: Sequelize.STRING(4)
                },
                set_id_finalizador: {
                    type: Sequelize.STRING(4)
                },
                pro_iniciativa: {
                    type: Sequelize.STRING(10),
                    allowNull: false
                },
                pro_tipo_iniciativa: {
                    type: Sequelize.STRING(20),
                    allowNull: false
                },
                area_id_iniciativa: {
                    type: Sequelize.STRING(4)
                },
                tpr_id: {
                    type: Sequelize.INTEGER,
                    allowNull: false,
                    references: { model: 'tipo_processo', key: 'tpr_id' },
                    onUpdate: 'NO ACTION',
                    onDelete: 'NO ACTION'
                },
                pro_contato_pj: {
                    type: Sequelize.STRING(100)
                },
                pro_ano: {
                    type: Sequelize.INTEGER
                },
                pro_ultimo_tramite: {
                    type: Sequelize.DATE
                },
                pro_encerramento: {
                    type: Sequelize.DATE
                },
                pro_recurso: {
                    type: Sequelize.BOOLEAN,
                    allowNull: false,
                    defaultValue: false
                },
                pro_com_abono: {
                    type: Sequelize.BOOLEAN,
                    allowNull: false,
                    defaultValue: false
                },
                pro_num_com_abono: {
                    type: Sequelize.STRING(30)
                }
            },
            {
                schema: 'spa2'
            })

            // queryInterface.addConstraint('processo', {
            //     fields: ['pro_iniciativa'],
            //     type: 'check',
            //     name: 'chk_iniciativa',
            //     where: {
            //         pro_iniciativa: ['Interna', 'Externa']
            //     }
            // },
            // {
            //     schema: 'spa2'
            // }),

            // queryInterface.addConstraint('processo', {
            //     fields: ['pro_tipo_iniciativa'],
            //     type: 'check',
            //     name: 'chk_tipo_iniciativa',
            //     where: {
            //         pro_tipo_iniciativa: ['Servidor Público', 'Diretorias', 'Pessoa Física', 'Pessoa Jurídica']
            //     }
            // },
            // {
            //     schema: 'spa2'
            // })
        ]);
    },

    down: (queryInterface, Sequelize) => {
        // return Promise.all([
        //     queryInterface.sequelize.query(`DROP TRIGGER ${triggerName}`),
        //     queryInterface.sequelize.query(`DROP FUNCTION ${functionName}`),
        //     queryInterface.sequelize.query(`DROP TRIGGER ${triggerName2}`),
        //     queryInterface.sequelize.query(`DROP FUNCTION ${functionName2}`),
        //     queryInterface.dropTable('processo')
        // ]);
        return queryInterface.dropTable('processo');
    }
};
