'use strict';

module.exports = {
    up: async(queryInterface, Sequelize) => {
        await queryInterface.bulkInsert(
            { tableName: 'tramite', schema: 'spa2' },
            [
                {
                    tra_id: 170,
                    pro_id: 113,
                    raz_id: 82,
                    login_envia: 'tarcisio.socher',
                    area_id_envia: 32,
                    area_id_recebe: 7,
                    nod_id_envia: 188,
                    nod_id_recebe: 189,
                    tra_inicial: true,
                    versao: 0,
                    tra_envio: '2020-06-15 09:59:07',
                    tra_retorno_discordancia: false
                },
                {
                    tra_id: 171,
                    pro_id: 113,
                    raz_id: 82,
                    login_envia: 'amanda.moreno',
                    area_id_envia: 7,
                    area_id_recebe: 398,
                    nod_id_envia: 189,
                    nod_id_recebe: 190,
                    tra_inicial: false,
                    versao: 0,
                    tra_envio: '2020-06-15 09:59:34',
                    tra_retorno_discordancia: false
                },
                {
                    tra_id: 172,
                    pro_id: 113,
                    raz_id: 82,
                    login_envia: 'amanda.moreno',
                    area_id_envia: 7,
                    area_id_recebe: 398,
                    nod_id_envia: 189,
                    nod_id_recebe: 190,
                    tra_inicial: false,
                    versao: 0,
                    tra_envio: '2020-06-15 09:59:34',
                    tra_retorno_discordancia: false
                }
                // {
                //     tra_id: 172,
                //     pro_id: 113,
                //     raz_id: 105,
                //     login_envia: 'waleria.oliveira',
                //     area_id_envia: 398,
                //     area_id_recebe: 98,
                //     nod_id_envia: 190,
                //     nod_id_recebe: 225,
                //     tra_inicial: false,
                //     versao: 0,
                //     tra_envio: '2020-06-15 10:00:03',
                //     tra_retorno_discordancia: false
                // }
                // {
                //     tra_id: 173,
                //     pro_id: 113,
                //     raz_id: 105,
                //     login_envia: 'edmar.colpani',
                //     area_id_envia: 98,
                //     area_id_recebe: 100,
                //     nod_id_envia: 225,
                //     nod_id_recebe: 226,
                //     tra_inicial: false,
                //     versao: 0,
                //     tra_envio: '2020-06-15 10:00:24',
                //     tra_retorno_discordancia: false
                // }
                // {
                //     tra_id: 174,
                //     pro_id: 113,
                //     raz_id: 82,
                //     login_envia: 'euler.freitas',
                //     area_id_envia: 100,
                //     area_id_recebe: 7,
                //     nod_id_envia: 226,
                //     nod_id_recebe: 227,
                //     tra_inicial: false,
                //     versao: 0,
                //     tra_envio: '2020-06-15 10:00:46',
                //     tra_retorno_discordancia: false
                // }
                //  {
                //     tra_id: 175,
                //     pro_id: 113,
                //     raz_id: 82,
                //     login_envia: 'amanda.moreno',
                //     area_id_envia: 7,
                //     area_id_recebe: 32,
                //     nod_id_envia: 227,
                //     nod_id_recebe: 228,
                //     tra_inicial: false,
                //     versao: 0,
                //     tra_envio: '2020-06-15 10:01:22',
                //     tra_retorno_discordancia: false
                // }
                // {
                //     tra_id: 176,
                //     pro_id: 114,
                //     raz_id: 82,
                //     login_envia: 'amanda.moreno',
                //     area_id_envia: 7,
                //     area_id_recebe: 168,
                //     nod_id_envia: 182,
                //     nod_id_recebe: 229,
                //     tra_inicial: true,
                //     versao: 0,
                //     tra_envio: '2020-06-15 10:02:55',
                //     tra_retorno_discordancia: false
                // }
                // {
                //     tra_id: 177,
                //     pro_id: 114,
                //     raz_id: 82,
                //     login_envia: 'aline.bogo',
                //     area_id_envia: 168,
                //     area_id_recebe: 398,
                //     nod_id_envia: 229,
                //     nod_id_recebe: 230,
                //     tra_inicial: false,
                //     versao: 0,
                //     tra_envio: '2020-06-15 10:03:27',
                //     tra_retorno_discordancia: false
                // }
                // {
                //     tra_id: 178,
                //     pro_id: 114,
                //     raz_id: 106,
                //     login_envia: 'waleria.oliveira',
                //     area_id_envia: 398,
                //     area_id_recebe: 98,
                //     nod_id_envia: 230,
                //     nod_id_recebe: 231,
                //     tra_inicial: false,
                //     versao: 0,
                //     tra_envio: '2020-06-15 10:03:53',
                //     tra_retorno_discordancia: false
                // }
                // {
                //     tra_id: 179,
                //     pro_id: 114,
                //     raz_id: 106,
                //     login_envia: 'edmar.colpani',
                //     area_id_envia: 98,
                //     area_id_recebe: 100,
                //     nod_id_envia: 231,
                //     nod_id_recebe: 232,
                //     tra_inicial: false,
                //     versao: 0,
                //     tra_envio: '2020-06-15 10:04:18',
                //     tra_retorno_discordancia: false
                // }
                // {
                //     tra_id: 180,
                //     pro_id: 114,
                //     raz_id: 82,
                //     login_envia: 'euler.freitas',
                //     area_id_envia: 100,
                //     area_id_recebe: 168,
                //     nod_id_envia: 232,
                //     nod_id_recebe: 233,
                //     tra_inicial: false,
                //     versao: 0,
                //     tra_envio: '2020-06-15 10:04:37',
                //     tra_retorno_discordancia: false
                // }
                // {
                //     tra_id: 181,
                //     pro_id: 114,
                //     raz_id: 107,
                //     login_envia: 'aline.bogo',
                //     area_id_envia: 168,
                //     area_id_recebe: 7,
                //     nod_id_envia: 233,
                //     nod_id_recebe: 234,
                //     tra_inicial: false,
                //     versao: 0,
                //     tra_envio: '2020-06-15 10:05:09',
                //     tra_retorno_discordancia: false
                // }

            ],
            {}
        );

        await queryInterface.sequelize.query('select setval(\'spa2.tramite_tra_id_seq\', coalesce(max(tra_id), 0)+1, false) from spa2.tramite;');
    },

    down: (queryInterface, Sequelize) => queryInterface.bulkDelete(
        { tableName: 'tramite', schema: 'spa2' },
        null,
        {}
    )
};
