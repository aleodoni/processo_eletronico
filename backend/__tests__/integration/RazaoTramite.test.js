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

let razaoTramite;

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

describe('Razão Trâmite', () => {
    it('Deve retornar lista de razões', async() => {
        const response = await request(app)
            .get(`${process.env.API_URL}/razao-tramite`)
            .set('authorization', `${token}`);

        expect(response.status).toBe(200);

        expect(response.body).toEqual(
            expect.arrayContaining([{
                raz_id: 82,
                raz_nome: 'Encaminhamento'
            }])
        );
    });

    it('Deve inserir uma nova razão trâmite', async() => {
        const insereRazaoTramite = {
            raz_id: null,
            raz_nome: `Inserção nome - ${Math.random()}`
        };

        const response = await request(app)
            .post(`${process.env.API_URL}/razao-tramite`)
            .set('authorization', `${token}`)
            .set('usuario', `${usuario}`)
            .send(insereRazaoTramite);

        razaoTramite = response.body;

        expect(response.status).toBe(200);

        expect(response.body).toHaveProperty('raz_nome', insereRazaoTramite.raz_nome);
    });

    it('Deve alterar uma razão trâmite', async() => {
        const editaRazaoTramite = {
            raz_nome: `Edição nome - ${Math.random()}`
        };

        const response = await request(app)
            .put(`${process.env.API_URL}/razao-tramite/${razaoTramite.raz_id}`)
            .set('authorization', `${token}`)
            .set('usuario', `${usuario}`)
            .send(editaRazaoTramite);

        expect(response.status).toBe(200);

        expect(response.body).toHaveProperty('raz_nome', editaRazaoTramite.raz_nome);
    });

    it('Deve deletar uma razão trâmite', async() => {
        const response = await request(app)
            .delete(`${process.env.API_URL}/razao-tramite/${razaoTramite.raz_id}`)
            .set('authorization', `${token}`)
            .set('usuario', `${usuario}`);

        expect(response.status).toBe(200);
    });

    it('Não deve inserir uma nova razão trâmite com o nome nulo', async() => {
        const insereRazaoTramite = {
            raz_id: null,
            raz_nome: null
        };

        const response = await request(app)
            .post(`${process.env.API_URL}/razao-tramite`)
            .set('authorization', `${token}`)
            .set('usuario', `${usuario}`)
            .send(insereRazaoTramite);

        expect(response.status).toBe(422);

        const errorParsed = JSON.parse(response.text);
        expect(errorParsed.message).toBe('Nome obrigatório');
    });

    it('Não deve inserir uma nova razão trâmite com o nome em branco', async() => {
        const insereRazaoTramite = {
            raz_id: null,
            raz_nome: '   '
        };

        const response = await request(app)
            .post(`${process.env.API_URL}/razao-tramite`)
            .set('authorization', `${token}`)
            .set('usuario', `${usuario}`)
            .send(insereRazaoTramite);

        expect(response.status).toBe(422);

        const errorParsed = JSON.parse(response.text);
        expect(errorParsed.message).toBe('Nome obrigatório');
    });

    it('Não deve inserir uma nova razão trâmite com o nome maior que 100 caracteres', async() => {
        const insereRazaoTramite = {
            raz_id: null,
            raz_nome: '1'.repeat(101)
        };

        const response = await request(app)
            .post(`${process.env.API_URL}/razao-tramite`)
            .set('authorization', `${token}`)
            .set('usuario', `${usuario}`)
            .send(insereRazaoTramite);

        expect(response.status).toBe(422);

        const errorParsed = JSON.parse(response.text);
        expect(errorParsed.message).toBe('Nome não pode ter mais que 100 caracteres');
    });
});
