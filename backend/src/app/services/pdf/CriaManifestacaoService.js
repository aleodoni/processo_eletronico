import * as caminhos from '../../../config/arquivos';
import path from 'path';
import PDFDocument from 'pdfkit';
import fs from 'fs';
import AppError from '../../error/AppError';
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

    async criaManifestacaoVistoExecutiva(arq_id, man_id) {
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
        medidas.info.Subject = manifestacao.man_visto_executiva;
        const doc = new PDFDocument(medidas);
        doc.pipe(fs.createWriteStream(caminhoArquivo));
        doc.image(brasao, 10, 10, { scale: 0.50 });
        doc.fontSize(20).text(titulo, 160, 20);
        doc.fontSize(16).text('Visto da executiva: ' + manifestacao.man_visto_executiva, 190, 80);
        doc.fontSize(14).text('Login de usuário: ' + manifestacao.man_login, 10, 150);
        doc.fontSize(14).text('Data / hora: ' + manifestacao.man_data, 10, 170);
        doc.end();
    }

    async criaManifestacaoCiencia(arq_id, man_id) {
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
        medidas.info.Subject = manifestacao.man_ciencia;
        const doc = new PDFDocument(medidas);
        doc.pipe(fs.createWriteStream(caminhoArquivo));
        doc.image(brasao, 10, 10, { scale: 0.50 });
        doc.fontSize(20).text(titulo, 160, 20);
        doc.fontSize(16).text('Ciência: ' + manifestacao.man_ciencia, 190, 80);
        doc.fontSize(14).text('Login de usuário: ' + manifestacao.man_login, 10, 150);
        doc.fontSize(14).text('Data / hora: ' + manifestacao.man_data, 10, 170);
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
        medidas.info.Subject = manifestacao.man_averbacao;
        const doc = new PDFDocument(medidas);
        doc.pipe(fs.createWriteStream(caminhoArquivo));
        doc.image(brasao, 10, 10, { scale: 0.50 });
        doc.fontSize(20).text(titulo, 160, 20);
        doc.fontSize(16).text('Ciência de Averbação: ' + manifestacao.man_averbacao, 190, 80);
        doc.fontSize(14).text('Login de usuário: ' + manifestacao.man_login, 10, 150);
        doc.fontSize(14).text('Data / hora: ' + manifestacao.man_data, 10, 170);
        doc.end();
    }
}

export default CriaManifestacaoService;
