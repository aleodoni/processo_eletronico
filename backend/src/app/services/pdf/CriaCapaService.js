import * as caminhos from '../../../config/arquivos';
import path from 'path';
import PDFDocument from 'pdfkit';
import fs from 'fs';
import AppError from '../../error/AppError';
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
        doc.fontSize(20).text(titulo, 160, 20);
        doc.fontSize(16).text('PROCESSO ADMINISTRATIVO Nº ' + processo.pro_codigo, 190, 60);
        doc.fontSize(16).text('INICIATIVA: ' + processo.pro_nome, 10, 150);
        doc.rect(doc.x, 160, 450, doc.y).stroke();
        doc.fontSize(14).text('ASSUNTO: ' + tpr_nome, 10, 170);

        doc.end();
    }
}

export default CriaCapaService;
