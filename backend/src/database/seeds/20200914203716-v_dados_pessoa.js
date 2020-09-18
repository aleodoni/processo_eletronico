'use strict';

module.exports = {
    up: async(queryInterface, Sequelize) => {
        await queryInterface.bulkInsert(
            { tableName: 'v_dados_pessoa', schema: 'spa2' },
            [
                { pes_id: 2146, pes_celular: '(41) 99999999', pes_ci: '999999999/PR', pes_email: 'teste@teste.com', fone: '(41) 33333333 (41) 44444444', pes_matricula: '2146', pes_nome: 'Tarcísio Socher', pes_cpf: 89224547923 },
                { pes_id: 542, pes_celular: '(41) 99680126', pes_ci: '5.823.434-6/PR', pes_email: 'ABACH@CMC.PR.GOV.BR', fone: '(41) 33363093 (41) 30191991', pes_matricula: '2082', pes_nome: 'Adriana Bolzani Bach', pes_cpf: 67068456987 },
                { pes_id: 3865, pes_celular: '(41) 84743116', pes_ci: '6.122.068-2/PR', pes_email: 'null', fone: '(41) 33798852 (41) 96593980', pes_matricula: '2214', pes_nome: 'Adriana Da Luz Pereira', pes_cpf: 1725711974 },
                { pes_id: 541, pes_celular: '(41) 91035411', pes_ci: '4.186.105-3/PR', pes_email: 'AKOENIG@CMC.PR.GOV.BR', fone: '(41) 32530058 (41) 33524869', pes_matricula: '2119', pes_nome: 'Adriane Reali Koenig Barboza', pes_cpf: 96187654900 },
                { pes_id: 4095, pes_celular: '(41) 988663851', pes_ci: '5.710.700-6/PR', pes_email: 'null', fone: '(41) 33290036 (41) 30238604', pes_matricula: '1124', pes_nome: 'Agenor Da Silva Pereira', pes_cpf: 95974415949 },
                { pes_id: 3573, pes_celular: '(41) 92556600', pes_ci: '5.809.900-7/PR', pes_email: 'null', fone: '(41) 30771255 ', pes_matricula: '2179', pes_nome: 'Alexandre Odoni', pes_cpf: 87238594900 },
                { pes_id: 160, pes_celular: '(41) 995668315', pes_ci: '1.901.643/PR', pes_email: 'ANDRESSABONN@HOTMAIL.COM', fone: '(41) 30231066 ', pes_matricula: '4342', pes_nome: 'Andressa Regina Bonn Dos Santos', pes_cpf: 59799269920 },
                { pes_id: 3518, pes_celular: 'null', pes_ci: '8.808.673-2/PR', pes_email: 'null', fone: ' ', pes_matricula: '2182', pes_nome: 'Antonio Nei Correia Brigano', pes_cpf: 4450533992 },
                { pes_id: 3794, pes_celular: '(41) 99931278', pes_ci: '10066251/PR', pes_email: 'null', fone: '(41) 30953744 ', pes_matricula: '2246', pes_nome: 'Bruno Silva De Oliveira', pes_cpf: 1442655674 },
                { pes_id: 548, pes_celular: '(41) 88649710', pes_ci: '4.186.500-8/PR', pes_email: 'CNIEMEYER@CMC.PR.GOV.BR', fone: '(41) 30277869 ', pes_matricula: '6167', pes_nome: 'Carlos Niemeyer', pes_cpf: 63981300904 },
                { pes_id: 3766, pes_celular: '(41) 96249426', pes_ci: '7.890.001-6/PR', pes_email: 'null', fone: '(41) 30227916 ', pes_matricula: '2227', pes_nome: 'Charles Antoniacomi Taborda Paz', pes_cpf: 3506887963 },
                { pes_id: 558, pes_celular: '(41) 99670237', pes_ci: '4.851.789-7/PR', pes_email: 'CLAUDIAFANTIN@CMC.PR.GOV.BR', fone: '(41) 32560820 (41) 32575035', pes_matricula: '2120', pes_nome: 'Claudia Aparecida Fantin De Souza', pes_cpf: 1435873904 },
                { pes_id: 3767, pes_celular: '(41) 99497788', pes_ci: '4.513.585-3/PR', pes_email: 'null', fone: '(41) 32731538 ', pes_matricula: '2225', pes_nome: 'Claudio Sehnem', pes_cpf: 2010139917 },
                { pes_id: 576, pes_celular: '(41) 99350393', pes_ci: '6.060.621-8/PR', pes_email: 'null', fone: '(41) 33112212 ', pes_matricula: '2109', pes_nome: 'Ediomar Bariquelo', pes_cpf: 84095636904 },
                { pes_id: 4148, pes_celular: '(41) 988588156', pes_ci: '3.092.233-6/PR', pes_email: 'null', fone: '(41) 32736213 (41) 32407530', pes_matricula: '1130', pes_nome: 'Edmar Colpani', pes_cpf: 41146417934 },
                { pes_id: 574, pes_celular: '(41) 88495794', pes_ci: '2.222.786-6/PR', pes_email: 'ELCIO.PEREIRA@CMC.PR.GOV.BR', fone: '(41) 30772089 (41) 32593223', pes_matricula: '4397', pes_nome: 'Elcio Jose Pereira', pes_cpf: 51038579953 },
                { pes_id: 3803, pes_celular: '(41) 88176528', pes_ci: '8.782.866-2/PR', pes_email: 'ELISBIANCAAZEVEDO@GMAIL.COM', fone: '(41) 30859829 ', pes_matricula: '2235', pes_nome: 'Elis Bianca Azevedo', pes_cpf: 4300594937 },
                { pes_id: 570, pes_celular: '(41) 97971452', pes_ci: '4.700.681-3/PR', pes_email: 'MARCOZEROGRAU@HOTMAIL.COM', fone: '(41) 33792098 ', pes_matricula: '2100', pes_nome: 'Ely Marcos De Oliveira', pes_cpf: 78430429972 },
                { pes_id: 5701, pes_celular: '(41) 99766318', pes_ci: '204666818/PR', pes_email: 'null', fone: '(41) 30532085 (41) 88704398', pes_matricula: '1147', pes_nome: 'Euler De Freitas Silva Júnior', pes_cpf: 12068375869 },
                { pes_id: 563, pes_celular: '(41) 99799977', pes_ci: '5.351.577-0/PR', pes_email: 'EBECKERT@CMC.PR.GOV.BR', fone: '(41) 33693496 ', pes_matricula: '2122', pes_nome: 'Everton Luiz Beckert', pes_cpf: 91087910900 },
                { pes_id: 562, pes_celular: '(41) 91922708', pes_ci: '4.610.886-8/PR', pes_email: 'EWERTON@CMC.PR.GOV.BR', fone: '(41) 30829330 ', pes_matricula: '2129', pes_nome: 'Ewerton Cesário Peres', pes_cpf: 85580058934 },
                { pes_id: 1323, pes_celular: '(41) 99045275', pes_ci: '6.269.444-0/PR', pes_email: 'DEROSSO@CWB.TBA.COM.BR', fone: '(41) 30772614 ', pes_matricula: '2209', pes_nome: 'Fábio Derosso Teixeira', pes_cpf: 2165085926 },
                { pes_id: 3793, pes_celular: '(41) 98442333', pes_ci: '5.204.251-8/PR', pes_email: 'null', fone: '(41) 32434218 ', pes_matricula: '2245', pes_nome: 'Fernanda Faversani Macedo', pes_cpf: 3256530974 }

            ],
            {}

        );

        // await queryInterface.sequelize.query('select setval(\'spa2.manifestacao_man_id_seq\', coalesce(max(man_id), 0)+1, false) from spa2.manifestacao;');
    },

    down: (queryInterface, Sequelize) => queryInterface.bulkDelete(
        { tableName: 'v_dados_pessoa', schema: 'spa2' },
        null,
        {}
    )
};
