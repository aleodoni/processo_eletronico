import * as caminhos from '../../../config/arquivos';
import path from 'path';
import PDFDocument from 'pdfkit';
import fs from 'fs';
import AppError from '../../error/AppError';
import DataHoraAtual from '../../models/DataHoraAtual';
require('dotenv/config');
const brasao = path.join(__dirname, '../../../../public/brasao.jpg');
const titulo = 'Câmara Municipal de Curitiba';
const medidas = {
    size: [595.28, 841.89], // A4
    margins: {
        top: 72,
        bottom: 72,
        left: 72,
        right: 72
    },
    layout: 'portrait',
    info: {
        Title: 'titulo',
        Author: 'autor',
        Subject: '',
        Keywords: 'pdf;javascript'
    }
};

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

    async criaManifestacaoCienciaAverbacao(arq_id, man_id) {
        const arquivo = await this.arquivoModel.findByPk(arq_id, { logging: false });
        if (!arquivo) {
            throw new AppError('Arquivo não encontrado.');
        }
        const manifestacao = await this.manifestacaoModel.findByPk(man_id, { logging: false });
        if (!manifestacao) {
            throw new AppError('Manifestação não encontrada.');
        }
        const caminhoArquivo = caminhos.destino + caminhos.finalDoCaminho(arq_id) + caminhos.nomeFisico(arq_id) + 'M' + '.pdf';
        medidas.info.Title = 'SPE - ' + titulo + ' - ' + manifestacao.man_id;
        medidas.info.Author = manifestacao.man_login;
        medidas.info.Subject = manifestacao.man_ciencia_averbacao;
        const doc = new PDFDocument(medidas);
        doc.pipe(fs.createWriteStream(caminhoArquivo));
        doc.image(brasao, 10, 10, { scale: 0.50 });
        doc.fontSize(20).text(titulo, 160, 20);
        doc.fontSize(16).text('Ciência de Averbação: ' + manifestacao.man_ciencia_averbacao, 190, 80);
        doc.fontSize(14).text('Login de usuário: ' + manifestacao.man_login, 10, 150);
        doc.fontSize(14).text('Data / hora: ' + manifestacao.man_data, 10, 170);
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
