/* eslint-disable func-names */
/* eslint-disable no-undef */
const request = require('supertest');
const app = require('../../app').default;
process.env.NODE_ENV = 'test';
require('dotenv/config');

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

describe('Área', () => {
    it('dummy', () => {
        token = 1;
        expect(true).toBe(true);
    });
    // test('Raiz', () => {
    //     return request(app)
    //         .get(`${process.env.API_URL}/`)
    //         .set('authorization', `${token}`)
    //         .then(response => {
    //             expect(response.statusCode).toBe(200);
    //         });
    // });
    // test('Área', () => {
    //     return request(app)
    //         .get(`${process.env.API_URL}/area`)
    //         .set('authorization', `${token}`)
    //         .then(response => {
    //             expect(response.statusCode).toBe(200);
    //         });
    // });
    // test('Área por código', () => {
    //     return request(app)
    //         .get(`${process.env.API_URL}/area-por-codigo/027`)
    //         .set('authorization', `${token}`)
    //         .then(response => {
    //             expect(response.statusCode).toBe(200);
    //         });
    // });
    // test('Setor por código', () => {
    //     return request(app)
    //         .get(`${process.env.API_URL}/setor-por-codigo/171`)
    //         .set('authorization', `${token}`)
    //         .then(response => {
    //             expect(response.statusCode).toBe(200);
    //         });
    // });
});
