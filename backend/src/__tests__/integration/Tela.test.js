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

describe('Telas', () => {
    it('Telas - Lista', function(done) {
        request(app)
            .get(`${process.env.API_URL}/telas`)
            .set('authorization', `${token}`)
            .expect(200)
            .end(function(err) {
                if (err) {
                    return done(err);
                }
                return done();
            });
    });
    let telaId = '';
    it('Telas - Insere', function(done) {
        const insereTelas = {
            tel_id: null,
            tel_nome: `Inserção nome - ${Math.random()}`
        };
        request(app)
            .post(`${process.env.API_URL}/telas`)
            .set('authorization', `${token}`)
            .set('usuario', `${usuario}`)
            .send(insereTelas)
            .set('Content-Type', 'application/json')
            .expect(200)
            .end(function(err, res) {
                telaId = res.body.tel_id;
                if (err) {
                    return done(err);
                }
                return done();
            });
    });
    it('Telas - Edita', function(done) {
        const editaTelas = {
            tel_nome: `Edição nome - ${Math.random()}`
        };
        request(app)
            .put(`${process.env.API_URL}/telas/${telaId}`)
            .set('authorization', `${token}`)
            .set('usuario', `${usuario}`)
            .send(editaTelas)
            .set('Content-Type', 'application/json')
            .expect(200)
            .end(function(err, res) {
                telaId = res.body.tel_id;
                if (err) {
                    return done(err);
                }
                return done();
            });
    });
    it('Telas - Apaga', function(done) {
        request(app)
            .delete(`${process.env.API_URL}/telas/${telaId}`)
            .set('authorization', `${token}`)
            .set('usuario', `${usuario}`)
            .set('Content-Type', 'application/json')
            .expect(200)
            .end(function(err, res) {
                telaId = res.body.tel_id;
                if (err) {
                    return done(err);
                }
                return done();
            });
    });
    test('Telas por área', async() => {
        const response = await request(app)
            .get(`${process.env.API_URL}/telas-por-area/288`)
            .set('authorization', `${token}`);
        expect(response.statusCode).toBe(200);
    });
});
