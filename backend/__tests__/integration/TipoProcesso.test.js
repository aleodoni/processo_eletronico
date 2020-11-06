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

describe('Tipos de processo', () => {
    it('dummy', () => {
        expect(true).toBe(true);
    });
    // it('Tipos de processo - Lista', function(done) {
    //     request(app)
    //         .get(`${process.env.API_URL}/tipos-processo`)
    //         .set('authorization', `${token}`)
    //         .expect(200)
    //         .end(function(err) {
    //             if (err) {
    //                 return done(err);
    //             }
    //             return done();
    //         });
    // });
    // it('Tipos de processo grid - Lista', function(done) {
    //     request(app)
    //         .get(`${process.env.API_URL}/tipos-de-processo`)
    //         .set('authorization', `${token}`)
    //         .expect(200)
    //         .end(function(err) {
    //             if (err) {
    //                 return done(err);
    //             }
    //             return done();
    //         });
    // });
    // it('Tipos de processo - Carrega por gênero', function(done) {
    //     request(app)
    //         .get(`${process.env.API_URL}/tipos-de-processo/4`)
    //         .set('authorization', `${token}`)
    //         .expect(200)
    //         .end(function(err) {
    //             if (err) {
    //                 return done(err);
    //             }
    //             return done();
    //         });
    // });
    // let tipoProcessoId = '';
    // it('Tipos de processo - Insere', function(done) {
    //     const insereTiposProcesso = {
    //         tpr_id: null,
    //         tpr_nome: `Inserção nome tipo de processo - ${Math.random()}`,
    //         tpr_visualizacao: 1,
    //         gen_id: 6
    //     };
    //     request(app)
    //         .post(`${process.env.API_URL}/tipos-processo`)
    //         .set('authorization', `${token}`)
    //         .set('usuario', `${usuario}`)
    //         .send(insereTiposProcesso)
    //         .set('Content-Type', 'application/json')
    //         .expect(200)
    //         .end(function(err, res) {
    //             tipoProcessoId = res.body.tpr_id;
    //             if (err) {
    //                 return done(err);
    //             }
    //             return done();
    //         });
    // });
    // it('Tipos de processo - Edita', function(done) {
    //     const editaTiposProcesso = {
    //         tpr_nome: `Edição nome tipo de processo - ${Math.random()}`,
    //         tpr_visualizacao: 2,
    //         gen_id: 6
    //     };
    //     request(app)
    //         .put(`${process.env.API_URL}/tipos-processo/${tipoProcessoId}`)
    //         .set('authorization', `${token}`)
    //         .set('usuario', `${usuario}`)
    //         .send(editaTiposProcesso)
    //         .set('Content-Type', 'application/json')
    //         .expect(200)
    //         .end(function(err, res) {
    //             tipoProcessoId = res.body.tpr_id;
    //             if (err) {
    //                 return done(err);
    //             }
    //             return done();
    //         });
    // });
    // it('Tipos de processo - Apaga', function(done) {
    //     request(app)
    //         .delete(`${process.env.API_URL}/tipos-processo/${tipoProcessoId}`)
    //         .set('authorization', `${token}`)
    //         .set('usuario', `${usuario}`)
    //         .set('Content-Type', 'application/json')
    //         .expect(200)
    //         .end(function(err, res) {
    //             tipoProcessoId = res.body.tpr_id;
    //             if (err) {
    //                 return done(err);
    //             }
    //             return done();
    //         });
    // });
});
