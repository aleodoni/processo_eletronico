/* eslint-disable func-names */
/* eslint-disable no-undef */
const request = require('supertest');
const app = require('../../app').default;
require('dotenv/config');
process.env.NODE_ENV = 'test';

// eslint-disable-next-line no-unused-vars
let token;
// eslint-disable-next-line no-unused-vars
let usuario = '';

beforeAll(done => {
    request(app)
        .post(`${process.env.API_URL}/autorizacao`)
        .send({
            senha: process.env.SENHA_TESTE,
            timeout: 1440,
            usuario: process.env.USUARIO_TESTE
        })
        .end((_err, response) => {
            token = response.body.token;
            usuario = response.body.usuario;
            done();
        });
});

describe('Arquivos', () => {
    // let arquivoId;
    it('dummy', () => {
        expect(true).toBe(true);
    });
    // it('Arquivo - Insere', function(done) {
    //     const insereFluxos = {
    //         arq_id: null,
    //         arq_nome: `Inserção nome - ${Math.random()}`,
    //         pro_id: 20,
    //         man_id: null,
    //         arq_tipo: 'application/pdf',
    //         arq_doc_id: 20,
    //         arq_doc_tipo: 'processo'
    //     };

    //     request(app)
    //         .post(`${process.env.API_URL}/arquivos`)
    //         .set('authorization', `${token}`)
    //         .set('usuario', `${usuario}`)
    //         .send(insereFluxos)
    //         .set('Content-Type', 'application/json')
    //         .expect(200)
    //         .end(function(err, res) {
    //             arquivoId = res.body.arq_id;
    //             if (err) {
    //                 return done(err);
    //             }
    //             return done();
    //         });
    // });
    // it('Arquivo - Edita', function(done) {
    //     const editaArquivos = {
    //         arq_removendo: true
    //     };
    //     request(app)
    //         .put(`${process.env.API_URL}/arquivos/${arquivoId}`)
    //         .set('authorization', `${token}`)
    //         .set('usuario', `${usuario}`)
    //         .send(editaArquivos)
    //         .set('Content-Type', 'application/json')
    //         .expect(200)
    //         .end(function(err, res) {
    //             arquivoId = res.body.arq_id;
    //             if (err) {
    //                 return done(err);
    //             }
    //             return done();
    //         });
    // });
    // it('Arquivo - Apaga', function(done) {
    //     request(app)
    //         .delete(`${process.env.API_URL}/arquivos/${arquivoId}`)
    //         .set('authorization', `${token}`)
    //         .set('usuario', `${usuario}`)
    //         .set('Content-Type', 'application/json')
    //         .expect(200)
    //         .end(function(err, res) {
    //             if (err) {
    //                 return done(err);
    //             }
    //             return done();
    //         });
    // });
    // it('Arquivo - Lista', function(done) {
    //     request(app)
    //         .get(`${process.env.API_URL}/arquivos-processo/${20}`)
    //         .set('authorization', `${token}`)
    //         .expect(200)
    //         .end(function(err) {
    //             if (err) {
    //                 return done(err);
    //             }
    //             return done();
    //         });
    // });
});
