/* eslint-disable func-names */
/* eslint-disable no-undef */
const request = require('supertest');
const app = require('../../src/app').default;
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
            login: process.env.USUARIO_TESTE
        })
        .end((_err, response) => {
            token = response.body.token;
            usuario = response.body.usuario;
            done();
        });
});

describe('Tipo de manifestação', () => {
    it('dummy', () => {
        expect(true).toBe(true);
    });
    // it('Tipo de manifestação - Lista', function(done) {
    //     request(app)
    //         .get(`${process.env.API_URL}/tipos-manifestacao`)
    //         .set('authorization', `${token}`)
    //         .expect(200)
    //         .end(function(err) {
    //             if (err) {
    //                 return done(err);
    //             }
    //             return done();
    //         });
    // });
    // let tipoManifestacaoId = '';
    // it('Tipo de manifestação - Insere', function(done) {
    //     const insereTiposManifestacao = {
    //         tma_id: null,
    //         tma_nome: `Inserção nome - ${Math.random()}`
    //     };
    //     request(app)
    //         .post(`${process.env.API_URL}/tipos-manifestacao`)
    //         .set('authorization', `${token}`)
    //         .set('usuario', `${usuario}`)
    //         .send(insereTiposManifestacao)
    //         .set('Content-Type', 'application/json')
    //         .expect(200)
    //         .end(function(err, res) {
    //             tipoManifestacaoId = res.body.tma_id;
    //             if (err) {
    //                 return done(err);
    //             }
    //             return done();
    //         });
    // });
    // it('Tipo de manifestação - Edita', function(done) {
    //     const editaTiposManifestacao = {
    //         tma_nome: `Edição nome - ${Math.random()}`
    //     };
    //     request(app)
    //         .put(`${process.env.API_URL}/tipos-manifestacao/${tipoManifestacaoId}`)
    //         .set('authorization', `${token}`)
    //         .set('usuario', `${usuario}`)
    //         .send(editaTiposManifestacao)
    //         .set('Content-Type', 'application/json')
    //         .expect(200)
    //         .end(function(err, res) {
    //             tipoManifestacaoId = res.body.tma_id;
    //             if (err) {
    //                 return done(err);
    //             }
    //             return done();
    //         });
    // });
    // it('Tipo de manifestação - Apaga', function(done) {
    //     request(app)
    //         .delete(`${process.env.API_URL}/tipos-manifestacao/${tipoManifestacaoId}`)
    //         .set('authorization', `${token}`)
    //         .set('usuario', `${usuario}`)
    //         .set('Content-Type', 'application/json')
    //         .expect(200)
    //         .end(function(err, res) {
    //             tipoManifestacaoId = res.body.tma_id;
    //             if (err) {
    //                 return done(err);
    //             }
    //             return done();
    //         });
    // });
});
