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

describe('Gênero', () => {
    it('Gêneros - Lista', function(done) {
        request(app)
            .get(`${process.env.API_URL}/generos`)
            .set('authorization', `${token}`)
            .expect(200)
            .end(function(err) {
                if (err) {
                    return done(err);
                }
                return done();
            });
    });
    let generoId = '';
    it('Gêneros - Insere', function(done) {
        const insereGeneros = {
            gen_id: null,
            gen_nome: `Inserção nome - ${Math.random()}`
        };
        request(app)
            .post(`${process.env.API_URL}/generos`)
            .set('authorization', `${token}`)
            .set('usuario', `${usuario}`)
            .send(insereGeneros)
            .set('Content-Type', 'application/json')
            .expect(200)
            .end(function(err, res) {
                generoId = res.body.gen_id;
                if (err) {
                    return done(err);
                }
                return done();
            });
    });
    it('Gêneros - Edita', function(done) {
        const editaGeneros = {
            gen_nome: `Edição nome - ${Math.random()}`
        };
        request(app)
            .put(`${process.env.API_URL}/generos/${generoId}`)
            .set('authorization', `${token}`)
            .set('usuario', `${usuario}`)
            .send(editaGeneros)
            .set('Content-Type', 'application/json')
            .expect(200)
            .end(function(err, res) {
                generoId = res.body.gen_id;
                if (err) {
                    return done(err);
                }
                return done();
            });
    });
    it('Gêneros - Apaga', function(done) {
        request(app)
            .delete(`${process.env.API_URL}/generos/${generoId}`)
            .set('authorization', `${token}`)
            .set('usuario', `${usuario}`)
            .set('Content-Type', 'application/json')
            .expect(200)
            .end(function(err, res) {
                generoId = res.body.gen_id;
                if (err) {
                    return done(err);
                }
                return done();
            });
    });
});
