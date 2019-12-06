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

describe('Menu', () => {
    it('Menu - Lista', function(done) {
        request(app)
            .get(`${process.env.API_URL}/menu`)
            .set('authorization', `${token}`)
            .expect(200)
            .end(function(err) {
                if (err) {
                    return done(err);
                }
                return done();
            });
    });
    it('Telas do Menu', function(done) {
        request(app)
            .get(`${process.env.API_URL}/tela-menu`)
            .set('authorization', `${token}`)
            .expect(200)
            .end(function(err) {
                if (err) {
                    return done(err);
                }
                return done();
            });
    });
    it('Menu pai', function(done) {
        request(app)
            .get(`${process.env.API_URL}/menu-pai`)
            .set('authorization', `${token}`)
            .expect(200)
            .end(function(err) {
                if (err) {
                    return done(err);
                }
                return done();
            });
    });
    let menuId = '';
    it('Menu - Insere', function(done) {
        const insereMenus = {
            men_id: null,
            men_id_pai: null,
            men_nome: `Inserção nome menu - ${Math.random()}`,
            men_url: `Inserção url menu - ${Math.random()}`,
            tel_id: null,
            tel_interna: true
        };
        request(app)
            .post(`${process.env.API_URL}/menu`)
            .set('authorization', `${token}`)
            .set('usuario', `${usuario}`)
            .send(insereMenus)
            .set('Content-Type', 'application/json')
            .expect(200)
            .end(function(err, res) {
                menuId = res.body.men_id;
                if (err) {
                    return done(err);
                }
                return done();
            });
    });
    it('Menu - Edita', function(done) {
        const editaMenus = {
            men_id_pai: null,
            men_nome: `Edição nome menu - ${Math.random()}`,
            men_url: `Edição url menu - ${Math.random()}`,
            tel_id: null,
            tel_interna: true
        };
        request(app)
            .put(`${process.env.API_URL}/menu/${menuId}`)
            .set('authorization', `${token}`)
            .set('usuario', `${usuario}`)
            .send(editaMenus)
            .set('Content-Type', 'application/json')
            .expect(200)
            .end(function(err, _res) {
                if (err) {
                    return done(err);
                }
                return done();
            });
    });
    it('Menu - Apaga', function(done) {
        request(app)
            .delete(`${process.env.API_URL}/menu/${menuId}`)
            .set('authorization', `${token}`)
            .set('usuario', `${usuario}`)
            .set('Content-Type', 'application/json')
            .expect(200)
            .end(function(err, res) {
                menuId = res.body.men_id;
                if (err) {
                    return done(err);
                }
                return done();
            });
    });
    test('Geração do menu', async() => {
        const response = await request(app)
            .get(`${process.env.API_URL}/geraMenu/027`)
            .set('authorization', `${token}`);
        expect(response.statusCode).toBe(200);
    });
});
