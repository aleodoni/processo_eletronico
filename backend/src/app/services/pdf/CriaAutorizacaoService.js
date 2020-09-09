import path from 'path';
import PDFDocument from 'pdfkit';
import AppError from '../../error/AppError';
import fs from 'fs';
require('dotenv/config');
const brasao = path.join(__dirname, '../../../../public/brasao.jpg');
const titulo = 'Câmara Municipal de Curitiba';
const metadados = {
    info: { Title: 'Documento de autorização de pagamento', Author: 'Câmara Municipal de Curitiba' },
    permissions: {
        printing: false,
        modifying: false,
        copying: false,
        annotating: false,
        fillingForms: false,
        contentAccessibility: false,
        documentAssembly: false
    }
};

class CriaAutorizacaoService {
    constructor(autorizacaoModel, arquivoModel, autorizacaoArquivoModel) {
        this.autorizacaoModel = autorizacaoModel;
        this.arquivoModel = arquivoModel;
        this.autorizacaoArquivoModel = autorizacaoArquivoModel;
    }

    async criaAutorizacao(autId, arq_id, caminho, documentos) {
        const autorizacaoArquivo = await this.autorizacaoArquivoModel.findAll({
            attributes: [
                'fornecedor',
                'telefone',
                'email',
                'contato',
                'cnpj_cpf',
                'aut_id',
                'referencia',
                'nota_fiscal',
                'data_expedicao_nf',
                'valor',
                'agencia',
                'conta_corrente',
                'data_cadastro',
                'pro_id',
                'banco'
            ],
            logging: true,
            plain: true,
            where: {
                aut_id: autId
            }
        });

        if (!autorizacaoArquivo) {
            throw new AppError('Dados de autorização não encontrados.');
        }
        const cnpj = autorizacaoArquivo.dataValues.cnpj_cpf.substring(0, 2) + '.' + autorizacaoArquivo.dataValues.cnpj_cpf.substring(2, 5) + '.' + autorizacaoArquivo.dataValues.cnpj_cpf.substring(5, 8) + '/' + autorizacaoArquivo.dataValues.cnpj_cpf.substring(8, 12) + '-' + autorizacaoArquivo.dataValues.cnpj_cpf.substring(12, 14);
        const valorFormatado = Number(autorizacaoArquivo.dataValues.valor).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });

        const arquivo = caminho + '/' + arq_id + 'A.pdf';
        const texto = 'A empresa acima mencionada, por intermédio de seu representante, vem à presença de Vossa Excelência, requerer o pagamento da nota fiscal abaixo especificada.';
        const doc = new PDFDocument(metadados);
        doc.pipe(fs.createWriteStream(arquivo));
        doc.image(brasao, 10, 10, { scale: 0.50 });
        doc.fontSize(20).font('Helvetica-Bold').text(titulo, 160, 20);
        doc.fontSize(14).font('Helvetica-Bold').text('AUTORIZAÇÃO Nº ' + autId, 190, 60);
        doc.fontSize(14).font('Helvetica-Bold').text('Fornecedor: ', 12, 100, { lineBreak: false }).font('Helvetica').text(autorizacaoArquivo.dataValues.fornecedor);
        doc.fontSize(14).font('Helvetica-Bold').text('CNPJ: ', 12, 120, { lineBreak: false }).font('Helvetica').text(cnpj);
        doc.fontSize(14).font('Helvetica-Bold').text('Telefone: ', 190, 120, { lineBreak: false }).font('Helvetica').text(autorizacaoArquivo.dataValues.telefone);
        doc.fontSize(14).font('Helvetica-Bold').text('Solicitação:', 12, 140);
        doc.fontSize(14).font('Helvetica').text(texto, {
            width: 515,
            align: 'justify'
        });
        doc.fontSize(14).font('Helvetica-Bold').text('Nota fiscal: ', 12, 210, { lineBreak: false }).font('Helvetica').text(autorizacaoArquivo.dataValues.nota_fiscal);
        doc.fontSize(14).font('Helvetica-Bold').text('Data de expedição: ', 180, 210, { lineBreak: false }).font('Helvetica').text(autorizacaoArquivo.dataValues.data_expedicao_nf);
        doc.fontSize(14).font('Helvetica-Bold').text('Valor: ', 385, 210, { lineBreak: false }).font('Helvetica').text(valorFormatado);
        doc.fontSize(14).font('Helvetica-Bold').text('Banco: ', 12, 230, { lineBreak: false }).font('Helvetica').text(autorizacaoArquivo.dataValues.banco);
        doc.fontSize(14).font('Helvetica-Bold').text('Agência: ', 12, 250, { lineBreak: false }).font('Helvetica').text(autorizacaoArquivo.dataValues.agencia);
        doc.fontSize(14).font('Helvetica-Bold').text('Conta corrente: ', 180, 250, { lineBreak: false }).font('Helvetica').text(autorizacaoArquivo.dataValues.conta_corrente);
        doc.fontSize(14).font('Helvetica-Bold').text('Referente: ', 12, 270, { lineBreak: false }).font('Helvetica').text(autorizacaoArquivo.dataValues.referencia);
        doc.fontSize(14).font('Helvetica-Bold').text('Documentos anexos:', 12, 290);
        doc.fontSize(12).font('Helvetica').list(documentos, 12, 310);
        doc.rect(10, 90, 550, 680).stroke();
        doc.end();
        return arquivo;
    }
}

export default CriaAutorizacaoService;
