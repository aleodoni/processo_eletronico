/* eslint-disable consistent-return */
/* eslint-disable func-names */
/* eslint-disable camelcase */
import VDadosPessoa from '../models/VDadosPessoa';
import Processo from '../models/Processo';
import ComissaoProcessante from '../models/ComissaoProcessante';
import NomePasPad from '../models/NomePasPad';
import Lotacao from '../models/Lotacao';
import Setor from '../models/Setor';
import Area from '../models/Area';
import ProcessoOrigem from '../models/ProcessoOrigem';
import MembroComissao from '../models/MembroComissao';
import VProcessoOrigem from '../models/VProcessoOrigem';
import VDadosProcesso from '../models/VDadosProcesso';
import VDadosProcessoPasPad from '../models/VDadosProcessoPasPad';
import VMembrosComissao from '../models/VMembrosComissao';
import VDadosLogin from '../models/VDadosLogin';
import TipoProcesso from '../models/TipoProcesso';
import Nodo from '../models/Nodo';
import Arquivo from '../models/Arquivo';
import DataHoraAtual from '../models/DataHoraAtual';
import CriaCapaService from '../services/pdf/CriaCapaService';
import Sequelize from 'sequelize';
// import AuditoriaController from './AuditoriaController';

class CriaProcessoController {
    async dadosPessoa(req, res) {
        const dadosPessoas = await VDadosPessoa.findAll({
            attributes: ['pes_id', 'pes_celular', 'pes_cpf', 'pes_email', 'fone', 'pes_matricula', 'pes_nome'],
            logging: false,
            plain: true,
            where: {
                pes_matricula: req.params.matricula
            }
        });

        return res.json(dadosPessoas);
    }

    async dadosPessoaComissao(req, res) {
        let areaId, areaNome, loginMembro;
        const dadosPessoasComissao = await VDadosPessoa.findAll({
            attributes: ['pes_matricula', 'pes_nome'],
            logging: false,
            plain: true,
            where: {
                pes_matricula: req.params.matricula
            }
        });
        if (dadosPessoasComissao !== null) {
            const setorPessoaComissao = await Lotacao.findByPk(dadosPessoasComissao.dataValues.pes_matricula, { logging: false });
            if (!setorPessoaComissao) {
                return res.status(400).json({ error: 'Id da pessoa da comissão não encontrada' });
            }
            loginMembro = setorPessoaComissao.pes_login;
            const idSetor = setorPessoaComissao.set_id;
            const setor = await Setor.findByPk(idSetor, { logging: false });
            if (!setor) {
                return res.status(400).json({ error: 'Setor da pessoa da comissão não encontrada' });
            }
            areaId = setor.set_id_area;
            const area = await Area.findByPk(areaId, { logging: false });
            if (!area) {
                return res.status(400).json({ error: 'Área da pessoa da comissão não encontrada' });
            }
            areaNome = area.set_nome;
        } else {
            return res.send(null);
        }
        return res.json(
            {
                matricula: dadosPessoasComissao.dataValues.pes_matricula,
                nome: dadosPessoasComissao.dataValues.pes_nome,
                areaId: areaId,
                areaNome: areaNome,
                login: loginMembro
            });
    }

    async processosDescontoFolhaDeterminacaoJudicial(req, res) {
        const TIPO_PENSAO_ALIMENTICIA = 25;
        const processos = await VDadosProcesso.findAll({
            attributes: ['pro_id', 'pro_codigo', 'pro_matricula', 'pro_nome', 'cpf', 'tpr_id'],
            logging: true,
            where: {
                tpr_id: TIPO_PENSAO_ALIMENTICIA
            }
        });
        return res.json(processos);
    }

    async processosRecurso(req, res) {
        const Op = Sequelize.Op;
        const processos = await VDadosProcesso.findAll({
            attributes: ['pro_id', 'pro_codigo', 'pro_matricula', 'pro_nome', 'cpf', 'tpr_id', 'tpr_nome'],
            logging: true,
            where: {
                usu_autuador: req.params.usuario,
                tpr_id: { [Op.notIn]: [28, 15, 16, 30, 248] },
                usu_finalizador: { [Op.ne]: null }
            },
            order: ['pro_codigo']
        });
        return res.json(processos);
    }

    async processoOrigem(req, res) {
        const processoOrigem = await VProcessoOrigem.findAll({
            attributes: ['pro_id_origem', 'pro_id_atual', 'processo_origem', 'tpr_id', 'tpr_nome'],
            logging: true,
            where: {
                pro_id_atual: req.params.id
            }
        });
        return res.json(processoOrigem);
    }

    async comboMembrosComissaoProcessante(req, res) {
        const membrosComissaoProcessante = await VMembrosComissao.findAll({
            where: {
                area_id: 2000
            },
            attributes: ['mco_id', 'area_id', 'mco_matricula', 'mco_nome', 'mco_login', 'set_nome'],
            logging: true
        });
        return res.json(membrosComissaoProcessante);
    }

    async store(req, res) {
        if (req.body.pro_nome === '') {
            req.body.pro_nome = null;
        }
        if (req.body.pro_matricula === '') {
            req.body.pro_matricula = null;
        }
        if (req.body.pro_cpf === '') {
            req.body.pro_cpf = null;
        }
        if (req.body.pro_cnpj === '') {
            req.body.pro_cnpj = null;
        }
        if (req.body.pro_contato_pj === '') {
            req.body.pro_contato_pj = null;
        }
        if (req.body.pro_fone === '') {
            req.body.pro_fone = null;
        }
        if (req.body.pro_celular === '') {
            req.body.pro_celular = null;
        }
        if (req.body.pro_email === '') {
            req.body.pro_email = null;
        }
        if (req.body.pro_assunto === '') {
            req.body.pro_assunto = null;
        }
        if (req.body.usu_finalizador === '') {
            req.body.usu_finalizador = null;
        }
        if (req.body.set_id_finalizador === '') {
            req.body.set_id_finalizador = null;
        }
        if (req.body.area_id_iniciativa === '') {
            req.body.area_id_iniciativa = null;
        }
        if (req.body.pro_com_abono === null) {
            req.body.pro_com_abono = false;
        }

        const dataHoraAtual = await DataHoraAtual.findAll({
            attributes: ['data_hora_atual'],
            logging: true,
            plain: true
        });
        req.body.pro_autuacao = dataHoraAtual.dataValues.data_hora_atual;

        // com o tpr_id verifico qual é o nó de início do fluxo e se
        // o processo é pessoal ou não
        const tipoProcesso = await TipoProcesso.findAll({
            attributes: ['tpr_id', 'flu_id', 'tpr_pessoal', 'tpr_nome'],
            logging: false,
            plain: true,
            where: {
                tpr_id: req.body.tpr_id
            }
        });

        const tipoPessoal = tipoProcesso.dataValues.tpr_pessoal;
        let areaPessoa;
        // se for do tipo pessoal vou procurar pela matrícula ou pelo cpf
        // na view da elotech e na tabela de lotação
        if (tipoPessoal) {
            if (req.body.pro_matricula !== null && req.body.pro_matricula !== undefined) {
                // procura na tabela de lotação a área
                const lotacao = await VDadosLogin.findAll({
                    attributes: ['matricula', 'set_id_area'],
                    logging: false,
                    plain: true,
                    where: {
                        matricula: req.body.pro_matricula.trim()
                    }
                });
                areaPessoa = lotacao.dataValues.set_id_area;
            } else if (req.body.pro_cpf !== null && req.body.pro_cpf !== undefined) {
                const dadosPessoa = await VDadosPessoa.findAll({
                    attributes: ['pes_matricula', 'pes_cpf'],
                    logging: false,
                    plain: true,
                    where: {
                        pes_cpf: req.body.pro_cpf
                    }
                });
                console.log(dadosPessoa.dataValues.pes_matricula);
                const lotacao = await VDadosLogin.findAll({
                    attributes: ['matricula', 'set_id_area'],
                    logging: false,
                    plain: true,
                    where: {
                        matricula: dadosPessoa.dataValues.pes_matricula.toString()
                    }
                });
                areaPessoa = lotacao.dataValues.set_id_area;
            } else {
                return res.status(400).json({ error: 'Erro ao retornar dados de área de pessoa.' });
            }
            req.body.area_id_iniciativa = areaPessoa;
        }
        const fluId = tipoProcesso.dataValues.flu_id;
        const nodo = await Nodo.findAll({
            attributes: ['nod_id', 'flu_id', 'nod_inicio'],
            logging: false,
            plain: true,
            where: {
                flu_id: fluId,
                nod_inicio: true
            }
        });
        if (nodo !== null) {
            req.body.nod_id = nodo.dataValues.nod_id;
        } else {
            return res.status(400).json({ error: 'Processo sem fluxo. Cadastre um fluxo primeiro.' });
        }

        console.log(JSON.stringify(req.body, null, 4));

        const {
            pro_id,
            tpr_id,
            pro_iniciativa,
            pro_nome,
            pro_matricula,
            pro_cpf,
            pro_cnpj,
            pro_contato_pj,
            pro_fone,
            pro_celular,
            pro_email,
            pro_encerramento,
            pro_assunto,
            usu_autuador,
            set_id_autuador,
            area_id,
            pro_ultimo_tramite,
            usu_finalizador,
            set_id_finalizador,
            nod_id,
            pro_tipo_iniciativa,
            area_id_iniciativa,
            pro_autuacao,
            pro_recurso,
            pro_com_abono,
            pro_num_com_abono
        } = await Processo.create(req.body, {
            logging: false
        });
        // auditoria de inserção
        // AuditoriaController.audita(req.body, req, 'I', pro_id);
        //

        // se tiver revisão de desconto de pensão alimentícia grava na tabela
        // de processo_origem
        if (req.body.pro_pensao !== null && req.body.pro_pensao !== undefined) {
            const processoOrigem = await ProcessoOrigem.create({ pro_id_pai: req.body.pro_pensao, pro_id_atual: pro_id }, {
                logging: true
            });
            console.log(JSON.stringify(processoOrigem, null, 4));
        }

        // se for um recurso de processo grava na tabela de processo_origem
        if (req.body.pro_recurso === true) {
            const processoOrigem = await ProcessoOrigem.create({ pro_id_pai: req.body.pro_codigo_recurso, pro_id_atual: pro_id }, {
                logging: true
            });
            console.log(JSON.stringify(processoOrigem, null, 4));
        }

        // grava na tabela arquivo a capa do processo
        const TIPO_DOCUMENTO_CAPA_PROCESSO = 38;
        const arquivo = await Arquivo.create({
            arq_id: null,
            arq_nome: 'capa-' + pro_id + '.pdf',
            pro_id: pro_id,
            man_id: null,
            arq_tipo: 'application/pdf',
            arq_doc_id: pro_id,
            arq_doc_tipo: 'capa-processo',
            tpd_id: TIPO_DOCUMENTO_CAPA_PROCESSO,
            arq_data: dataHoraAtual.dataValues.data_hora_atual,
            arq_login: usu_autuador
        }, {
            logging: true
        });

        // cria o arquivo pdf
        const criaCapa = new CriaCapaService(Processo);
        await criaCapa.execute(arquivo.arq_id, pro_id, tipoProcesso.dataValues.tpr_nome);

        return res.json({
            pro_id,
            tpr_id,
            pro_iniciativa,
            pro_nome,
            pro_matricula,
            pro_cpf,
            pro_cnpj,
            pro_contato_pj,
            pro_fone,
            pro_celular,
            pro_email,
            pro_encerramento,
            pro_assunto,
            usu_autuador,
            set_id_autuador,
            area_id,
            pro_ultimo_tramite,
            usu_finalizador,
            set_id_finalizador,
            nod_id,
            pro_tipo_iniciativa,
            area_id_iniciativa,
            pro_autuacao,
            pro_recurso,
            pro_com_abono,
            pro_num_com_abono
        });
    }

    async criaPasPad(req, res) {
        if (req.body.pro_assunto === '') {
            req.body.pro_assunto = null;
        }
        const dataHoraAtual = await DataHoraAtual.findAll({
            attributes: ['data_hora_atual'],
            logging: true,
            plain: true
        });
        req.body.pro_autuacao = dataHoraAtual.dataValues.data_hora_atual;
        // com o tpr_id verifico qual é o nó de início do fluxo
        const tipoProcesso = await TipoProcesso.findAll({
            attributes: ['tpr_id', 'flu_id', 'tpr_nome'],
            logging: false,
            plain: true,
            where: {
                tpr_id: req.body.tpr_id
            }
        });

        const nodo = await Nodo.findAll({
            attributes: ['nod_id', 'flu_id', 'nod_inicio'],
            logging: false,
            plain: true,
            where: {
                flu_id: tipoProcesso.dataValues.flu_id,
                nod_inicio: true
            }
        });
        if (nodo !== null) {
            req.body.nod_id = nodo.dataValues.nod_id;
        } else {
            return res.status(400).json({ error: 'Processo sem fluxo. Cadastre um fluxo primeiro.' });
        }

        const {
            pro_id,
            tpr_id,
            pro_iniciativa,
            pro_nome,
            pro_matricula,
            pro_cpf,
            pro_fone,
            pro_celular,
            pro_email,
            pro_assunto,
            usu_autuador,
            set_id_autuador,
            area_id,
            nod_id,
            pro_tipo_iniciativa,
            area_id_iniciativa,
            pro_autuacao,
            pro_recurso
        } = await Processo.create(req.body, {
            logging: false
        });
        // auditoria de inserção
        // AuditoriaController.audita(req.body, req, 'I', pro_id);
        //
        // se for PAD e tiver processo PAD grava na tabela de processo_origem
        if (tipoProcesso.dataValues.tpr_id === 15) {
            if (req.body.pro_codigo_origem !== '') {
                const localizaProcessoOrigem = await VDadosProcessoPasPad.findAll({
                    attributes: [
                        'pro_id',
                        'pro_codigo'
                    ],
                    logging: false,
                    plain: true,
                    where: {
                        pro_codigo: req.body.pro_codigo_origem,
                        tpr_id: 16
                    }
                });
                if (localizaProcessoOrigem !== null) {
                    const processoOrigem = await ProcessoOrigem.create({ pro_id_pai: localizaProcessoOrigem.dataValues.pro_id, pro_id_atual: pro_id }, {
                        logging: true
                    });
                    console.log(JSON.stringify(processoOrigem, null, 4));
                } else {
                    return res.status(400).json({ error: 'Processo de origem inexistente. Insira um código de processo válido.' });
                }
            }
        }

        // grava na tabela spa2.nome_pas_pad
        const arrayNomes = req.body.nomes_processo;
        if (arrayNomes.length > 0) {
            console.log(arrayNomes);
            for (const key in arrayNomes) {
                try {
                    await NomePasPad.create({
                        nom_id: null,
                        nom_matricula: arrayNomes[key].matricula,
                        nom_nome: arrayNomes[key].nome,
                        nom_area_id: arrayNomes[key].areaId,
                        nom_area_nome: arrayNomes[key].areaNome,
                        pro_id: pro_id,
                        nom_login: arrayNomes[key].login
                    }, {
                        logging: false
                    });
                } catch (e) {
                    console.log(e);
                }
            }
        }

        // grava na tabela spa2.comissao_processante
        const arrayMembros = req.body.membros_comissao;
        console.log(arrayMembros);
        for (const key in arrayMembros) {
            try {
                // localiza o membro
                const membroComissao = await MembroComissao.findAll({
                    attributes: [
                        'mco_id',
                        'mco_matricula'
                    ],
                    logging: false,
                    plain: true,
                    where: {
                        mco_matricula: arrayMembros[key].matricula
                    }
                });
                let cargo = false;
                if (arrayMembros[key].bCargo) {
                    cargo = true;
                }

                await ComissaoProcessante.create({
                    cop_id: null,
                    mco_id: membroComissao.dataValues.mco_id,
                    pro_id: pro_id,
                    cop_presidente: cargo
                }, {
                    logging: false
                });
            } catch (e) {
                console.log(e);
            }
        }

        // grava na tabela arquivo a capa do processo
        const TIPO_DOCUMENTO_CAPA_PROCESSO = 38;
        const arquivo = await Arquivo.create({
            arq_id: null,
            arq_nome: 'capa-' + pro_id + '.pdf',
            pro_id: pro_id,
            man_id: null,
            arq_tipo: 'application/pdf',
            arq_doc_id: pro_id,
            arq_doc_tipo: 'capa-processo',
            tpd_id: TIPO_DOCUMENTO_CAPA_PROCESSO,
            arq_data: dataHoraAtual.dataValues.data_hora_atual,
            arq_login: usu_autuador
        }, {
            logging: true
        });

        // cria o arquivo pdf
        const criaCapa = new CriaCapaService(Processo);
        await criaCapa.execute(arquivo.arq_id, pro_id, tipoProcesso.dataValues.tpr_nome);

        return res.json({
            pro_id,
            tpr_id,
            pro_iniciativa,
            pro_nome,
            pro_matricula,
            pro_cpf,
            pro_fone,
            pro_celular,
            pro_email,
            pro_assunto,
            usu_autuador,
            set_id_autuador,
            area_id,
            nod_id,
            pro_tipo_iniciativa,
            area_id_iniciativa,
            pro_autuacao,
            pro_recurso
        });
    }

    async encerra(req, res) {
        const processo = await Processo.findByPk(req.params.id, { logging: false });
        const dataHoraAtual = await DataHoraAtual.findAll({
            attributes: ['data_hora_atual'],
            logging: true,
            plain: true
        });
        if (!processo) {
            return res.status(400).json({ error: 'Processo não encontrado' });
        }
        const tipoProcesso = await TipoProcesso.findByPk(processo.tpr_id, { logging: false });
        if (!tipoProcesso) {
            return res.status(400).json({ error: 'Tipo de processo não encontrado' });
        }

        const prazo = tipoProcesso.tpr_prazo_recurso;
        await processo.update({
            pro_encerramento: dataHoraAtual.dataValues.data_hora_atual,
            usu_finalizador: req.body.usuario,
            set_id_finalizador: req.body.areaId
        }, { logging: false });
        return res.json(prazo);
    }

    async ciencia(req, res) {
        const processo = await Processo.findByPk(req.params.id, { logging: false });
        const dataHoraAtual = await DataHoraAtual.findAll({
            attributes: ['data_hora_atual'],
            logging: true,
            plain: true
        });
        if (!processo) {
            return res.status(400).json({ error: 'Processo não encontrado' });
        }
        if (req.body.decisao === 'Concedido') {
            await processo.update({
                pro_encerramento: dataHoraAtual.dataValues.data_hora_atual,
                usu_finalizador: req.body.usuario,
                set_id_finalizador: req.body.areaId
            }, { logging: false });
        }
        if (req.body.decisao === 'Negado') {
            await processo.update({
                pro_encerramento: dataHoraAtual.dataValues.data_hora_atual,
                usu_finalizador: req.body.usuario,
                set_id_finalizador: req.body.areaId,
                pro_recurso: true
            }, { logging: false });
        }

        return res.json(processo);
    }
}
export default new CriaProcessoController();
