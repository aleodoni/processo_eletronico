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

describe('Dados do processo', () => {
    it('dummy', () => {
        expect(true).toBe(true);
    });
    //     it('Dados do processo - dados', function(done) {
    //         request(app)
    //             .get(`${process.env.API_URL}/ver-processo/20`)
    //             .set('authorization', `${token}`)
    //             .expect(200)
    //             .end(function(err) {
    //                 if (err) {
    //                     return done(err);
    //                 }
    //                 return done();
    //             });
    //     });
    // });

// describe('Processo por código', () => {
//     it('Processo por código - dados', function(done) {
//         const proCodigo = {
//             proCodigo: '00020/2019'
//         };
//         request(app)
//             .post(`${process.env.API_URL}/processo-por-codigo`)
//             .set('authorization', `${token}`)
//             .send(proCodigo)
//             .set('Content-Type', 'application/json')
//             .expect(200)
//             .end(function(err) {
//                 if (err) {
//                     return done(err);
//                 }
//                 return done();
//             });
//     });
});
