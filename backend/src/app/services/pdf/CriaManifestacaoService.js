import path from 'path';
import PDFDocument from 'pdfkit';
import fs from 'fs';
import AppError from '../../error/AppError';
import DataHoraAtual from '../../models/DataHoraAtual';
require('dotenv/config');
const brasao = path.join(__dirname, '../../../../public/brasao.jpg');
const titulo = 'Câmara Municipal de Curitiba';

class CriaManifestacaoService {
    constructor(arquivoModel, manifestacaoModel) {
        this.arquivoModel = arquivoModel;
        this.manifestacaoModel = manifestacaoModel;
    }

    async criaManifestacaoVistoExecutiva(ano, pro_id, man_id, arq_id, caminhoArquivo) {
        const dataHoraAtual = await DataHoraAtual.findAll({
            attributes: ['data_hora_atual'],
            logging: false,
            plain: true
        });
        const arquivo = await this.arquivoModel.findByPk(arq_id, { logging: false });
        if (!arquivo) {
            throw new AppError('Arquivo não encontrado.');
        }
        const manifestacao = await this.manifestacaoModel.findByPk(man_id, { logging: false });
        if (!manifestacao) {
            throw new AppError('Manifestação não encontrada.');
        }

        const doc = new PDFDocument();
        doc.pipe(fs.createWriteStream(caminhoArquivo));
        doc.image(brasao, 10, 10, { scale: 0.50 });
        doc.fontSize(20).font('Helvetica-Bold').text(titulo, 160, 20);
        doc.fontSize(14).font('Helvetica-Bold').text('Visto da executiva: ' + manifestacao.man_visto_executiva, 170, 60);
        doc.fontSize(14).font('Helvetica-Bold').text('Login de usuário: ' + manifestacao.man_login, 12, 150);
        doc.fontSize(14).font('Helvetica-Bold').text('Data / hora: ' + manifestacao.man_data, 12, 170);
        doc.rect(10, 130, 550, 380).stroke();
        doc.fontSize(6).font('Helvetica-Bold').text('* Arquivo gerado automaticamente pelo sistema em ' + dataHoraAtual.dataValues.data_hora_atual, 10, 515);

        doc.end();
    }

    async criaManifestacaoCiencia(ano, pro_id, man_id, arq_id, caminhoArquivo) {
        const dataHoraAtual = await DataHoraAtual.findAll({
            attributes: ['data_hora_atual'],
            logging: false,
            plain: true
        });
        const arquivo = await this.arquivoModel.findByPk(arq_id, { logging: false });
        if (!arquivo) {
            throw new AppError('Arquivo não encontrado.');
        }
        const manifestacao = await this.manifestacaoModel.findByPk(man_id, { logging: false });
        if (!manifestacao) {
            throw new AppError('Manifestação não encontrada.');
        }

        const doc = new PDFDocument();
        doc.pipe(fs.createWriteStream(caminhoArquivo));
        doc.image(brasao, 10, 10, { scale: 0.50 });
        doc.fontSize(20).font('Helvetica-Bold').text(titulo, 160, 20);
        doc.fontSize(14).font('Helvetica-Bold').text('Ciência: ' + manifestacao.man_ciencia, 170, 60);
        doc.fontSize(14).font('Helvetica-Bold').text('INICIATIVA: ', 12, 150, { lineBreak: false }).font('Helvetica').text(manifestacao.man_id);
        doc.fontSize(14).font('Helvetica-Bold').text('DATA: ', 12, 170, { lineBreak: false }).font('Helvetica').text(manifestacao.man_data);
        doc.rect(10, 130, 550, 380).stroke();
        doc.fontSize(6).font('Helvetica-Bold').text('* Arquivo gerado automaticamente pelo sistema em ' + dataHoraAtual.dataValues.data_hora_atual, 10, 515);

        doc.end();
    }

    async criaManifestacaoCienciaAverbacao(ano, pro_id, man_id, arq_id, caminhoArquivo) {
        const dataHoraAtual = await DataHoraAtual.findAll({
            attributes: ['data_hora_atual'],
            logging: false,
            plain: true
        });
        const arquivo = await this.arquivoModel.findByPk(arq_id, { logging: false });
        if (!arquivo) {
            throw new AppError('Arquivo não encontrado.');
        }
        const manifestacao = await this.manifestacaoModel.findByPk(man_id, { logging: false });
        if (!manifestacao) {
            throw new AppError('Manifestação não encontrada.');
        }

        const doc = new PDFDocument();
        doc.pipe(fs.createWriteStream(caminhoArquivo));
        doc.image(brasao, 10, 10, { scale: 0.50 });
        doc.fontSize(20).font('Helvetica-Bold').text(titulo, 160, 20);
        doc.fontSize(14).font('Helvetica-Bold').text('Ciência: ' + manifestacao.man_ciencia_averbacao, 170, 60);
        doc.fontSize(14).font('Helvetica-Bold').text('INICIATIVA: ', 12, 150, { lineBreak: false }).font('Helvetica').text(manifestacao.man_id);
        doc.fontSize(14).font('Helvetica-Bold').text('DATA: ', 12, 170, { lineBreak: false }).font('Helvetica').text(manifestacao.man_data);
        doc.rect(10, 130, 550, 380).stroke();
        doc.fontSize(6).font('Helvetica-Bold').text('* Arquivo gerado automaticamente pelo sistema em ' + dataHoraAtual.dataValues.data_hora_atual, 10, 515);

        doc.end();
    }

    async criaManifestacaoCienciaCalculo(ano, pro_id, man_id, arq_id, caminhoArquivo) {
        const dataHoraAtual = await DataHoraAtual.findAll({
            attributes: ['data_hora_atual'],
            logging: false,
            plain: true
        });
        const arquivo = await this.arquivoModel.findByPk(arq_id, { logging: false });
        if (!arquivo) {
            throw new AppError('Arquivo não encontrado.');
        }
        const manifestacao = await this.manifestacaoModel.findByPk(man_id, { logging: false });
        if (!manifestacao) {
            throw new AppError('Manifestação não encontrada.');
        }

        const doc = new PDFDocument();
        doc.pipe(fs.createWriteStream(caminhoArquivo));
        doc.image(brasao, 10, 10, { scale: 0.50 });
        doc.fontSize(20).font('Helvetica-Bold').text(titulo, 160, 20);
        doc.fontSize(14).font('Helvetica-Bold').text('Ciência do cálculo: ' + manifestacao.man_ciencia_calculo, 170, 60);
        doc.fontSize(14).font('Helvetica-Bold').text('INICIATIVA: ', 12, 150, { lineBreak: false }).font('Helvetica').text(manifestacao.man_id);
        doc.fontSize(14).font('Helvetica-Bold').text('ASSUNTO: ', 12, 170, { lineBreak: false }).font('Helvetica').text(manifestacao.man_data);
        doc.rect(10, 130, 550, 380).stroke();
        doc.fontSize(6).font('Helvetica-Bold').text('* Arquivo gerado automaticamente pelo sistema em ' + dataHoraAtual.dataValues.data_hora_atual, 10, 515);

        doc.end();
    }
}

export default CriaManifestacaoService;
