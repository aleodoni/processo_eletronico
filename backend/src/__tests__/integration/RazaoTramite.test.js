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

describe('Razões de trâmite', () => {
    it('dummy', () => {
        expect(true).toBe(true);
    });
    // it('Razão de trâmite - Lista', function(done) {
    //     request(app)
    //         .get(`${process.env.API_URL}/razao-tramite`)
    //         .set('authorization', `${token}`)
    //         .expect(200)
    //         .end(function(err) {
    //             if (err) {
    //                 return done(err);
    //             }
    //             return done();
    //         });
    // });
    // let razaoId = '';
    // it('Razão de trâmite - Insere', function(done) {
    //     const insereRazoes = {
    //         raz_id: null,
    //         raz_nome: `Inserção nome - ${Math.random()}`
    //     };
    //     request(app)
    //         .post(`${process.env.API_URL}/razao-tramite`)
    //         .set('authorization', `${token}`)
    //         .set('usuario', `${usuario}`)
    //         .send(insereRazoes)
    //         .set('Content-Type', 'application/json')
    //         .expect(200)
    //         .end(function(err, res) {
    //             razaoId = res.body.raz_id;
    //             if (err) {
    //                 return done(err);
    //             }
    //             return done();
    //         });
    // });
    // it('Razão de trâmite - Edita', function(done) {
    //     const editaRazoes = {
    //         raz_nome: `Edição nome - ${Math.random()}`
    //     };
    //     request(app)
    //         .put(`${process.env.API_URL}/razao-tramite/${razaoId}`)
    //         .set('authorization', `${token}`)
    //         .set('usuario', `${usuario}`)
    //         .send(editaRazoes)
    //         .set('Content-Type', 'application/json')
    //         .expect(200)
    //         .end(function(err, res) {
    //             razaoId = res.body.raz_id;
    //             if (err) {
    //                 return done(err);
    //             }
    //             return done();
    //         });
    // });
    // it('Razão de trâmite - Apaga', function(done) {
    //     request(app)
    //         .delete(`${process.env.API_URL}/razao-tramite/${razaoId}`)
    //         .set('authorization', `${token}`)
    //         .set('usuario', `${usuario}`)
    //         .set('Content-Type', 'application/json')
    //         .expect(200)
    //         .end(function(err, res) {
    //             razaoId = res.body.raz_id;
    //             if (err) {
    //                 return done(err);
    //             }
    //             return done();
    //         });
    // });
});
