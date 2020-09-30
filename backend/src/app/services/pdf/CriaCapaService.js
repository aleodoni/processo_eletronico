import * as caminhos from '../../../config/arquivos';
import path from 'path';
import PDFDocument from 'pdfkit';
import fs from 'fs';
import AppError from '../../error/AppError';
import DataHoraAtual from '../../models/DataHoraAtual';
require('dotenv/config');
const brasao = path.join(__dirname, '../../../../public/brasao.jpg');
const titulo = 'Câmara Municipal de Curitiba';

class CriaCapaService {
    constructor(processoModel) {
        this.processoModel = processoModel;
    }

    async execute(arq_id, pro_id, tpr_nome) {
        const processo = await this.processoModel.findByPk(pro_id, { logging: false });

        if (!processo) {
            throw new AppError('Processo não encontrado.');
        }

        const arquivo = caminhos.destino + caminhos.finalDoCaminho(arq_id) + caminhos.nomeFisico(arq_id) + 'C' + '.pdf';
        const doc = new PDFDocument();
        doc.pipe(fs.createWriteStream(arquivo));
        doc.image(brasao, 10, 10, { scale: 0.50 });
        doc.fontSize(20).font('Helvetica-Bold').text(titulo, 160, 20);
        doc.fontSize(14).font('Helvetica-Bold').text('PROCESSO ADMINISTRATIVO Nº ' + processo.pro_codigo, 190, 60);
        doc.fontSize(14).font('Helvetica-Bold').text('INICIATIVA: ', 12, 150, { lineBreak: false }).font('Helvetica').text(processo.pro_nome);
        doc.fontSize(14).font('Helvetica-Bold').text('ASSUNTO: ', 12, 170, { lineBreak: false }).font('Helvetica').text(tpr_nome);
        doc.rect(doc.x, 160, 450, doc.y).stroke();
        doc.rect(10, 130, 550, 680).stroke();

        doc.end();
        return arquivo;
    }

    async capaProcesso(arq_id, pro_id, pro_ano, tpr_nome, caminho) {
        const dataHoraAtual = await DataHoraAtual.findAll({
            attributes: ['data_hora_atual'],
            logging: false,
            plain: true
        });

        const processo = await this.processoModel.findByPk(pro_id, { logging: false });

        if (!processo) {
            throw new AppError('Processo não encontrado.');
        }
        const arquivo = caminho + '/' + 'capa-' + pro_id + pro_ano + '.pdf';
        const doc = new PDFDocument();
        doc.pipe(fs.createWriteStream(arquivo));
        doc.image(brasao, 10, 10, { scale: 0.50 });
        doc.fontSize(20).font('Helvetica-Bold').text(titulo, 160, 20);
        doc.fontSize(14).font('Helvetica-Bold').text('PROCESSO ADMINISTRATIVO Nº ' + processo.pro_codigo, 170, 60);
        doc.fontSize(14).font('Helvetica-Bold').text('INICIATIVA: ', 12, 150, { lineBreak: false }).font('Helvetica').text(processo.pro_nome);
        doc.fontSize(14).font('Helvetica-Bold').text('ASSUNTO: ', 12, 170, { lineBreak: false }).font('Helvetica').text(tpr_nome);
        doc.rect(10, 130, 550, 380).stroke();
        doc.fontSize(6).font('Helvetica-Bold').text('* Arquivo gerado automaticamente pelo sistema em ' + dataHoraAtual.dataValues.data_hora_atual, 10, 515);

        doc.end();
        return arquivo;
    }
}

export default CriaCapaService;
