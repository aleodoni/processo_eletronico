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
    it('Deve retornar a lista de áreas', async() => {
        const response = await request(app)
            .get(`${process.env.API_URL}/area`)
            .set('authorization', `${token}`);

        expect(response.status).toBe(200);
        expect(response.body)
            .toEqual(expect.arrayContaining([
                expect.objectContaining({
                    set_id: 27,
                    set_nome: 'Diretoria De Informática'
                })
            ]));
    });

    it('Deve retornar uma área por código', async() => {
        const response = await request(app)
            .get(`${process.env.API_URL}/area-por-codigo/027`)
            .set('authorization', `${token}`);

        expect(response.status).toBe(200);

        expect(response.body)
            .toEqual(
                expect.objectContaining({
                    set_id: 27,
                    set_nome: 'Diretoria De Informática'
                })
            );
    });

    it('Não deve retornar uma área com código inválido', async() => {
        const response = await request(app)
            .get(`${process.env.API_URL}/area-por-codigo/010`)
            .set('authorization', `${token}`);

        const error = JSON.parse(response.error.text);

        expect(response.status).toBe(400);
        expect(error.message).toEqual('Área não encontrada');
    });

    it('Deve retornar um setor por código', async() => {
        const response = await request(app)
            .get(`${process.env.API_URL}/setor-por-codigo/171`)
            .set('authorization', `${token}`);

        expect(response.status).toBe(200);

        expect(response.body)
            .toEqual(
                expect.objectContaining({
                    set_id: 171,
                    set_nome: 'Divisão De Desenvolvimento De Sistemas'
                })
            );
    });

    it('Não deve retornar um setor com código inválido', async() => {
        const response = await request(app)
            .get(`${process.env.API_URL}/setor-por-codigo/111`)
            .set('authorization', `${token}`);

        const error = JSON.parse(response.error.text);

        expect(response.status).toBe(400);
        expect(error.message).toEqual('Setor não encontrado');
    });
});
