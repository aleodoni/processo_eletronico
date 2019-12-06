/* eslint-disable func-names */
/* eslint-disable no-undef */
const request = require('supertest');
const app = require('../app').default;
require('dotenv/config');
process.env.NODE_ENV = 'test';

let token = '';
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

describe('Fluxos', () => {
    it('Fluxos - Lista', function(done) {
        request(app)
            .get(`${process.env.API_URL}/fluxos`)
            .set('authorization', `${token}`)
            .expect(200)
            .end(function(err) {
                if (err) {
                    return done(err);
                }
                return done();
            });
    });
    let fluxoId = '';
    it('Fluxos - Insere', function(done) {
        const insereFluxos = {
            flu_id: null,
            flu_nome: `Inserção nome - ${Math.random()}`
        };
        request(app)
            .post(`${process.env.API_URL}/fluxos`)
            .set('authorization', `${token}`)
            .set('usuario', `${usuario}`)
            .send(insereFluxos)
            .set('Content-Type', 'application/json')
            .expect(200)
            .end(function(err, res) {
                fluxoId = res.body.flu_id;
                if (err) {
                    return done(err);
                }
                return done();
            });
    });
    it('Fluxos - Edita', function(done) {
        const editaFluxos = {
            flu_nome: `Edição nome - ${Math.random()}`
        };
        request(app)
            .put(`${process.env.API_URL}/fluxos/${fluxoId}`)
            .set('authorization', `${token}`)
            .set('usuario', `${usuario}`)
            .send(editaFluxos)
            .set('Content-Type', 'application/json')
            .expect(200)
            .end(function(err, res) {
                fluxoId = res.body.flu_id;
                if (err) {
                    return done(err);
                }
                return done();
            });
    });
    it('Fluxos - Apaga', function(done) {
        request(app)
            .delete(`${process.env.API_URL}/fluxos/${fluxoId}`)
            .set('authorization', `${token}`)
            .set('usuario', `${usuario}`)
            .set('Content-Type', 'application/json')
            .expect(200)
            .end(function(err, res) {
                fluxoId = res.body.flu_id;
                if (err) {
                    return done(err);
                }
                return done();
            });
    });
});
