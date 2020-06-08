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

describe('Modelo de Menu', () => {
    it('Modelo de menu - Lista', function(done) {
        request(app)
            .get(`${process.env.API_URL}/modelo-menu`)
            .set('authorization', `${token}`)
            .expect(200)
            .end(function(err) {
                if (err) {
                    return done(err);
                }
                return done();
            });
    });
    let modeloMenuId = '';
    it('Modelo de menu - Insere', function(done) {
        const insereModeloMenus = {
            mmu_id: null,
            mmu_nome: `Inserção nome menu - ${Math.random()}`
        };
        request(app)
            .post(`${process.env.API_URL}/modelo-menu`)
            .set('authorization', `${token}`)
            .set('usuario', `${usuario}`)
            .send(insereModeloMenus)
            .set('Content-Type', 'application/json')
            .expect(200)
            .end(function(err, res) {
                modeloMenuId = res.body.mmu_id;
                if (err) {
                    return done(err);
                }
                return done();
            });
    });
    it('Modelo de menu - Edita', function(done) {
        const editaModeloMenus = {
            mmu_nome: `Edição nome modelo menu - ${Math.random()}`
        };
        request(app)
            .put(`${process.env.API_URL}/modelo-menu/${modeloMenuId}`)
            .set('authorization', `${token}`)
            .set('usuario', `${usuario}`)
            .send(editaModeloMenus)
            .set('Content-Type', 'application/json')
            .expect(200)
            .end(function(err, res) {
                if (err) {
                    return done(err);
                }
                return done();
            });
    });
    it('Modelo de menu - Apaga', function(done) {
        request(app)
            .delete(`${process.env.API_URL}/modelo-menu/${modeloMenuId}`)
            .set('authorization', `${token}`)
            .set('usuario', `${usuario}`)
            .set('Content-Type', 'application/json')
            .expect(200)
            .end(function(err, res) {
                modeloMenuId = res.body.mmu_id;
                if (err) {
                    return done(err);
                }
                return done();
            });
    });
});
