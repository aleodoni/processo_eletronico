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

describe('Área de Menu', () => {
    it('dummy', () => {
        expect(true).toBe(true);
    });
    // it('Área de menu - Lista', function(done) {
    //     request(app)
    //         .get(`${process.env.API_URL}/area-menu`)
    //         .set('authorization', `${token}`)
    //         .expect(200)
    //         .end(function(err) {
    //             if (err) {
    //                 return done(err);
    //             }
    //             return done();
    //         });
    // });
    // it('Áreas do menu', function(done) {
    //     request(app)
    //         .get(`${process.env.API_URL}/areas-do-menu`)
    //         .set('authorization', `${token}`)
    //         .expect(200)
    //         .end(function(err) {
    //             if (err) {
    //                 return done(err);
    //             }
    //             return done();
    //         });
    // });
    // let areaMenuId = '';
    // it('Área de menu - Insere', function(done) {
    //     const insereAreaMenus = {
    //         amu_id: null,
    //         set_id: '027',
    //         mmu_id: 1
    //     };
    //     request(app)
    //         .post(`${process.env.API_URL}/area-menu`)
    //         .set('authorization', `${token}`)
    //         .set('usuario', `${usuario}`)
    //         .send(insereAreaMenus)
    //         .set('Content-Type', 'application/json')
    //         .expect(200)
    //         .end(function(err, res) {
    //             areaMenuId = res.body.amu_id;
    //             if (err) {
    //                 return done(err);
    //             }
    //             return done();
    //         });
    // });
    // it('Área de menu - Edita', function(done) {
    //     const editaAreaMenus = {
    //         set_id: '032',
    //         mmu_id: 2
    //     };
    //     request(app)
    //         .put(`${process.env.API_URL}/area-menu/${areaMenuId}`)
    //         .set('authorization', `${token}`)
    //         .set('usuario', `${usuario}`)
    //         .send(editaAreaMenus)
    //         .set('Content-Type', 'application/json')
    //         .expect(200)
    //         .end(function(err, res) {
    //             if (err) {
    //                 return done(err);
    //             }
    //             return done();
    //         });
    // });
    // it('Área de menu - Apaga', function(done) {
    //     request(app)
    //         .delete(`${process.env.API_URL}/area-menu/${areaMenuId}`)
    //         .set('authorization', `${token}`)
    //         .set('usuario', `${usuario}`)
    //         .set('Content-Type', 'application/json')
    //         .expect(200)
    //         .end(function(err, res) {
    //             areaMenuId = res.body.amu_id;
    //             if (err) {
    //                 return done(err);
    //             }
    //             return done();
    //         });
    // });
});
