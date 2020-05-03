/* eslint-disable consistent-return */
/* eslint-disable func-names */
/* eslint-disable camelcase */
import Manifestacao from '../models/Manifestacao';
import ArquivoManifestacao from '../models/ArquivoManifestacao';
import moment from 'moment';
import { degrees, PDFDocument, rgb, StandardFonts } from 'pdf-lib';
import * as caminhos from '../../config/arquivos';
import fs from 'fs';
require('dotenv/config');
// import AuditoriaController from './AuditoriaController';

class ManifestacaoController {
    async store(req, res) {
        const {
            man_id,
            pro_id,
            tmn_id,
            man_login,
            man_id_area,
            tpd_id,
            man_visto_executiva
        } = await Manifestacao.create(req.body, {
            logging: false
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
            tpd_id,
            man_visto_executiva
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
            const d = moment();
            req.body.man_data_cancelamento = d.format('YYYY-MM-DD HH:mm:ss');
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
        const { width, height } = firstPage.getSize();

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
