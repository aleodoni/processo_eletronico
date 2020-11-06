/* eslint-disable func-names */
/* eslint-disable no-undef */
const request = require('supertest');
const app = require('../../src/app').default;
require('dotenv/config');
process.env.NODE_ENV = 'test';

// eslint-disable-next-line no-unused-vars
let token = '';
// eslint-disable-next-line no-unused-vars
let usuario = '';

let fluxo;

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

describe('Fluxos', () => {
    it('Deve retornar lista de fluxos', async() => {
        const response = await request(app)
            .get(`${process.env.API_URL}/fluxos`)
            .set('authorization', `${token}`);

        expect(response.status).toBe(200);

        expect(response.body).toEqual(
            expect.arrayContaining([{
                flu_id: 5,
                flu_nome: 'Abono de Permanência'
            }])
        );
    });

    it('Deve inserir um novo fluxo', async() => {
        const insereFluxos = {
            flu_id: null,
            flu_nome: `Inserção nome - ${Math.random()}`
        };

        const response = await request(app)
            .post(`${process.env.API_URL}/fluxos`)
            .set('authorization', `${token}`)
            .set('usuario', `${usuario}`)
            .send(insereFluxos);

        fluxo = response.body;

        expect(response.status).toBe(200);

        expect(response.body).toHaveProperty('flu_nome', insereFluxos.flu_nome);
    });

    it('Deve alterar um fluxo', async() => {
        const editaFluxos = {
            flu_nome: `Edição nome - ${Math.random()}`
        };

        const response = await request(app)
            .put(`${process.env.API_URL}/fluxos/${fluxo.flu_id}`)
            .set('authorization', `${token}`)
            .set('usuario', `${usuario}`)
            .send(editaFluxos);

        expect(response.status).toBe(200);

        expect(response.body).toHaveProperty('flu_nome', editaFluxos.flu_nome);
    });

    it('Deve deletar um fluxo', async() => {
        const response = await request(app)
            .delete(`${process.env.API_URL}/fluxos/${fluxo.flu_id}`)
            .set('authorization', `${token}`)
            .set('usuario', `${usuario}`);

        expect(response.status).toBe(200);
    });

    it('Não deve inserir um novo fluxo com o nome nulo', async() => {
        const insereFluxos = {
            flu_id: null,
            flu_nome: null
        };

        const response = await request(app)
            .post(`${process.env.API_URL}/fluxos`)
            .set('authorization', `${token}`)
            .set('usuario', `${usuario}`)
            .send(insereFluxos);

        expect(response.status).toBe(422);

        const errorParsed = JSON.parse(response.text);
        expect(errorParsed.message).toBe('Nome do fluxo obrigatório');
    });

    it('Não deve inserir um novo fluxo com o nome em branco', async() => {
        const insereFluxos = {
            flu_id: null,
            flu_nome: '   '
        };

        const response = await request(app)
            .post(`${process.env.API_URL}/fluxos`)
            .set('authorization', `${token}`)
            .set('usuario', `${usuario}`)
            .send(insereFluxos);

        expect(response.status).toBe(422);

        const errorParsed = JSON.parse(response.text);
        expect(errorParsed.message).toBe('Nome do fluxo obrigatório');
    });

    it('Não deve inserir um novo fluxo com o nome maior que 100 caracteres', async() => {
        const insereFluxos = {
            flu_id: null,
            flu_nome: '1'.repeat(101)
        };

        const response = await request(app)
            .post(`${process.env.API_URL}/fluxos`)
            .set('authorization', `${token}`)
            .set('usuario', `${usuario}`)
            .send(insereFluxos);

        expect(response.status).toBe(422);

        const errorParsed = JSON.parse(response.text);
        expect(errorParsed.message).toBe('Nome do fluxo não pode ter mais que 100 caracteres');
    });
});
