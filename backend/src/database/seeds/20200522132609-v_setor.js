'use strict';

const table = 'v_setor';

module.exports = {
    up: (queryInterface, Sequelize) => queryInterface.bulkInsert(
        { tableName: table, schema: 'spa2' },
        [
            {
                set_nome: 'Gabinete Da Presidência',
                set_sigla: 'GP',
                set_inativacao: '2999-12-31',
                set_id: 88,
                set_id_superior: null,
                set_ativo: true,
                set_tipo: 'G'
            },
            {
                set_nome: 'Diretoria Geral',
                set_sigla: 'DG',
                set_inativacao: '2999-12-31',
                set_id: 1,
                set_id_superior: 88,
                set_ativo: true,
                set_tipo: 'N'
            },
            {
                set_nome: 'Departamento De Administração E Finanças',
                set_sigla: 'DAF',
                set_inativacao: '2999-12-31',
                set_id: 4,
                set_id_superior: 1,
                set_ativo: true,
                set_tipo: 'N'
            },
            {
                set_nome: 'Diretoria De Administração E Recursos Humanos',
                set_sigla: 'DARH',
                set_inativacao: '2999-12-31',
                set_id: 7,
                set_id_superior: 4,
                set_ativo: true,
                set_tipo: 'N'
            },
            {
                set_nome: 'Setor De Recursos Humanos',
                set_sigla: 'SRH',
                set_inativacao: '2999-12-31',
                set_id: 487,
                set_id_superior: 7,
                set_ativo: true,
                set_tipo: 'N'
            },
            {
                set_nome: 'Divisão De Cadastro Funcional',
                set_sigla: 'DCF-1',
                set_inativacao: '2999-12-31',
                set_id: 11,
                set_id_superior: 487,
                set_ativo: true,
                set_tipo: 'N'
            },
            {
                set_nome: 'Divisão De Protocolo E Expediente Administrativo',
                set_sigla: 'DPEA',
                set_inativacao: '2999-12-31',
                set_id: 446,
                set_id_superior: 487,
                set_ativo: true,
                set_tipo: 'N'
            },
            {
                set_nome: 'Setor De Gestão De Pessoas',
                set_sigla: null,
                set_inativacao: '2999-12-31',
                set_id: 489,
                set_id_superior: 7,
                set_ativo: true,
                set_tipo: 'N'
            },
            {
                set_nome: 'Divisão De Saúde Ocupacional',
                set_sigla: null,
                set_inativacao: '2999-12-31',
                set_id: 486,
                set_id_superior: 489,
                set_ativo: true,
                set_tipo: 'N'
            },
            {
                set_nome: 'Setor De Folha De Pagamento',
                set_sigla: 'SFP',
                set_inativacao: '2999-12-31',
                set_id: 292,
                set_id_superior: 7,
                set_ativo: true,
                set_tipo: 'N'
            },
            {
                set_nome: 'Divisão De Controle De Informação Funcional',
                set_sigla: 'DCIF',
                set_inativacao: '2999-12-31',
                set_id: 291,
                set_id_superior: 292,
                set_ativo: true,
                set_tipo: 'N'
            },
            {
                set_nome: 'Diretoria De Informática',
                set_sigla: 'DIF',
                set_inativacao: '2999-12-31',
                set_id: 27,
                set_id_superior: 4,
                set_ativo: true,
                set_tipo: 'N'
            },
            {
                set_nome: 'Divisão De Desenvolvimento De Sistemas',
                set_sigla: 'DDS-1',
                set_inativacao: '2999-12-31',
                set_id: 171,
                set_id_superior: 14,
                set_ativo: true,
                set_tipo: 'N'
            },
            {
                set_nome: 'Divisão De Suporte Em Informática',
                set_sigla: 'DSI-2',
                set_inativacao: '2999-12-31',
                set_id: 172,
                set_id_superior: 14,
                set_ativo: true,
                set_tipo: 'N'
            },
            {
                set_nome: 'Diretoria Do Patrimônio E Serviços Auxiliares',
                set_sigla: 'DPSA',
                set_inativacao: '2999-12-31',
                set_id: 32,
                set_id_superior: 4,
                set_ativo: true,
                set_tipo: 'N'
            },
            {
                set_nome: 'Setor De Patrimônio',
                set_sigla: 'SPA',
                set_inativacao: '2999-12-31',
                set_id: 36,
                set_id_superior: 32,
                set_ativo: true,
                set_tipo: 'N'
            },
            {
                set_nome: 'Divisão De Instalações',
                set_sigla: 'DI-2',
                set_inativacao: '2999-12-31',
                set_id: 38,
                set_id_superior: 36,
                set_ativo: true,
                set_tipo: 'N'
            },
            {
                set_nome: 'Divisão De Material De Consumo',
                set_sigla: 'DMC-4',
                set_inativacao: '2999-12-31',
                set_id: 42,
                set_id_superior: 36,
                set_ativo: true,
                set_tipo: 'N'
            },
            {
                set_nome: 'Seção De Cadastro Patrimonial',
                set_sigla: 'SCP',
                set_inativacao: '2999-12-31',
                set_id: 301,
                set_id_superior: 42,
                set_ativo: true,
                set_tipo: 'N'
            },
            {
                set_nome: 'Setor De Serviços Gerais',
                set_sigla: 'SSG',
                set_inativacao: '2999-12-31',
                set_id: 366,
                set_id_superior: 32,
                set_ativo: true,
                set_tipo: 'N'
            },
            {
                set_nome: 'Divisão De Serviços Gerais',
                set_sigla: null,
                set_inativacao: '2999-12-31',
                set_id: 23,
                set_id_superior: 366,
                set_ativo: true,
                set_tipo: 'N'
            },
            {
                set_nome: 'Seção De Transporte',
                set_sigla: 'STRA',
                set_inativacao: '2999-12-31',
                set_id: 329,
                set_id_superior: 23,
                set_ativo: true,
                set_tipo: 'N'
            },
            {
                set_nome: 'Seção De Telefonia',
                set_sigla: 'STEL',
                set_inativacao: '2999-12-31',
                set_id: 330,
                set_id_superior: 23,
                set_ativo: true,
                set_tipo: 'N'
            },
            {
                set_nome: 'Diretoria Contábil-Financeira',
                set_sigla: 'DCF',
                set_inativacao: '2999-12-31',
                set_id: 168,
                set_id_superior: 4,
                set_ativo: true,
                set_tipo: 'N'
            },
            {
                set_nome: 'Setor De Contabilidade E Orçamento',
                set_sigla: 'SCO',
                set_inativacao: '2999-12-31',
                set_id: 169,
                set_id_superior: 168,
                set_ativo: true,
                set_tipo: 'N'
            },
            {
                set_nome: 'Divisão De Escrituração Contábil',
                set_sigla: 'DEC',
                set_inativacao: '2999-12-31',
                set_id: 19,
                set_id_superior: 169,
                set_ativo: true,
                set_tipo: 'N'
            },
            {
                set_nome: 'Divisão De Contas A Pagar',
                set_sigla: 'DCP-2',
                set_inativacao: '2999-12-31',
                set_id: 26,
                set_id_superior: 169,
                set_ativo: true,
                set_tipo: 'N'
            },
            {
                set_nome: 'Diretoria De Licitações',
                set_sigla: 'DLICIT',
                set_inativacao: '2999-12-31',
                set_id: 365,
                set_id_superior: 4,
                set_ativo: true,
                set_tipo: 'N'
            },
            {
                set_nome: 'Setor De Contratos E Convênios',
                set_sigla: 'SCC',
                set_inativacao: '2999-12-31',
                set_id: 370,
                set_id_superior: 365,
                set_ativo: true,
                set_tipo: 'N'
            },
            {
                set_nome: 'Divisão De Compras',
                set_sigla: 'DC-1',
                set_inativacao: '2999-12-31',
                set_id: 35,
                set_id_superior: 370,
                set_ativo: true,
                set_tipo: 'N'
            },
            {
                set_nome: 'Assessoria De Projetos E Gestão',
                set_sigla: null,
                set_inativacao: '2999-12-31',
                set_id: 550,
                set_id_superior: 1,
                set_ativo: true,
                set_tipo: 'N'
            },
            {
                set_nome: 'Departamento De Plenário E Processo Legislativo',
                set_sigla: 'DEPROLE',
                set_inativacao: '2999-12-31',
                set_id: 288,
                set_id_superior: 1,
                set_ativo: true,
                set_tipo: 'N'
            },
            {
                set_nome: 'Diretoria De Apoio Procedimental',
                set_sigla: 'DAP',
                set_inativacao: '2999-12-31',
                set_id: 48,
                set_id_superior: 288,
                set_ativo: true,
                set_tipo: 'N'
            },
            {
                set_nome: 'Divisão De Biblioteca E Referência Legislativa',
                set_sigla: 'DBIL-4',
                set_inativacao: '2999-12-31',
                set_id: 173,
                set_id_superior: 800,
                set_ativo: true,
                set_tipo: 'N'
            },
            {
                set_nome: 'Seção De Arquivo E Documentação Histórica',
                set_sigla: 'SADH',
                set_inativacao: '2999-12-31',
                set_id: 293,
                set_id_superior: 173,
                set_ativo: true,
                set_tipo: 'N'
            },
            {
                set_nome: 'Divisão De Controle De Tramitação',
                set_sigla: 'DCTRA',
                set_inativacao: '2999-12-31',
                set_id: 174,
                set_id_superior: 800,
                set_ativo: true,
                set_tipo: 'N'
            },
            {
                set_nome: 'Seção De Expedição',
                set_sigla: 'SEXP',
                set_inativacao: '2999-12-31',
                set_id: 294,
                set_id_superior: 174,
                set_ativo: true,
                set_tipo: 'N'
            },
            {
                set_nome: 'Divisão Do Diário Da Câmara',
                set_sigla: 'DDC-1',
                set_inativacao: '2999-12-31',
                set_id: 176,
                set_id_superior: 800,
                set_ativo: true,
                set_tipo: 'N'
            },
            {
                set_nome: 'Divisão De Protocolo Legislativo',
                set_sigla: 'DPL',
                set_inativacao: '2999-12-31',
                set_id: 447,
                set_id_superior: 800,
                set_ativo: true,
                set_tipo: 'N'
            },
            {
                set_nome: 'Seção De Informação Ao Cidadão',
                set_sigla: 'SIC',
                set_inativacao: '2999-12-31',
                set_id: 404,
                set_id_superior: 447,
                set_ativo: true,
                set_tipo: 'N'
            },
            {
                set_nome: 'Seção De Controle De Correspondência Oficial',
                set_sigla: 'SCCO',
                set_inativacao: '2999-12-31',
                set_id: 429,
                set_id_superior: 447,
                set_ativo: true,
                set_tipo: 'N'
            },
            {
                set_nome: 'Diretoria De Apoio Às Comissões',
                set_sigla: 'DAC',
                set_inativacao: '2999-12-31',
                set_id: 149,
                set_id_superior: 288,
                set_ativo: true,
                set_tipo: 'N'
            },
            {
                set_nome: 'Divisão De Comissões Temporárias E Conselho De Ética E Decoro Parlamentar',
                set_sigla: 'DCT',
                set_inativacao: '2999-12-31',
                set_id: 333,
                set_id_superior: 46,
                set_ativo: true,
                set_tipo: 'N'
            },
            {
                set_nome: 'Seção De Assessoramento Técnico Às Comissões Temporárias E Conselho De Ética E Decoro Parlamentar',
                set_sigla: 'SATCT',
                set_inativacao: '2999-12-31',
                set_id: 442,
                set_id_superior: 333,
                set_ativo: true,
                set_tipo: 'N'
            },
            {
                set_nome: 'Div. De Com. Perm. De Direitos Humanos, Def. Cidadania E Seg. Pública, De Ser. Público, De Urb., Obras Públicas E Meio Ambiente E Particip. Legislativ',
                set_sigla: 'DCP-DH',
                set_inativacao: '2999-12-31',
                set_id: 49,
                set_id_superior: 46,
                set_ativo: true,
                set_tipo: 'N'
            },
            {
                set_nome: 'Seção De Tramitação Processual',
                set_sigla: 'STP',
                set_inativacao: '2999-12-31',
                set_id: 335,
                set_id_superior: 49,
                set_ativo: true,
                set_tipo: 'N'
            },
            {
                set_nome: 'Div. De Com. Permanentes De Econ., Finanças E Fisc. E De Saúde E Bem Estar Social',
                set_sigla: 'DCP-FIN',
                set_inativacao: '2999-12-31',
                set_id: 336,
                set_id_superior: 46,
                set_ativo: true,
                set_tipo: 'N'
            },
            {
                set_nome: 'Seção De Apoio Técnico Assessoria De Fiscalização E Controle',
                set_sigla: 'SAPT-FC',
                set_inativacao: '2999-12-31',
                set_id: 428,
                set_id_superior: 336,
                set_ativo: true,
                set_tipo: 'N'
            },
            {
                set_nome: 'Assessoria De Fiscalização E Controle À Comissão Permanente De Economia, Finanças E Fiscalização',
                set_sigla: 'ASS-FC',
                set_inativacao: '2999-12-31',
                set_id: 439,
                set_id_superior: 336,
                set_ativo: true,
                set_tipo: 'N'
            },
            {
                set_nome: 'Divisão De Com. Perm. De Constituição E Justiça E De Educação, Cultura E Turismo',
                set_sigla: 'DCP-LEG',
                set_inativacao: '2999-12-31',
                set_id: 338,
                set_id_superior: 46,
                set_ativo: true,
                set_tipo: 'N'
            },
            {
                set_nome: 'Seção De Registro',
                set_sigla: 'SREG',
                set_inativacao: '2999-12-31',
                set_id: 449,
                set_id_superior: 338,
                set_ativo: true,
                set_tipo: 'N'
            },
            {
                set_nome: 'Assessoria De Controle Permanente Constituição E Justiça',
                set_sigla: null,
                set_inativacao: '2999-12-31',
                set_id: 488,
                set_id_superior: 338,
                set_ativo: true,
                set_tipo: 'N'
            },
            {
                set_nome: 'Diretoria Da Assessoria Técnica Ao Plenário',
                set_sigla: 'DATPLE',
                set_inativacao: '2999-12-31',
                set_id: 448,
                set_id_superior: 288,
                set_ativo: true,
                set_tipo: 'N'
            },
            {
                set_nome: 'Setor Datp',
                set_sigla: null,
                set_inativacao: '2999-12-31',
                set_id: 58,
                set_id_superior: 448,
                set_ativo: true,
                set_tipo: 'N'
            },
            {
                set_nome: 'Divisão De Taquigrafia',
                set_sigla: 'DTQ-3',
                set_inativacao: '2999-12-31',
                set_id: 177,
                set_id_superior: 58,
                set_ativo: true,
                set_tipo: 'N'
            },
            {
                set_nome: 'Divisão De Redação',
                set_sigla: 'DRE-1',
                set_inativacao: '2999-12-31',
                set_id: 178,
                set_id_superior: 58,
                set_ativo: true,
                set_tipo: 'N'
            },
            {
                set_nome: 'Seção De Anais',
                set_sigla: 'SANA',
                set_inativacao: '2999-12-31',
                set_id: 295,
                set_id_superior: 178,
                set_ativo: true,
                set_tipo: 'N'
            },
            {
                set_nome: 'Divisão De Controle E Operação Audiovisual',
                set_sigla: null,
                set_inativacao: '2999-12-31',
                set_id: 490,
                set_id_superior: 58,
                set_ativo: true,
                set_tipo: 'N'
            },
            {
                set_nome: 'Divisão De Assistência Ao Plenário',
                set_sigla: 'DAPLE',
                set_inativacao: '2999-12-31',
                set_id: 339,
                set_id_superior: 58,
                set_ativo: true,
                set_tipo: 'N'
            },
            {
                set_nome: 'Seção De Apoio Ao Plenário',
                set_sigla: 'SAPLE',
                set_inativacao: '2999-12-31',
                set_id: 340,
                set_id_superior: 339,
                set_ativo: true,
                set_tipo: 'N'
            },
            {
                set_nome: 'Diretoria De Comunicação Social',
                set_sigla: null,
                set_inativacao: '2999-12-31',
                set_id: 65,
                set_id_superior: 88,
                set_ativo: true,
                set_tipo: 'N'
            },
            {
                set_nome: 'Procuradoria Jurídica',
                set_sigla: 'PROJURIS',
                set_inativacao: '2999-12-31',
                set_id: 289,
                set_id_superior: 88,
                set_ativo: true,
                set_tipo: 'N'
            },
            {
                set_nome: 'Diretoria Da Assessoria Jurídica Ao Processo Legislativo',
                set_sigla: 'DAJPL',
                set_inativacao: '2999-12-31',
                set_id: 299,
                set_id_superior: 289,
                set_ativo: true,
                set_tipo: 'N'
            },
            {
                set_nome: 'Diretoria Da Assessoria Jurídica À Administração',
                set_sigla: 'DAJAD',
                set_inativacao: '2999-12-31',
                set_id: 319,
                set_id_superior: 289,
                set_ativo: true,
                set_tipo: 'N'
            },
            {
                set_nome: 'Diretoria De Cerimonial',
                set_sigla: 'DC',
                set_inativacao: '2999-12-31',
                set_id: 382,
                set_id_superior: 88,
                set_ativo: true,
                set_tipo: 'N'
            },
            {
                set_nome: 'Seção De Relações Públicas',
                set_sigla: 'SRP',
                set_inativacao: '2999-12-31',
                set_id: 433,
                set_id_superior: 382,
                set_ativo: true,
                set_tipo: 'N'
            },
            {
                set_nome: 'Seção De Relações Institucionais',
                set_sigla: 'SRI',
                set_inativacao: '2999-12-31',
                set_id: 434,
                set_id_superior: 382,
                set_ativo: true,
                set_tipo: 'N'
            },
            {
                set_nome: 'Diretoria De Segurança',
                set_sigla: 'DS',
                set_inativacao: '2999-12-31',
                set_id: 383,
                set_id_superior: 88,
                set_ativo: true,
                set_tipo: 'N'
            },
            {
                set_nome: 'Sem Lotação',
                set_sigla: null,
                set_inativacao: '2999-12-31',
                set_id: 146,
                set_id_superior: 88,
                set_ativo: true,
                set_tipo: 'F'
            },
            {
                set_nome: 'À Disposição',
                set_sigla: null,
                set_inativacao: '2999-12-31',
                set_id: 153,
                set_id_superior: 88,
                set_ativo: true,
                set_tipo: 'F'
            },
            {
                set_nome: 'Ouvidoria Do Município De Curitiba',
                set_sigla: 'OUV',
                set_inativacao: '2999-12-31',
                set_id: 457,
                set_id_superior: 88,
                set_ativo: true,
                set_tipo: 'N'
            },
            {
                set_nome: 'Escola Do Legislativo',
                set_sigla: 'ESCLEG',
                set_inativacao: '2999-12-31',
                set_id: 459,
                set_id_superior: 88,
                set_ativo: true,
                set_tipo: 'N'
            },
            {
                set_nome: 'Controladoria Do Legislativo',
                set_sigla: 'CONLEGIS',
                set_inativacao: '2999-12-31',
                set_id: 287,
                set_id_superior: 88,
                set_ativo: true,
                set_tipo: 'N'
            },
            {
                set_nome: 'Divisão De Controle Interno',
                set_sigla: 'DCI',
                set_inativacao: '2999-12-31',
                set_id: 170,
                set_id_superior: 287,
                set_ativo: true,
                set_tipo: 'N'
            },
            {
                set_nome: 'Assessoria Técnica Da Controladoria Do Legislativo',
                set_sigla: 'ATCL',
                set_inativacao: '2999-12-31',
                set_id: 390,
                set_id_superior: 287,
                set_ativo: true,
                set_tipo: 'N'
            },
            {
                set_nome: 'Corregedoria',
                set_sigla: 'CORR',
                set_inativacao: '2999-12-31',
                set_id: 385,
                set_id_superior: 88,
                set_ativo: true,
                set_tipo: 'N'
            },
            {
                set_nome: 'Assessoria Do Corregedor',
                set_sigla: 'ASSCOR',
                set_inativacao: '2999-12-31',
                set_id: 387,
                set_id_superior: 88,
                set_ativo: true,
                set_tipo: 'N'
            },
            {
                set_nome: 'Gabinete Da 1a Vice-Presidência',
                set_sigla: 'G1V',
                set_inativacao: '2999-12-31',
                set_id: 94,
                set_id_superior: 88,
                set_ativo: true,
                set_tipo: 'G'
            },
            {
                set_nome: 'Gabinete Da 2a Vice-Presidência',
                set_sigla: 'G2V',
                set_inativacao: '2999-12-31',
                set_id: 96,
                set_id_superior: 88,
                set_ativo: true,
                set_tipo: 'G'
            },
            {
                set_nome: 'Gabinete Da 1a Secretaria',
                set_sigla: 'G1S',
                set_inativacao: '2999-12-31',
                set_id: 98,
                set_id_superior: 88,
                set_ativo: true,
                set_tipo: 'G'
            },
            {
                set_nome: 'Gabinete Da 2a Secretaria',
                set_sigla: 'G2S',
                set_inativacao: '2999-12-31',
                set_id: 100,
                set_id_superior: 88,
                set_ativo: true,
                set_tipo: 'G'
            },
            {
                set_nome: 'Gabinete Da 3a Secretaria',
                set_sigla: null,
                set_inativacao: '2999-12-31',
                set_id: 102,
                set_id_superior: 88,
                set_ativo: true,
                set_tipo: 'G'
            },
            {
                set_nome: 'Gabinete Da 4a Secretaria',
                set_sigla: null,
                set_inativacao: '2999-12-31',
                set_id: 104,
                set_id_superior: 88,
                set_ativo: true,
                set_tipo: 'G'
            },
            {
                set_nome: 'Gab. Ver Alex Desone De Lara Vaz (Alex Rato)',
                set_sigla: null,
                set_inativacao: '2999-12-31',
                set_id: 482,
                set_id_superior: 88,
                set_ativo: true,
                set_tipo: 'G'
            },
            {
                set_nome: 'Gab. Ver. Rubens Yoshisada Matsuda (Professor Matsuda)',
                set_sigla: null,
                set_inativacao: '2999-12-31',
                set_id: 483,
                set_id_superior: 88,
                set_ativo: true,
                set_tipo: 'G'
            },
            {
                set_nome: 'Gab. Ver. Adilson Alves Leandro (Mestre Pop)',
                set_sigla: null,
                set_inativacao: '2999-12-31',
                set_id: 421,
                set_id_superior: 88,
                set_ativo: true,
                set_tipo: 'G'
            },
            {
                set_nome: 'Gab. Ver. Agenor Da Silva Pereira (Cacá Pereira)',
                set_sigla: null,
                set_inativacao: '2999-12-31',
                set_id: 407,
                set_id_superior: 88,
                set_ativo: true,
                set_tipo: 'G'
            },
            {
                set_nome: 'Gab. Ver. Antônio Carlos Do Carmo (Toninho Da Farmácia)',
                set_sigla: null,
                set_inativacao: '2999-12-31',
                set_id: 408,
                set_id_superior: 88,
                set_ativo: true,
                set_tipo: 'G'
            },
            {
                set_nome: 'Gab. Ver. Bruno Eduardo Fischer Pessuti (Bruno Pessuti)',
                set_sigla: null,
                set_inativacao: '2999-12-31',
                set_id: 410,
                set_id_superior: 88,
                set_ativo: true,
                set_tipo: 'G'
            },
            {
                set_nome: 'Gab. Ver. Carlos Mauro Bobato (Mauro Bobato)',
                set_sigla: null,
                set_inativacao: '2999-12-31',
                set_id: 465,
                set_id_superior: 88,
                set_ativo: true,
                set_tipo: 'G'
            },
            {
                set_nome: 'Gab. Ver. Cristiano Pereira Dos Santos (Cristiano Santos)',
                set_sigla: null,
                set_inativacao: '2999-12-31',
                set_id: 422,
                set_id_superior: 88,
                set_ativo: true,
                set_tipo: 'G'
            },
            {
                set_nome: 'Gab. Ver. Dalton José Borba',
                set_sigla: null,
                set_inativacao: '2999-12-31',
                set_id: 551,
                set_id_superior: 88,
                set_ativo: true,
                set_tipo: 'G'
            },
            {
                set_nome: 'Gab. Ver. Edmar Colpani (Colpani)',
                set_sigla: null,
                set_inativacao: '2999-12-31',
                set_id: 413,
                set_id_superior: 88,
                set_ativo: true,
                set_tipo: 'G'
            },
            {
                set_nome: 'Gab. Ver. Edson Pereira Rodrigues (Edson Do Parolin)',
                set_sigla: null,
                set_inativacao: '2999-12-31',
                set_id: 402,
                set_id_superior: 88,
                set_ativo: true,
                set_tipo: 'G'
            },
            {
                set_nome: 'Gab. Ver. Euler De Freitas Silva Junior (Professor Euler)',
                set_sigla: null,
                set_inativacao: '2999-12-31',
                set_id: 474,
                set_id_superior: 88,
                set_ativo: true,
                set_tipo: 'G'
            },
            {
                set_nome: 'Gab. Ver. Ezequias Barros (Ezequias Barros)',
                set_sigla: null,
                set_inativacao: '2999-12-31',
                set_id: 472,
                set_id_superior: 88,
                set_ativo: true,
                set_tipo: 'G'
            },
            {
                set_nome: 'Gab. Ver.Fabiane Delisie Cabral Da Rosa (Fabiane Rosa)',
                set_sigla: null,
                set_inativacao: '2999-12-31',
                set_id: 464,
                set_id_superior: 88,
                set_ativo: true,
                set_tipo: 'G'
            },
            {
                set_nome: 'Gab. Ver. Geovane Alves Fernandes (Geovane Fernandes)',
                set_sigla: null,
                set_inativacao: '2999-12-31',
                set_id: 414,
                set_id_superior: 88,
                set_ativo: true,
                set_tipo: 'G'
            },
            {
                set_nome: 'Gab. Ver. Gilberto Pires Dos Santos (Beto Moraes)',
                set_sigla: null,
                set_inativacao: '2999-12-31',
                set_id: 219,
                set_id_superior: 88,
                set_ativo: true,
                set_tipo: 'G'
            },
            {
                set_nome: 'Gab. Ver. Helio Renato Wirbiski',
                set_sigla: null,
                set_inativacao: '2999-12-31',
                set_id: 415,
                set_id_superior: 88,
                set_ativo: true,
                set_tipo: 'G'
            },
            {
                set_nome: 'Gab. Ver. Herivelto Alves De Oliveira',
                set_sigla: null,
                set_inativacao: '2999-12-31',
                set_id: 480,
                set_id_superior: 88,
                set_ativo: true,
                set_tipo: 'G'
            },
            {
                set_nome: 'Gab. Ver. Jairo Marcelino Da Silva (Jairo Marcelino)',
                set_sigla: null,
                set_inativacao: '2999-12-31',
                set_id: 122,
                set_id_superior: 88,
                set_ativo: true,
                set_tipo: 'G'
            },
            {
                set_nome: 'Gab. Ver. Jonny Magalhães Stica (Jhonny Stica)',
                set_sigla: null,
                set_inativacao: '2999-12-31',
                set_id: 353,
                set_id_superior: 88,
                set_ativo: true,
                set_tipo: 'G'
            },
            {
                set_nome: 'Gab. Ver. Jorge Gomes De Oliveira Brand (Goura)',
                set_sigla: null,
                set_inativacao: '2999-12-31',
                set_id: 475,
                set_id_superior: 88,
                set_ativo: true,
                set_tipo: 'G'
            },
            {
                set_nome: 'Gab. Ver. José Ortiz Lins (Zezinho Do Sabara)',
                set_sigla: null,
                set_inativacao: '2999-12-31',
                set_id: 380,
                set_id_superior: 88,
                set_ativo: true,
                set_tipo: 'G'
            },
            {
                set_nome: 'Gab. Ver. Josete Dubiaski Da Silva (Professora Josete)',
                set_sigla: null,
                set_inativacao: '2999-12-31',
                set_id: 209,
                set_id_superior: 88,
                set_ativo: true,
                set_tipo: 'G'
            },
            {
                set_nome: 'Gab. Ver. Julieta Maria Cortes Fialho Dos Reis (Julieta Reis)',
                set_sigla: null,
                set_inativacao: '2999-12-31',
                set_id: 131,
                set_id_superior: 88,
                set_ativo: true,
                set_tipo: 'G'
            },
            {
                set_nome: 'Gab. Ver. Leônidas Edson Kuzma (Tico Kuzma)',
                set_sigla: null,
                set_inativacao: '2999-12-31',
                set_id: 208,
                set_id_superior: 88,
                set_ativo: true,
                set_tipo: 'G'
            },
            {
                set_nome: 'Gab. Ver. Luiz Felipe Braga Cortes  (Felipe Braga Cortes)',
                set_sigla: null,
                set_inativacao: '2999-12-31',
                set_id: 192,
                set_id_superior: 88,
                set_ativo: true,
                set_tipo: 'G'
            },
            {
                set_nome: 'Gab. Ver. Marcos Antonio Vieira',
                set_sigla: null,
                set_inativacao: '2999-12-31',
                set_id: 469,
                set_id_superior: 88,
                set_ativo: true,
                set_tipo: 'G'
            },
            {
                set_nome: 'Gab. Ver. Maria De Lourdes Beserra De Souza',
                set_sigla: null,
                set_inativacao: '2999-12-31',
                set_id: 217,
                set_id_superior: 88,
                set_ativo: true,
                set_tipo: 'G'
            },
            {
                set_nome: 'Gab. Ver. Maria Letícia Fagundes',
                set_sigla: null,
                set_inativacao: '2999-12-31',
                set_id: 467,
                set_id_superior: 88,
                set_ativo: true,
                set_tipo: 'G'
            },
            {
                set_nome: 'Gab. Ver. Mauro José Ignácio (Mauro Ignácio)',
                set_sigla: null,
                set_inativacao: '2999-12-31',
                set_id: 416,
                set_id_superior: 88,
                set_ativo: true,
                set_tipo: 'G'
            },
            {
                set_nome: 'Gab. Ver. Noemia De Souza E Silva Alves Rocha (Noemia Rocha)',
                set_sigla: null,
                set_inativacao: '2999-12-31',
                set_id: 358,
                set_id_superior: 88,
                set_ativo: true,
                set_tipo: 'G'
            },
            {
                set_nome: 'Gab. Ver. Oscalino De Melo (Oscalino Do Povo)',
                set_sigla: null,
                set_inativacao: '2999-12-31',
                set_id: 477,
                set_id_superior: 88,
                set_ativo: true,
                set_tipo: 'G'
            },
            {
                set_nome: 'Gab. Ver. Osias Moraes De Souza',
                set_sigla: null,
                set_inativacao: '2999-12-31',
                set_id: 463,
                set_id_superior: 88,
                set_ativo: true,
                set_tipo: 'G'
            },
            {
                set_nome: 'Gab. Ver. Paulo Roberto Rink (Paulo Rink)',
                set_sigla: null,
                set_inativacao: '2999-12-31',
                set_id: 417,
                set_id_superior: 88,
                set_ativo: true,
                set_tipo: 'G'
            },
            {
                set_nome: 'Gab. Ver. Pierpaolo Petruzzielo (Pier)',
                set_sigla: null,
                set_inativacao: '2999-12-31',
                set_id: 424,
                set_id_superior: 88,
                set_ativo: true,
                set_tipo: 'G'
            },
            {
                set_nome: 'Gab. Ver. Rogério Campos (Rogério Campos)',
                set_sigla: null,
                set_inativacao: '2999-12-31',
                set_id: 419,
                set_id_superior: 88,
                set_ativo: true,
                set_tipo: 'G'
            },
            {
                set_nome: 'Gab. Ver. Sabino Picolo (Sabino Picolo)',
                set_sigla: null,
                set_inativacao: '2999-12-31',
                set_id: 141,
                set_id_superior: 88,
                set_ativo: true,
                set_tipo: 'G'
            },
            {
                set_nome: 'Gab. Ver. Sérgio Renato Bueno Balaguer (Serginho Do Posto)',
                set_sigla: null,
                set_inativacao: '2999-12-31',
                set_id: 216,
                set_id_superior: 88,
                set_ativo: true,
                set_tipo: 'G'
            },
            {
                set_nome: 'Gab. Ver. Silberto Cardoso (Professor Silberto)',
                set_sigla: null,
                set_inativacao: '2999-12-31',
                set_id: 466,
                set_id_superior: 88,
                set_ativo: true,
                set_tipo: 'G'
            },
            {
                set_nome: 'Gab. Ver. Thiago Kronit Ferro (Thiago Ferro)',
                set_sigla: null,
                set_inativacao: '2999-12-31',
                set_id: 476,
                set_id_superior: 88,
                set_ativo: true,
                set_tipo: 'G'
            },
            {
                set_nome: 'Gab. Ver. Tito Zeglin',
                set_sigla: null,
                set_inativacao: '2999-12-31',
                set_id: 143,
                set_id_superior: 88,
                set_ativo: true,
                set_tipo: 'G'
            },
            {
                set_nome: 'Gab. Ver. Wolmir Cardoso De Aguiar (Dr. Wolmir)',
                set_sigla: null,
                set_inativacao: '2999-12-31',
                set_id: 468,
                set_id_superior: 88,
                set_ativo: true,
                set_tipo: 'G'
            },
            {
                set_nome: 'Gab. Ver. Katia Dittrich',
                set_sigla: null,
                set_inativacao: '2999-12-31',
                set_id: 470,
                set_id_superior: 88,
                set_ativo: true,
                set_tipo: 'G'
            },
            {
                set_nome: 'Gab. Ver. Maria Francisquini (Maria Manfron)',
                set_sigla: null,
                set_inativacao: '2999-12-31',
                set_id: 471,
                set_id_superior: 88,
                set_ativo: true,
                set_tipo: 'G'
            },
            {
                set_nome: 'Bloco Parlamentar Formado Pelos Partidos Ptb/Pode',
                set_sigla: null,
                set_inativacao: '2999-12-31',
                set_id: 444,
                set_id_superior: 88,
                set_ativo: true,
                set_tipo: 'G'
            },
            {
                set_nome: 'Bloco Parlamentar Formado Pelos Partidos Pv/Dc',
                set_sigla: null,
                set_inativacao: '2999-12-31',
                set_id: 481,
                set_id_superior: 88,
                set_ativo: true,
                set_tipo: 'G'
            },
            {
                set_nome: 'Bloco Parlamentar Patriota/Solidariedade',
                set_sigla: null,
                set_inativacao: '2999-12-31',
                set_id: 1764,
                set_id_superior: 88,
                set_ativo: true,
                set_tipo: 'G'
            },
            {
                set_nome: 'Bloco Parlamentar Pros/Republicanos',
                set_sigla: null,
                set_inativacao: '2999-12-31',
                set_id: 1765,
                set_id_superior: 88,
                set_ativo: true,
                set_tipo: 'G'
            },
            {
                set_nome: 'Bloco Parlamentar Pt/Mdb',
                set_sigla: null,
                set_inativacao: '2999-12-31',
                set_id: 1766,
                set_id_superior: 88,
                set_ativo: true,
                set_tipo: 'G'
            },
            {
                set_nome: 'Bloco Parlamentar Psb/Pp/Pl/Dem/Psdb',
                set_sigla: null,
                set_inativacao: '2999-12-31',
                set_id: 1767,
                set_id_superior: 88,
                set_ativo: true,
                set_tipo: 'G'
            },
            {
                set_nome: 'Gab. Liderança Da Oposição',
                set_sigla: 'LBPOP',
                set_inativacao: '2999-12-31',
                set_id: 399,
                set_id_superior: 88,
                set_ativo: true,
                set_tipo: 'G'
            },
            {
                set_nome: 'Gab. Liderança Do Dc',
                set_sigla: 'DC',
                set_inativacao: '2999-12-31',
                set_id: 406,
                set_id_superior: 88,
                set_ativo: true,
                set_tipo: 'G'
            },
            {
                set_nome: 'Gab. Liderança Do Governo',
                set_sigla: null,
                set_inativacao: '2999-12-31',
                set_id: 396,
                set_id_superior: 88,
                set_ativo: true,
                set_tipo: 'G'
            },
            {
                set_nome: 'Gab. Liderança Do Mdb',
                set_sigla: null,
                set_inativacao: '2999-12-31',
                set_id: 202,
                set_id_superior: 88,
                set_ativo: true,
                set_tipo: 'G'
            },
            {
                set_nome: 'Gab. Liderança Do Pc Do B',
                set_sigla: null,
                set_inativacao: '2999-12-31',
                set_id: 221,
                set_id_superior: 88,
                set_ativo: true,
                set_tipo: 'G'
            },
            {
                set_nome: 'Gab. Liderança Do Pdt',
                set_sigla: null,
                set_inativacao: '2999-12-31',
                set_id: 206,
                set_id_superior: 88,
                set_ativo: true,
                set_tipo: 'G'
            },
            {
                set_nome: 'Gab. Liderança Do Pl',
                set_sigla: null,
                set_inativacao: '2999-12-31',
                set_id: 200,
                set_id_superior: 88,
                set_ativo: true,
                set_tipo: 'G'
            },
            {
                set_nome: 'Gab. Liderança Do Pmn',
                set_sigla: 'PMN',
                set_inativacao: '2999-12-31',
                set_id: 405,
                set_id_superior: 88,
                set_ativo: true,
                set_tipo: 'G'
            },
            {
                set_nome: 'Gab. Liderança Do Podemos',
                set_sigla: 'ALTERADO O NOME DO PARTIDO DE PTN PARA PODEMOS EM JUNHO 2017.',
                set_inativacao: '2999-12-31',
                set_id: 478,
                set_id_superior: 88,
                set_ativo: true,
                set_tipo: 'G'
            },
            {
                set_nome: 'Gab. Liderança Do Pp',
                set_sigla: null,
                set_inativacao: '2999-12-31',
                set_id: 204,
                set_id_superior: 88,
                set_ativo: true,
                set_tipo: 'G'
            },
            {
                set_nome: 'Gab. Liderança Do Pps',
                set_sigla: null,
                set_inativacao: '2999-12-31',
                set_id: 198,
                set_id_superior: 88,
                set_ativo: true,
                set_tipo: 'G'
            },
            {
                set_nome: 'Gab. Liderança Do Pr',
                set_sigla: null,
                set_inativacao: '2999-12-31',
                set_id: 324,
                set_id_superior: 88,
                set_ativo: true,
                set_tipo: 'G'
            },
            {
                set_nome: 'Gab. Liderança Do Prb',
                set_sigla: 'PRB',
                set_inativacao: '2999-12-31',
                set_id: 341,
                set_id_superior: 88,
                set_ativo: true,
                set_tipo: 'G'
            },
            {
                set_nome: 'Gab. Liderança Do Pros',
                set_sigla: null,
                set_inativacao: '2999-12-31',
                set_id: 451,
                set_id_superior: 88,
                set_ativo: true,
                set_tipo: 'G'
            },
            {
                set_nome: 'Gab. Liderança Do Prp',
                set_sigla: 'PRP',
                set_inativacao: '2999-12-31',
                set_id: 363,
                set_id_superior: 88,
                set_ativo: true,
                set_tipo: 'G'
            },
            {
                set_nome: 'Gab. Liderança Do Prtb',
                set_sigla: 'PRTB',
                set_inativacao: '2999-12-31',
                set_id: 239,
                set_id_superior: 88,
                set_ativo: true,
                set_tipo: 'G'
            },
            {
                set_nome: 'Gab. Liderança Do Psb',
                set_sigla: null,
                set_inativacao: '2999-12-31',
                set_id: 199,
                set_id_superior: 88,
                set_ativo: true,
                set_tipo: 'G'
            },
            {
                set_nome: 'Gab. Liderança Do Psc',
                set_sigla: null,
                set_inativacao: '2999-12-31',
                set_id: 233,
                set_id_superior: 88,
                set_ativo: true,
                set_tipo: 'G'
            },
            {
                set_nome: 'Gab. Liderança Do Psd',
                set_sigla: 'PSD',
                set_inativacao: '2999-12-31',
                set_id: 401,
                set_id_superior: 88,
                set_ativo: true,
                set_tipo: 'G'
            },
            {
                set_nome: 'Gab. Liderança Do Psdb',
                set_sigla: null,
                set_inativacao: '2999-12-31',
                set_id: 205,
                set_id_superior: 88,
                set_ativo: true,
                set_tipo: 'G'
            },
            {
                set_nome: 'Gab. Liderança Do Psl',
                set_sigla: 'PSL',
                set_inativacao: '2999-12-31',
                set_id: 364,
                set_id_superior: 88,
                set_ativo: true,
                set_tipo: 'G'
            },
            {
                set_nome: 'Gab. Liderança Do Pt',
                set_sigla: null,
                set_inativacao: '2999-12-31',
                set_id: 220,
                set_id_superior: 88,
                set_ativo: true,
                set_tipo: 'G'
            },
            {
                set_nome: 'Gab. Liderança Do Ptb',
                set_sigla: null,
                set_inativacao: '2999-12-31',
                set_id: 197,
                set_id_superior: 88,
                set_ativo: true,
                set_tipo: 'G'
            },
            {
                set_nome: 'Gab. Liderança Do Pv',
                set_sigla: null,
                set_inativacao: '2999-12-31',
                set_id: 222,
                set_id_superior: 88,
                set_ativo: true,
                set_tipo: 'G'
            },
            {
                set_nome: 'Gab. Liderança Do Sd',
                set_sigla: null,
                set_inativacao: '2999-12-31',
                set_id: 450,
                set_id_superior: 88,
                set_ativo: true,
                set_tipo: 'G'
            },
            {
                set_nome: 'Gab. Liderança Dos Democratas - Dem',
                set_sigla: 'DEM',
                set_inativacao: '2999-12-31',
                set_id: 325,
                set_id_superior: 88,
                set_ativo: true,
                set_tipo: 'G'
            },
            {
                set_nome: 'Gab. Liderança Rede Sustentabilidade',
                set_sigla: null,
                set_inativacao: '2999-12-31',
                set_id: 460,
                set_id_superior: 88,
                set_ativo: true,
                set_tipo: 'G'
            },
            {
                set_nome: 'Comissão Executiva',
                set_sigla: 'CE',
                set_inativacao: '2999-12-31',
                set_id: 398,
                set_id_superior: 398,
                set_ativo: true,
                set_tipo: 'E'
            }
        ],
        {}
    ),

    down: (queryInterface, Sequelize) => queryInterface.bulkDelete(
        { tableName: table, schema: 'spa2' },
        null,
        {}
    )
};
