/* eslint-disable consistent-return */
/* eslint-disable func-names */
/* eslint-disable camelcase */
import * as caminhos from '../../config/arquivos';
import path from 'path';
require('dotenv/config');
const Report = require('../../config/fluentReports').Report;
const brasao = path.join(__dirname, '../../../public/brasao.jpg');
const titulo = 'Câmara Municipal de Curitiba';

class CriaPdfController {
    criaPdfVistoExecutiva(req, res) {
        const cabecalho = function(rpt, data) {
            rpt.setCurrentY(10);
            rpt.image(brasao, { width: 50, x: 10, y: 10 });
            rpt.setCurrentY(40);
            rpt.fontSize(16);
            rpt.print(titulo, { x: 200, y: 18 });
            rpt.newLine(1);
            rpt.print('Comissão Executiva', { x: 223, y: 36 });
            rpt.newLine(1);
            rpt.fontSize(13);
            rpt.print('Visto da Executiva', { x: 255, y: 54 });
            rpt.newLine(2);
            rpt.bandLine(0.5);
        };
        const data = [{ name: 'Elijah', age: 18 }, { name: 'Abraham', age: 22 }, { name: 'Gavin', age: 28 }];
        const arquivo = caminhos.destino + caminhos.finalDoCaminho(req.body.arq_id) + caminhos.nomeFisico(req.body.arq_id) + 'M' + '.pdf';

        // eslint-disable-next-line no-unused-vars
        const rpt = new Report(arquivo, { paper: 'A4' })
            .pageHeader(cabecalho)
            .margins(20)
            .data(data) // Add some Data (This is required)
            .detail([['name', 200], ['age', 50]])
            .render(function(Err, name) { console.log('Relatório salvo em: ', name); });
        return res.status(204).end();
    }

    criaPdfCiencia(req, res) {
        const cabecalho = function(rpt, data) {
            rpt.setCurrentY(10);
            rpt.image(brasao, { width: 50, x: 10, y: 10 });
            rpt.setCurrentY(40);
            rpt.fontSize(16);
            rpt.print(titulo, { x: 200, y: 18 });
            rpt.newLine(1);
            rpt.print('Ciência', { x: 223, y: 36 });
            rpt.newLine(1);
            rpt.fontSize(13);
            rpt.print('Ciência do usuário: ' + req.body.usuario, { x: 255, y: 54 });
            rpt.newLine(2);
            rpt.bandLine(0.5);
        };
        const data = [{ name: 'Elijah', age: 18 }, { name: 'Abraham', age: 22 }, { name: 'Gavin', age: 28 }];
        const arquivo = caminhos.destino + caminhos.finalDoCaminho(req.body.arq_id) + caminhos.nomeFisico(req.body.arq_id) + 'M' + '.pdf';
        // eslint-disable-next-line no-unused-vars
        const rpt = new Report(arquivo, { paper: 'A4' })
            .pageHeader(cabecalho)
            .margins(20)
            .data(data) // Add some Data (This is required)
            .detail([['name', 200], ['age', 50]])
            .render(function(Err, name) { console.log('Relatório salvo em: ', name); });
        return res.status(204).end();
    }

    criaPdfCienciaAverbacao(req, res) {
        const cabecalho = function(rpt, data) {
            rpt.setCurrentY(10);
            rpt.image(brasao, { width: 50, x: 10, y: 10 });
            rpt.setCurrentY(40);
            rpt.fontSize(16);
            rpt.print(titulo, { x: 200, y: 18 });
            rpt.newLine(1);
            rpt.print('Ciência de Averbação', { x: 223, y: 36 });
            rpt.newLine(1);
            rpt.fontSize(13);
            rpt.print('Ciência de averbação do usuário: ' + req.body.usuario, { x: 255, y: 54 });
            rpt.newLine(2);
            rpt.bandLine(0.5);
        };
        const data = [{ name: 'Elijah', age: 18 }, { name: 'Abraham', age: 22 }, { name: 'Gavin', age: 28 }];
        const arquivo = caminhos.destino + caminhos.finalDoCaminho(req.body.arq_id) + caminhos.nomeFisico(req.body.arq_id) + 'M' + '.pdf';
        // eslint-disable-next-line no-unused-vars
        const rpt = new Report(arquivo, { paper: 'A4' })
            .pageHeader(cabecalho)
            .margins(20)
            .data(data) // Add some Data (This is required)
            .detail([['name', 200], ['age', 50]])
            .render(function(Err, name) { console.log('Relatório salvo em: ', name); });
        return res.status(204).end();
    }
}

export default new CriaPdfController();
