/* eslint-disable consistent-return */
/* eslint-disable func-names */
/* eslint-disable camelcase */
import Manifestacao from '../models/Manifestacao';
import VManifestacao from '../models/VManifestacao';
import VManifestacaoProcesso from '../models/VManifestacaoProcesso';
import ArquivoManifestacao from '../models/ArquivoManifestacao';
import VNodoDecisao from '../models/VNodoDecisao';
import DataHoraAtual from '../models/DataHoraAtual';
import Tramite from '../models/Tramite';
import moment from 'moment';
import { degrees, PDFDocument, rgb, StandardFonts } from 'pdf-lib';
import * as caminhos from '../../config/arquivos';
import fs from 'fs';
require('dotenv/config');
// import AuditoriaController from './AuditoriaController';

class ManifestacaoController {
    async index(req, res) {
        const nodoDecisao = await VNodoDecisao.findAll({
            attributes: ['nod_id', 'pro_id', 'nod_decisao'],
            logging: true,
            plain: true,
            where: {
                pro_id: req.params.id
            }
        });
        return res.send(nodoDecisao.dataValues.nod_decisao);
    }

    async manifestacaoProcesso(req, res) {
        // vou verificar nos tramites deste processo se o último trâmite teve
        // como razão "Discordância de cálculo", se teve é que voltou, então
        // tem que ter uma nova manifestação do DARH
        const RAZ_DISCORDANCIA_DE_CALCULO = 120;
        const tramite = await Tramite.findAll({
            attributes: ['tra_id', 'pro_id', 'raz_id'],
            logging: true,
            where: {
                pro_id: req.params.id,
                raz_id: RAZ_DISCORDANCIA_DE_CALCULO
            }
        });
        const manifestacao = await VManifestacao.findAll({
            attributes: ['man_id',
                'pro_id',
                'tmn_id',
                'tmn_nome',
                'man_login',
                'man_id_area',
                'set_nome',
                'man_cancelada',
                'man_login_cancelamento',
                'man_visto_executiva',
                'man_data_cancelamento',
                'man_data',
                'man_ciencia',
                'man_averbacao',
                'man_ciencia_averbacao',
                'man_aval_horario',
                'man_contagem_tempo',
                'man_ciencia_calculo',
                'nod_id',
                'man_tramitada',
                'man_parecer_projuris_aposentadoria'],

            logging: true,
            where: {
                pro_id: req.params.id,
                man_data_cancelamento: null,
                man_login_cancelamento: null,
                man_tramitada: false
            },
            order: [
                ['man_id', 'DESC']]
        });
        if (tramite.length === 0) {
            for (let i = 0; i < manifestacao.length; i++) {
                manifestacao[i].dataValues.discordancia = false;
            }
            return res.json(manifestacao);
        } else {
            for (let i = 0; i < manifestacao.length; i++) {
                manifestacao[i].dataValues.discordancia = true;
            }
            return res.json(manifestacao);
        }
    }

    async manifestacaoProcessoDados(req, res) {
        const manifestacao = await VManifestacaoProcesso.findAll({
            attributes: ['seq',
                'man_id',
                'pro_id',
                'tmn_nome',
                'man_login',
                'set_nome',
                'man_data'],
            logging: false,
            where: {
                pro_id: req.params.id
            }
        });
        const dados = [];
        for (const m in manifestacao) {
            const arquivosManifestacao = [];
            const arquivos = await ArquivoManifestacao.findAll({
                order: ['man_id'],
                attributes: [
                    'arq_id',
                    'arq_nome',
                    'man_id',
                    'arq_tipo',
                    'data',
                    'arq_login',
                    'tpd_nome'
                ],
                logging: false,
                where: {
                    man_id: manifestacao[m].man_id
                }
            });

            for (const a in arquivos) {
                arquivosManifestacao.push(
                    {
                        arq_id: arquivos[a].arq_id,
                        arq_nome: arquivos[a].arq_nome,
                        arq_tipo: arquivos[a].arq_tipo,
                        data: arquivos[a].data,
                        arq_login: arquivos[a].arq_login,
                        tpd_nome: arquivos[a].tpd_nome
                    });
            }

            dados.push(
                {
                    seq: manifestacao[m].seq,
                    tmn_nome: manifestacao[m].tmn_nome,
                    set_nome: manifestacao[m].set_nome,
                    man_login: manifestacao[m].man_login,
                    arquivos: arquivosManifestacao
                });
        }
        return res.json(dados);
    }

    async store(req, res) {
        const dataHoraAtual = await DataHoraAtual.findAll({
            attributes: ['data_hora_atual'],
            logging: true,
            plain: true
        });

        const {
            man_id,
            pro_id,
            tmn_id,
            man_login,
            man_id_area,
            man_visto_executiva,
            man_data,
            nod_id,
            man_ciencia,
            man_averbacao,
            man_ciencia_averbacao,
            man_aval_horario,
            man_contagem_tempo,
            man_ciencia_calculo,
            man_parecer_projuris_aposentadoria
        } = await Manifestacao.create({
            man_id: req.body.man_id,
            pro_id: req.body.pro_id,
            tmn_id: req.body.tmn_id,
            man_login: req.body.man_login,
            man_id_area: req.body.man_id_area,
            man_visto_executiva: req.body.man_visto_executiva,
            man_data: dataHoraAtual.dataValues.data_hora_atual,
            nod_id: req.body.nod_id,
            man_ciencia: req.body.man_ciencia,
            man_averbacao: req.body.man_averbacao,
            man_ciencia_averbacao: req.body.man_ciencia_averbacao,
            man_aval_horario: req.body.man_aval_horario,
            man_contagem_tempo: req.body.man_contagem_tempo,
            man_ciencia_calculo: req.body.man_ciencia_calculo,
            man_parecer_projuris_aposentadoria: req.body.man_parecer_projuris_aposentadoria
        }, {
            logging: true
        });
            // auditoria de inserção
            // AuditoriaController.audita(req.body, req, 'I', man_id);
            //
        return res.json({
            man_id,
            pro_id,
            tmn_id,
            man_login,
            man_id_area,
            man_visto_executiva,
            man_data,
            nod_id,
            man_ciencia,
            man_averbacao,
            man_ciencia_averbacao,
            man_aval_horario,
            man_contagem_tempo,
            man_ciencia_calculo,
            man_parecer_projuris_aposentadoria
        });
    }

    async update(req, res) {
        const manifestacao = await Manifestacao.findByPk(req.params.id, { logging: false });
        // auditoria de edição
        // AuditoriaController.audita(
        //    manifestacao._previousDataValues,
        //    req,
        //    'U',
        //    req.params.id
        // );
        //
        if (!manifestacao) {
            return res.status(400).json({ error: 'Manifestação não encontrada' });
        }
        if (req.body.man_data_cancelamento === null) {
            const dataHoraAtual = await DataHoraAtual.findAll({
                attributes: ['data_hora_atual'],
                logging: true,
                plain: true
            });
            req.body.man_data_cancelamento = dataHoraAtual.dataValues.data_hora_atual;
        }
        const dataCancelamento = moment(req.body.man_data_cancelamento).format('DD/MM/YYYY HH:mm:ss');
        await manifestacao.update(req.body, { logging: false });

        // carrega o arquivo
        const arquivo = await ArquivoManifestacao.findAll({
            attributes: ['arq_id'],
            logging: false,
            plain: true,
            where: {
                man_id: req.params.id
            }
        });
        if (!arquivo) {
            return res.status(400).json({ error: 'Arquivo não encontrado' });
        }

        const caminho = caminhos.destino + caminhos.finalDoCaminho(arquivo.dataValues.arq_id) + caminhos.nomeFisico(arquivo.dataValues.arq_id) + 'M' + '.pdf';
        const myArrayBuffer = fs.readFileSync(caminho, null);
        const pdfDoc = await PDFDocument.load(myArrayBuffer);

        const helveticaFont = await pdfDoc.embedFont(StandardFonts.Helvetica);
        const pages = pdfDoc.getPages();
        const firstPage = pages[0];
        // const { width, height } = firstPage.getSize();
        const { height } = firstPage.getSize();

        firstPage.drawRectangle({
            borderColor: rgb(0.95, 0.1, 0.1),
            borderWidth: 1,
            height: 70,
            rotate: degrees(-45),
            width: 440,
            x: 195,
            y: height / 2 + 230

        });
        firstPage.drawText('CANCELADO', {
            x: 243,
            y: height / 2 + 196,
            size: 48,
            font: helveticaFont,
            color: rgb(0.95, 0.1, 0.1),
            rotate: degrees(-45)
        });
        firstPage.drawText('Usuário: ' + manifestacao.man_login_cancelamento + ' - Cancelamento: ' + dataCancelamento, {
            x: 238,
            y: height / 2 + 270,
            size: 10,
            font: helveticaFont,
            color: rgb(0.95, 0.1, 0.1),
            rotate: degrees(-45)
        });

        const pdfBytes = await pdfDoc.save();

        fs.writeFileSync(caminho, Buffer.from(pdfBytes));
        console.log(JSON.stringify(manifestacao));

        return res.json(manifestacao);
    }

    async delete(req, res) {
        const manifestacao = await Manifestacao.findByPk(req.params.id, { logging: false });
        if (!manifestacao) {
            return res.status(400).json({ error: 'Manifestação não encontrada' });
        }
        await manifestacao
            .destroy({ logging: false })
            .then(auditoria => {
                // auditoria de deleção
                // AuditoriaController.audita(
                //    manifestacao._previousDataValues,
                //    req,
                //    'D',
                //    req.params.id
                // );
                //
            })
            .catch(function(err) {
                if (err.toString().includes('SequelizeForeignKeyConstraintError')) {
                    return res.status(400).json({
                        error: 'Erro ao excluir manifestação. A manifestação possui uma ou mais ligações.'
                    });
                }
            });
        return res.send();
    }
}
export default new ManifestacaoController();
