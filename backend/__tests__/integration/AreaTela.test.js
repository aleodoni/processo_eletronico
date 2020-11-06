/* eslint-disable func-names */
/* eslint-disable no-undef */
const request = require('supertest');
const app = require('../../src/app').default;
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
            login: process.env.USUARIO_TESTE
        })
        .end((_err, response) => {
            token = response.body.token;
            usuario = response.body.usuario;
            done();
        });
});

describe('Telas por área', () => {
    it('Deve retornar a lista de telas de uma área válida', async() => {
        const response = await request(app)
            .get(`${process.env.API_URL}/telas-por-area/027`)
            .set('authorization', `${token}`);

        expect(response.status).toBe(200);
        expect(response.body)
            .toEqual(expect.arrayContaining([
                expect.objectContaining({
                    set_id: 27,
                    tel_nome: 'Home'
                })
            ]));
    });

    it('Não deve retornar as telas de uma área inválida', async() => {
        const response = await request(app)
            .get(`${process.env.API_URL}/telas-por-area/099`)
            .set('authorization', `${token}`);

        const error = JSON.parse(response.error.text);

        expect(response.status).toBe(400);
        expect(error.message).toEqual('Telas da área não encontrada');
    });
});
