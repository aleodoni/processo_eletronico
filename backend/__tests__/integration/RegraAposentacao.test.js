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

let regraAposentacao;

beforeAll(done => {
    request(app)
        .post(`${process.env.API_URL}/autorizacao`)
        .send({
            senha: process.env.SENHA_TESTE,
            timeout: 1440,
            login: process.env.USUARIO_TESTE
        })
        .end((_err, response) => {
            console.log(response.body);
            token = response.body.token;
            usuario = response.body.usuario;
            done();
        });
});

describe('Regra Aposentação', () => {
    it('Deve retornar lista de regras', async() => {
        const response = await request(app)
            .get(`${process.env.API_URL}/regras-aposentacao`)
            .set('authorization', `${token}`);

        expect(response.status).toBe(200);

        expect(response.body).toEqual(
            expect.arrayContaining([{
                reg_id: 1,
                reg_nome: 'Regra 1'
            }])
        );
    });

    it('Deve inserir uma nova regra aposentação', async() => {
        const insereRegraAposentacao = {
            reg_id: null,
            reg_nome: `Inserção nome - ${Math.random()}`
        };

        const response = await request(app)
            .post(`${process.env.API_URL}/regras-aposentacao`)
            .set('authorization', `${token}`)
            .set('usuario', `${usuario}`)
            .send(insereRegraAposentacao);

        regraAposentacao = response.body;

        expect(response.status).toBe(200);

        expect(response.body).toHaveProperty('reg_nome', insereRegraAposentacao.reg_nome);
    });

    it('Deve alterar uma regra aposentação', async() => {
        const editaRegraAposentacao = {
            reg_nome: `Edição nome - ${Math.random()}`
        };

        const response = await request(app)
            .put(`${process.env.API_URL}/regras-aposentacao/${regraAposentacao.reg_id}`)
            .set('authorization', `${token}`)
            .set('usuario', `${usuario}`)
            .send(editaRegraAposentacao);

        expect(response.status).toBe(200);

        expect(response.body).toHaveProperty('reg_nome', editaRegraAposentacao.reg_nome);
    });

    it('Deve deletar uma regra aposentação', async() => {
        const response = await request(app)
            .delete(`${process.env.API_URL}/regras-aposentacao/${regraAposentacao.reg_id}`)
            .set('authorization', `${token}`)
            .set('usuario', `${usuario}`);

        expect(response.status).toBe(200);
    });

    it('Não deve inserir uma nova regra aposentação com o nome nulo', async() => {
        const insereRegraAposentacao = {
            reg_id: null,
            reg_nome: null
        };

        const response = await request(app)
            .post(`${process.env.API_URL}/regras-aposentacao`)
            .set('authorization', `${token}`)
            .set('usuario', `${usuario}`)
            .send(insereRegraAposentacao);

        expect(response.status).toBe(422);

        const errorParsed = JSON.parse(response.text);
        expect(errorParsed.message).toBe('Nome obrigatório');
    });

    it('Não deve inserir uma nova regra aposentação com o nome em branco', async() => {
        const insereRegraAposentacao = {
            reg_id: null,
            reg_nome: '   '
        };

        const response = await request(app)
            .post(`${process.env.API_URL}/regras-aposentacao`)
            .set('authorization', `${token}`)
            .set('usuario', `${usuario}`)
            .send(insereRegraAposentacao);

        expect(response.status).toBe(422);

        const errorParsed = JSON.parse(response.text);
        expect(errorParsed.message).toBe('Nome obrigatório');
    });

    it('Não deve inserir uma nova regra aposentação com o nome maior que 80 caracteres', async() => {
        const insereRegraAposentacao = {
            reg_id: null,
            reg_nome: '1'.repeat(81)
        };

        const response = await request(app)
            .post(`${process.env.API_URL}/regras-aposentacao`)
            .set('authorization', `${token}`)
            .set('usuario', `${usuario}`)
            .send(insereRegraAposentacao);

        expect(response.status).toBe(422);

        const errorParsed = JSON.parse(response.text);
        expect(errorParsed.message).toBe('Nome não pode ter mais que 80 caracteres');
    });
});
