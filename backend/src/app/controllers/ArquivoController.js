/* eslint-disable consistent-return */
/* eslint-disable func-names */
/* eslint-disable camelcase */
import Arquivo from '../models/Arquivo';
import ArquivoManifestacao from '../models/ArquivoManifestacao';
import DataHoraAtual from '../models/DataHoraAtual';
// import AuditoriaController from './AuditoriaController';
import * as caminhos from '../../config/arquivos';
import fs from 'fs';
require('dotenv/config');

class ArquivoController {
    async index(req, res) {
        const arquivos = await Arquivo.findAll({
            order: ['arq_id'],
            attributes: ['arq_id', 'arq_nome', 'pro_id'],
            logging: false,
            where: {
                pro_id: req.params.proId
            }
        });
        return res.json(arquivos);
    }

    async indexManifestacao(req, res) {
        const arquivos = await ArquivoManifestacao.findAll({
            order: ['man_id'],
            attributes: [
                'contador',
                'arq_id',
                'arq_nome',
                'man_id',
                'arq_tipo',
                'data',
                'arq_login',
                'tpd_nome'
            ],
            logging: true,
            where: {
                man_id: req.params.manId
            }
        });
        return res.json(arquivos);
    }

    async indexManifestacaoDiscordancia(req, res) {
        const arquivos = await ArquivoManifestacao.findAll({
            order: ['man_id'],
            attributes: [
                'contador',
                'arq_id',
                'arq_nome',
                'man_id',
                'arq_tipo',
                'data',
                'arq_login',
                'tpd_nome'
            ],
            logging: true,
            where: {
                man_id: req.params.manId
            }
        });
        return res.json(arquivos);
    }

    async store(req, res) {
        const dataHoraAtual = await DataHoraAtual.findAll({
            attributes: ['data_hora_atual'],
            logging: true,
            plain: true
        });

        const { arq_id, arq_nome, pro_id, man_id, arq_tipo, arq_doc_id, arq_doc_tipo, tpd_id, arq_data, arq_login } = await Arquivo.create({
            arq_id: req.body.arq_id,
            arq_nome: req.body.arq_nome,
            pro_id: req.body.pro_id,
            man_id: req.body.man_id,
            arq_tipo: req.body.arq_tipo,
            arq_doc_id: req.body.arq_doc_id,
            arq_doc_tipo: req.body.arq_doc_tipo,
            tpd_id: req.body.tpd_id,
            arq_data: dataHoraAtual.dataValues.data_hora_atual,
            arq_login: req.body.arq_login
        }, {
            logging: true
        });
        // auditoria de inserção
        // AuditoriaController.audita(req.body, req, 'I', arq_id);
        //
        return res.json({
            arq_id,
            arq_nome,
            pro_id,
            man_id,
            arq_tipo,
            arq_doc_id,
            arq_doc_tipo,
            tpd_id,
            arq_data,
            arq_login
        });
    }

    async update(req, res) {
        const arquivo = await Arquivo.findByPk(req.params.id, { logging: false });
        // auditoria de edição
        // AuditoriaController.audita(
        //    arquivo._previousDataValues,
        //    req,
        //    'U',
        //    req.params.id
        // );
        //
        if (!arquivo) {
            return res.status(400).json({ error: 'Arquivo não encontrado' });
        }
        await arquivo.update(req.body, { logging: false });
        return res.json(arquivo);
    }

    async delete(req, res) {
        const arquivo = await Arquivo.findByPk(req.params.id, { logging: false });
        if (!arquivo) {
            return res.status(400).json({ error: 'Arquivo não encontrado' });
        }
        await arquivo
            .destroy({ logging: false })
            .then(() => {
                // auditoria de deleção
                // AuditoriaController.audita(
                //    arquivo._previousDataValues,
                //    req,
                //    'D',
                //    req.params.id
                // );
                //
            })
            .catch(function() {
                return res.status(400).json({
                    error: 'Erro ao apagar arquivo.'
                });
            });
        return res.send();
    }

    download(req, res) {
        const caminho = caminhos.destino + caminhos.finalDoCaminho(req.params.arqId) + caminhos.nomeFisico(req.params.arqId) + '.pdf';
        fs.readFile(caminho, function(_err, data) {
            if (_err) {
                console.log(_err);
            }
            res.contentType('application/pdf');
            return res.send(data);
        });
    }

    downloadManifestacao(req, res) {
        const caminho = caminhos.destino + caminhos.finalDoCaminho(req.params.arqId) + caminhos.nomeFisico(req.params.arqId) + 'M' + '.pdf';
        fs.readFile(caminho, function(_err, data) {
            if (_err) {
                console.log(_err);
            }
            res.contentType('application/pdf');
            return res.send(data);
        });
    }
}
export default new ArquivoController();
