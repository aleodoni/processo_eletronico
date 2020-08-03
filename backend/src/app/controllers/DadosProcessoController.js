/* eslint-disable consistent-return */
/* eslint-disable func-names */
/* eslint-disable camelcase */
import VDadosProcesso from '../models/VDadosProcesso';
import MembroComissao from '../models/MembroComissao';
import VDadosProcessoPasPad from '../models/VDadosProcessoPasPad';
import * as caminhos from '../../config/arquivos';
import Arquivo from '../models/Arquivo';
import VProcessosPessoais from '../models/VProcessosPessoais';
import VProcessosArea from '../models/VProcessosArea';
import VProcessosSigiloso from '../models/VProcessosSigiloso';
import VDecisaoPessoal from '../models/VDecisaoPessoal';
import VDadosMembrosComissao from '../models/VDadosMembrosComissao';
import NomePasPad from '../models/NomePasPad';
import { PDFDocument } from 'pdf-lib';
import fs from 'fs';
import ConnectionHelper from '../helpers/ConnectionHelper';

class DadosProcessoController {
    async dadosProcesso(req, res) {
        const dadosProcesso = await VDadosProcesso.findAll({
            attributes: [
                'pro_id',
                'pro_codigo',
                'pro_nome',
                'pro_matricula',
                'cpf',
                'cnpj',
                'pro_fone',
                'pro_celular',
                'pro_email',
                'pro_encerramento',
                'pro_assunto',
                'pro_numero',
                'pro_autuacao',
                'usu_autuador',
                'pro_ultimo_tramite',
                'usu_finalizador',
                'nod_id',
                'set_id_autuador',
                'area_id',
                'set_id_finalizador',
                'pro_iniciativa',
                'pro_tipo_iniciativa',
                'area_id_iniciativa',
                'tpr_id',
                'pro_contato_pj',
                'pro_ano',
                'tpr_nome',
                'tpr_visualizacao',
                'gen_nome',
                'flu_id',
                'flu_nome',
                'area_atual_processo',
                'area_iniciativa_processo',
                'setor_autuador_processo',
                'setor_finalizador_processo',
                'visualizacao',
                'nod_aval_executiva',
                'nod_fim',
                'com_abono',
                'num_abono'
            ],
            logging: false,
            where: {
                pro_id: req.params.id
            }
        });
        return res.json(dadosProcesso);
    }

    async dadosProcessoPasPad(req, res) {
        const dadosProcessoPasPad = await VDadosProcessoPasPad.findAll({
            attributes: [
                'pro_id',
                'pro_codigo',
                'pro_assunto',
                'pro_numero',
                'pro_autuacao',
                'pro_autuacao_data',
                'usu_autuador',
                'pro_ultimo_tramite',
                'usu_finalizador',
                'nod_id',
                'area_id',
                'set_id_finalizador',
                'pro_iniciativa',
                'pro_tipo_iniciativa',
                'area_id_iniciativa',
                'tpr_id',
                'pro_ano',
                'tpr_nome',
                'tpr_visualizacao',
                'gen_nome',
                'flu_id',
                'flu_nome',
                'area_atual_processo',
                'visualizacao',
                'nod_fim'
            ],
            logging: false,
            where: {
                pro_id: req.params.id
            }
        });
        return res.json(dadosProcessoPasPad);
    }

    async nomePasPad(req, res) {
        const nomePasPad = await NomePasPad.findAll({
            attributes: [
                'nom_id',
                'nom_matricula',
                'nom_nome',
                'nom_area_id',
                'nom_area_nome',
                'pro_id',
                'nom_login'
            ],
            logging: false,
            where: {
                pro_id: req.params.id
            }
        });
        return res.json(nomePasPad);
    }

    async pesquisaProcesso(req, res) {
        console.log('######### Início da pesquisa ############');
        const { Op } = require('sequelize');
        const wherePesquisa = {};
        const proMatricula = req.body.pro_matricula;
        const proNome = req.body.pro_nome;
        const proContatoPj = req.body.pro_contato_pj;
        const proCpf = req.body.pro_cpf;
        const proCnpj = req.body.pro_cnpj;
        const proDataIniAutuacao = req.body.pro_data_ini_autuacao;
        const proDataFimAutuacao = req.body.pro_data_fim_autuacao;
        const proNumero = req.body.pro_numero;
        const proAno = req.body.pro_ano;
        const tprId = req.body.tpr_id;
        const areaId = req.body.area_id;
        const areaIdIniciativa = req.body.area_id_iniciativa;

        if (proMatricula !== '') {
            wherePesquisa.pro_matricula = proMatricula;
        }
        if (proNome !== '') {
            wherePesquisa.pro_nome = { [Op.substring]: proNome };
        }
        if (proContatoPj !== '') {
            wherePesquisa.pro_contato_pj = { [Op.substring]: proContatoPj };
        }
        if (proCpf !== '' && proCpf !== undefined) {
            wherePesquisa.cpf = proCpf;
        }
        if (proCnpj !== '' && proCnpj !== undefined) {
            wherePesquisa.cnpj = proCnpj;
        }
        if (proDataIniAutuacao !== '' && proDataIniAutuacao !== undefined && (proDataFimAutuacao === '' || proDataFimAutuacao === undefined)) {
            wherePesquisa.pro_autuacao_data = { [Op.gte]: proDataIniAutuacao };
        }
        if (proDataFimAutuacao !== '' && proDataFimAutuacao !== undefined && (proDataIniAutuacao === '' || proDataIniAutuacao === undefined)) {
            wherePesquisa.pro_autuacao_data = { [Op.lte]: proDataFimAutuacao };
        }
        if ((proDataIniAutuacao !== '' && proDataIniAutuacao !== undefined) && (proDataFimAutuacao !== '' && proDataFimAutuacao !== undefined)) {
            wherePesquisa.pro_autuacao_data = { [Op.between]: [proDataIniAutuacao, proDataFimAutuacao] };
        }
        if (proNumero !== '') {
            wherePesquisa.pro_numero = parseInt(proNumero, 10);
        }
        if (proAno !== '') {
            wherePesquisa.pro_ano = parseInt(proAno, 10);
        }
        if (tprId !== '-1') {
            wherePesquisa.tpr_id = parseInt(tprId, 10);
        }
        if (areaId !== '-1') {
            wherePesquisa.area_id = areaId;
        }
        if (areaIdIniciativa !== '-1') {
            wherePesquisa.area_id_iniciativa = areaIdIniciativa;
        }

        if (Object.entries(wherePesquisa).length === 0) {
            return res.status(412).json({ error: 'Selecione pelo menos um campo para pesquisa.' });
        }

        const pesquisaProcesso = await VDadosProcesso.findAll({
            attributes: [
                'pro_id',
                'pro_codigo',
                'pro_nome',
                'pro_matricula',
                'cpf',
                'cnpj',
                'pro_numero',
                'pro_autuacao',
                'pro_autuacao_data',
                'area_id',
                'pro_iniciativa',
                'pro_tipo_iniciativa',
                'area_id_iniciativa',
                'tpr_id',
                'pro_contato_pj',
                'pro_ano',
                'tpr_nome',
                'gen_nome',
                'area_atual_processo',
                'area_iniciativa_processo',
                'setor_autuador_processo'
            ],
            logging: false,
            where: wherePesquisa
        });
        return res.json(pesquisaProcesso);
    }

    async processoPorCodigo(req, res) {
        const dadosProcesso = await VDadosProcesso.findAll({
            attributes: [
                'pro_id',
                'pro_codigo'
            ],
            logging: false,
            plain: true,
            where: {
                pro_codigo: req.body.proCodigo
            }
        });
        return res.json(dadosProcesso);
    }

    async membrosComissao(req, res) {
        try {
            const dadosMembrosComissao = await VDadosMembrosComissao.findAll({
                attributes: [
                    'cop_id',
                    'pro_id',
                    'cargo',
                    'matricula',
                    'nome',
                    'login',
                    'area'
                ],
                logging: false,
                where: {
                    pro_id: req.params.id
                }
            });
            return res.json(dadosMembrosComissao);
        } catch (e) {
            console.log(e);
            return null;
        }
    }

    async processosPessoais(req, res) {
        const dadosProcessoPessoa = await VProcessosPessoais.findAll({
            attributes: [
                'pro_id',
                'pro_codigo',
                'tpr_nome',
                'area_id',
                'usu_autuador',
                'nod_aval_executiva'
            ],
            logging: false,
            where: {
                area_id: req.params.areaId,
                usu_autuador: req.params.usuario
            }
        });
        return res.json(dadosProcessoPessoa);
    }

    async processosArea(req, res) {
        const dadosProcessoArea = await VProcessosArea.findAll({
            attributes: [
                'pro_id',
                'pro_codigo',
                'pro_nome',
                'tpr_nome',
                'area_id',
                'usu_autuador',
                'nod_aval_executiva',
                'tpr_pessoal',
                'pessoal',
                'nod_fim',
                'nod_decisao',
                'nod_dias_prazo',
                'alerta',
                'nod_ciencia',
                'nod_averbacao',
                'nod_ciencia_averbacao',
                'nod_aval_horario',
                'nod_contagem_tempo',
                'nod_ciencia_calculo',
                'nod_parecer_projuris_aposentadoria'
            ],
            logging: false,
            where: {
                area_id: req.params.areaId
            }
        });
        return res.json(dadosProcessoArea);
    }

    async processosSigiloso(req, res) {
        let areaId = req.params.areaId;
        const login = req.params.login;
        const connection = ConnectionHelper.getConnection();
        const sql = "select spa2.verifica_sigilo('" + login + "')";
        const verificaSigilo = await connection.query(sql,
            {
                logging: false,
                plain: true,
                raw: true
            }
        );
        if (verificaSigilo.verifica_sigilo) {
            // se é membro da comissão processante abre como esta "área"
            const membroComissao = await MembroComissao.findOne({
                attributes: [
                    'mco_login',
                    'area_id'
                ],
                logging: false,
                where: {
                    mco_login: login
                }
            });

            if (membroComissao) {
                areaId = membroComissao.area_id;
            }

            const dadosProcessoSigiloso = await VProcessosSigiloso.findAll({
                attributes: [
                    'pro_id',
                    'pro_codigo',
                    'pro_nome',
                    'tpr_nome',
                    'area_id',
                    'usu_autuador',
                    'nod_aval_executiva',
                    'tpr_pessoal',
                    'pessoal',
                    'nod_fim',
                    'nod_decisao',
                    'nod_dias_prazo',
                    'alerta',
                    'nod_ciencia',
                    'nod_averbacao',
                    'nod_ciencia_averbacao',
                    'nod_aval_horario',
                    'nod_contagem_tempo',
                    'nod_ciencia_calculo',
                    'nod_parecer_projuris_aposentadoria'
                ],
                logging: false,
                where: {
                    area_id: areaId
                }
            });
            return res.json(dadosProcessoSigiloso);
        } else {
            return res.json([]);
        }
    }

    async decisaoPessoal(req, res) {
        const decisao = await VDecisaoPessoal.findAll({
            attributes: [
                'pro_id',
                'tpr_id',
                'flu_id',
                'nod_id',
                'area_id',
                'nod_decisao',
                'man_visto_executiva',
                'tpr_prazo_recurso'
            ],
            logging: false,
            plain: true,
            where: {
                pro_id: req.params.id
            }
        });
        return res.send({ visto: decisao.dataValues.man_visto_executiva, prazo: decisao.dataValues.tpr_prazo_recurso, tpr_id: decisao.dataValues.tpr_id });
    }

    async geraJuntada(req, res) {
        const arquivos = await Arquivo.findAll({
            attributes: [
                'arq_id',
                'pro_id',
                'man_id',
                'arq_nome'
            ],
            logging: false,
            where: {
                pro_id: req.params.id
            },
            order: ['arq_id']
        });
        const arquivosDisco = [];
        for (let i = 0; i < arquivos.length; i++) {
            const caminho = caminhos.destino + caminhos.finalDoCaminho(arquivos[i].arq_id);
            let nome = arquivos[i].arq_id.toString();
            let extensao = '';
            // o primeiro sempre vai ser a capa
            if (i === 0) {
                extensao = 'C.pdf';
            } else {
                extensao = 'M.pdf';
            }
            if (nome.length === 1) {
                nome = '000000' + nome + extensao;
            }
            if (nome.length === 2) {
                nome = '00000' + nome + extensao;
            }
            if (nome.length === 3) {
                nome = '0000' + nome + extensao;
            }
            if (nome.length === 4) {
                nome = '000' + nome + extensao;
            }
            if (nome.length === 5) {
                nome = '00' + nome + extensao;
            }
            if (nome.length === 6) {
                nome = '0' + nome + extensao;
            }
            arquivosDisco.push(caminho + nome);
        }
        const arquivoJuntada = caminhos.destino + 'Juntada/' + caminhos.nomeFisico(req.params.id) + 'J' + '.pdf';
        const mergedPdf = await PDFDocument.create();
        for (const pdfCopyDoc of arquivosDisco) {
            const pdfBytes = fs.readFileSync(pdfCopyDoc);
            const pdf = await PDFDocument.load(pdfBytes);
            const copiedPages = await mergedPdf.copyPages(pdf, pdf.getPageIndices());
            copiedPages.forEach((page) => {
                mergedPdf.addPage(page);
            });
        }
        fs.writeFileSync(arquivoJuntada, await mergedPdf.save());
        fs.readFile(arquivoJuntada, function(_err, data) {
            if (_err) {
                console.log(_err);
            }
            res.contentType('application/pdf');
            return res.send(data);
        });
    }
}
export default new DadosProcessoController();
