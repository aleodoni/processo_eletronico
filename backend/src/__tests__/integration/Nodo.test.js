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

describe('Nodos', () => {
    it('dummy', () => {
        expect(true).toBe(true);
    });
    // it('Nós - Lista', function(done) {
    //     request(app)
    //         .get(`${process.env.API_URL}/nos`)
    //         .set('authorization', `${token}`)
    //         .expect(200)
    //         .end(function(err) {
    //             if (err) {
    //                 return done(err);
    //             }
    //             return done();
    //         });
    // });
    // it('Nós - Grid', function(done) {
    //     request(app)
    //         .get(`${process.env.API_URL}/grid-nos/9`)
    //         .set('authorization', `${token}`)
    //         .expect(200)
    //         .end(function(err) {
    //             if (err) {
    //                 return done(err);
    //             }
    //             return done();
    //         });
    // });
    // let nodoId = '';
    // it('Nós - Insere', function(done) {
    //     const insereNodos = {
    //         nod_id: null,
    //         nod_inicio: true,
    //         flu_id: 8,
    //         area_id: '027',
    //         nod_fim: false
    //     };
    //     request(app)
    //         .post(`${process.env.API_URL}/nos`)
    //         .set('authorization', `${token}`)
    //         .set('usuario', `${usuario}`)
    //         .send(insereNodos)
    //         .set('Content-Type', 'application/json')
    //         .expect(200)
    //         .end(function(err, res) {
    //             nodoId = res.body.nod_id;
    //             if (err) {
    //                 return done(err);
    //             }
    //             return done();
    //         });
    // });
    // it('Nós - Edita', function(done) {
    //     const editaNodos = {
    //         nod_inicio: false,
    //         flu_id: 7,
    //         area_id: '027',
    //         nod_fim: true
    //     };
    //     request(app)
    //         .put(`${process.env.API_URL}/nos/${nodoId}`)
    //         .set('authorization', `${token}`)
    //         .set('usuario', `${usuario}`)
    //         .send(editaNodos)
    //         .set('Content-Type', 'application/json')
    //         .expect(200)
    //         .end(function(err, res) {
    //             nodoId = res.body.nod_id;
    //             if (err) {
    //                 return done(err);
    //             }
    //             return done();
    //         });
    // });
    // it('Nós - Apaga', function(done) {
    //     request(app)
    //         .delete(`${process.env.API_URL}/nos/${nodoId}`)
    //         .set('authorization', `${token}`)
    //         .set('usuario', `${usuario}`)
    //         .set('Content-Type', 'application/json')
    //         .expect(200)
    //         .end(function(err, res) {
    //             nodoId = res.body.nod_id;
    //             if (err) {
    //                 return done(err);
    //             }
    //             return done();
    //         });
    // });
});
