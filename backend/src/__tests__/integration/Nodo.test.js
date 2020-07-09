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
// eslint-disable-next-line no-unused-vars
let nodo;

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

describe('Nodos', () => {
    it('Deve retornar lista de nodos', async() => {
        const response = await request(app)
            .get(`${process.env.API_URL}/nodos`)
            .set('authorization', `${token}`);

        console.log(response.error);

        expect(response.status).toBe(200);

        expect(response.body).toEqual(
            expect.arrayContaining([
                expect.objectContaining({
                    area_id: '556',
                    flu_id: 10
                })
            ])
        );
    });

    it('Deve inserir um novo nodo', async() => {
        const novoNodo = {
            nod_id: null,
            nod_inicio: true,
            flu_id: 10,
            area_id: '556',
            nod_fim: false,
            nod_dias_prazo: 15,
            nod_ordem: 10,
            nod_aval_executiva: false,
            nod_decisao: false,
            nod_interessado: false,
            nod_ciencia: false,
            nod_averbacao: false,
            nod_ciencia_averbacao: false,
            nod_aval_horario: false,
            nod_contagem_tempo: false,
            nod_ciencia_calculo: false
        };

        const response = await request(app)
            .post(`${process.env.API_URL}/nodos`)
            .set('authorization', `${token}`)
            .set('usuario', `${usuario}`)
            .send(novoNodo);

        nodo = response.body;

        expect(response.status).toBe(200);

        expect(response.body).toHaveProperty('nod_inicio', novoNodo.nod_inicio);
    });

    it('Deve alterar um nodo', async() => {
        const editaNodo = {
            nod_inicio: false,
            flu_id: 10,
            area_id: '556',
            nod_fim: false,
            nod_dias_prazo: 15,
            nod_ordem: 10,
            nod_aval_executiva: false,
            nod_decisao: false,
            nod_interessado: false,
            nod_ciencia: false,
            nod_averbacao: false,
            nod_ciencia_averbacao: false,
            nod_aval_horario: false,
            nod_contagem_tempo: false,
            nod_ciencia_calculo: false
        };

        const response = await request(app)
            .put(`${process.env.API_URL}/nodos/${nodo.nod_id}`)
            .set('authorization', `${token}`)
            .set('usuario', `${usuario}`)
            .send(editaNodo);

        expect(response.status).toBe(200);

        expect(response.body).toHaveProperty('nod_inicio', editaNodo.nod_inicio);
    });

    it('Deve deletar um nodo', async() => {
        const response = await request(app)
            .delete(`${process.env.API_URL}/nodos/${nodo.nod_id}`)
            .set('authorization', `${token}`)
            .set('usuario', `${usuario}`);

        expect(response.status).toBe(200);
    });

    it('Não deve alterar um nodo com nod_inicio nulo', async() => {
        const editaNodo = {
            nod_inicio: null,
            flu_id: 10,
            area_id: '556',
            nod_fim: false,
            nod_dias_prazo: 15,
            nod_ordem: 10,
            nod_aval_executiva: false,
            nod_decisao: false,
            nod_interessado: false,
            nod_ciencia: false,
            nod_averbacao: false,
            nod_ciencia_averbacao: false,
            nod_aval_horario: false,
            nod_contagem_tempo: false,
            nod_ciencia_calculo: false
        };

        const response = await request(app)
            .put(`${process.env.API_URL}/nodos/${nodo.nod_id}`)
            .set('authorization', `${token}`)
            .set('usuario', `${usuario}`)
            .send(editaNodo);

        expect(response.status).toBe(422);

        const errorParsed = JSON.parse(response.text);
        expect(errorParsed.message).toBe('Início obrigatório');
    });

    it('Não deve alterar um nodo com flu_id nulo', async() => {
        const editaNodo = {
            nod_inicio: false,
            flu_id: null,
            area_id: '556',
            nod_fim: false,
            nod_dias_prazo: 15,
            nod_ordem: 10,
            nod_aval_executiva: false,
            nod_decisao: false,
            nod_interessado: false,
            nod_ciencia: false,
            nod_averbacao: false,
            nod_ciencia_averbacao: false,
            nod_aval_horario: false,
            nod_contagem_tempo: false,
            nod_ciencia_calculo: false
        };

        const response = await request(app)
            .put(`${process.env.API_URL}/nodos/${nodo.nod_id}`)
            .set('authorization', `${token}`)
            .set('usuario', `${usuario}`)
            .send(editaNodo);

        expect(response.status).toBe(422);

        const errorParsed = JSON.parse(response.text);
        expect(errorParsed.message).toBe('Fluxo obrigatório');
    });

    it('Não deve alterar um nodo com area_id nulo', async() => {
        const editaNodo = {
            nod_inicio: false,
            flu_id: 10,
            area_id: null,
            nod_fim: false,
            nod_dias_prazo: 15,
            nod_ordem: 10,
            nod_aval_executiva: false,
            nod_decisao: false,
            nod_interessado: false,
            nod_ciencia: false,
            nod_averbacao: false,
            nod_ciencia_averbacao: false,
            nod_aval_horario: false,
            nod_contagem_tempo: false,
            nod_ciencia_calculo: false
        };

        const response = await request(app)
            .put(`${process.env.API_URL}/nodos/${nodo.nod_id}`)
            .set('authorization', `${token}`)
            .set('usuario', `${usuario}`)
            .send(editaNodo);

        expect(response.status).toBe(422);

        const errorParsed = JSON.parse(response.text);
        expect(errorParsed.message).toBe('Área obrigatória');
    });

    it('Não deve alterar um nodo com nod_fim nulo', async() => {
        const editaNodo = {
            nod_inicio: false,
            flu_id: 10,
            area_id: '556',
            nod_fim: null,
            nod_dias_prazo: 15,
            nod_ordem: 10,
            nod_aval_executiva: false,
            nod_decisao: false,
            nod_interessado: false,
            nod_ciencia: false,
            nod_averbacao: false,
            nod_ciencia_averbacao: false,
            nod_aval_horario: false,
            nod_contagem_tempo: false,
            nod_ciencia_calculo: false
        };

        const response = await request(app)
            .put(`${process.env.API_URL}/nodos/${nodo.nod_id}`)
            .set('authorization', `${token}`)
            .set('usuario', `${usuario}`)
            .send(editaNodo);

        expect(response.status).toBe(422);

        const errorParsed = JSON.parse(response.text);
        expect(errorParsed.message).toBe('Fim nodo obrigatório');
    });

    it('Não deve alterar um nodo com nod_dias_prazo nulo', async() => {
        const editaNodo = {
            nod_inicio: false,
            flu_id: 10,
            area_id: '556',
            nod_fim: false,
            nod_dias_prazo: null,
            nod_ordem: 10,
            nod_aval_executiva: false,
            nod_decisao: false,
            nod_interessado: false,
            nod_ciencia: false,
            nod_averbacao: false,
            nod_ciencia_averbacao: false,
            nod_aval_horario: false,
            nod_contagem_tempo: false,
            nod_ciencia_calculo: false
        };

        const response = await request(app)
            .put(`${process.env.API_URL}/nodos/${nodo.nod_id}`)
            .set('authorization', `${token}`)
            .set('usuario', `${usuario}`)
            .send(editaNodo);

        expect(response.status).toBe(422);

        const errorParsed = JSON.parse(response.text);
        expect(errorParsed.message).toBe('Dias prazo obrigatório');
    });

    it('Não deve alterar um nodo com ordem nulo', async() => {
        const editaNodo = {
            nod_inicio: false,
            flu_id: 10,
            area_id: '556',
            nod_fim: false,
            nod_dias_prazo: 10,
            nod_ordem: null,
            nod_aval_executiva: false,
            nod_decisao: false,
            nod_interessado: false,
            nod_ciencia: false,
            nod_averbacao: false,
            nod_ciencia_averbacao: false,
            nod_aval_horario: false,
            nod_contagem_tempo: false,
            nod_ciencia_calculo: false
        };

        const response = await request(app)
            .put(`${process.env.API_URL}/nodos/${nodo.nod_id}`)
            .set('authorization', `${token}`)
            .set('usuario', `${usuario}`)
            .send(editaNodo);

        expect(response.status).toBe(422);

        const errorParsed = JSON.parse(response.text);
        expect(errorParsed.message).toBe('Ordem obrigatória');
    });

    it('Não deve alterar um nodo com nod_aval_executiva nulo', async() => {
        const editaNodo = {
            nod_inicio: false,
            flu_id: 10,
            area_id: '556',
            nod_fim: false,
            nod_dias_prazo: 10,
            nod_ordem: 0,
            nod_aval_executiva: null,
            nod_decisao: false,
            nod_interessado: false,
            nod_ciencia: false,
            nod_averbacao: false,
            nod_ciencia_averbacao: false,
            nod_aval_horario: false,
            nod_contagem_tempo: false,
            nod_ciencia_calculo: false
        };

        const response = await request(app)
            .put(`${process.env.API_URL}/nodos/${nodo.nod_id}`)
            .set('authorization', `${token}`)
            .set('usuario', `${usuario}`)
            .send(editaNodo);

        expect(response.status).toBe(422);

        const errorParsed = JSON.parse(response.text);
        expect(errorParsed.message).toBe('Aval executiva obrigatória');
    });

    it('Não deve alterar um nodo com decisão nulo', async() => {
        const editaNodo = {
            nod_inicio: false,
            flu_id: 10,
            area_id: '556',
            nod_fim: false,
            nod_dias_prazo: 10,
            nod_ordem: 0,
            nod_aval_executiva: false,
            nod_decisao: null,
            nod_interessado: false,
            nod_ciencia: false,
            nod_averbacao: false,
            nod_ciencia_averbacao: false,
            nod_aval_horario: false,
            nod_contagem_tempo: false,
            nod_ciencia_calculo: false
        };

        const response = await request(app)
            .put(`${process.env.API_URL}/nodos/${nodo.nod_id}`)
            .set('authorization', `${token}`)
            .set('usuario', `${usuario}`)
            .send(editaNodo);

        expect(response.status).toBe(422);

        const errorParsed = JSON.parse(response.text);
        expect(errorParsed.message).toBe('Decisão obrigatório');
    });

    it('Não deve alterar um nodo com interessado nulo', async() => {
        const editaNodo = {
            nod_inicio: false,
            flu_id: 10,
            area_id: '556',
            nod_fim: false,
            nod_dias_prazo: 10,
            nod_ordem: 0,
            nod_aval_executiva: false,
            nod_decisao: false,
            nod_interessado: null,
            nod_ciencia: false,
            nod_averbacao: false,
            nod_ciencia_averbacao: false,
            nod_aval_horario: false,
            nod_contagem_tempo: false,
            nod_ciencia_calculo: false
        };

        const response = await request(app)
            .put(`${process.env.API_URL}/nodos/${nodo.nod_id}`)
            .set('authorization', `${token}`)
            .set('usuario', `${usuario}`)
            .send(editaNodo);

        expect(response.status).toBe(422);

        const errorParsed = JSON.parse(response.text);
        expect(errorParsed.message).toBe('Interessado obrigatório');
    });

    it('Não deve alterar um nodo com ciencia nulo', async() => {
        const editaNodo = {
            nod_inicio: false,
            flu_id: 10,
            area_id: '556',
            nod_fim: false,
            nod_dias_prazo: 10,
            nod_ordem: 0,
            nod_aval_executiva: false,
            nod_decisao: false,
            nod_interessado: false,
            nod_ciencia: null,
            nod_averbacao: false,
            nod_ciencia_averbacao: false,
            nod_aval_horario: false,
            nod_contagem_tempo: false,
            nod_ciencia_calculo: false
        };

        const response = await request(app)
            .put(`${process.env.API_URL}/nodos/${nodo.nod_id}`)
            .set('authorization', `${token}`)
            .set('usuario', `${usuario}`)
            .send(editaNodo);

        expect(response.status).toBe(422);

        const errorParsed = JSON.parse(response.text);
        expect(errorParsed.message).toBe('Ciência obrigatório');
    });

    it('Não deve alterar um nodo com avercação nulo', async() => {
        const editaNodo = {
            nod_inicio: false,
            flu_id: 10,
            area_id: '556',
            nod_fim: false,
            nod_dias_prazo: 10,
            nod_ordem: 0,
            nod_aval_executiva: false,
            nod_decisao: false,
            nod_interessado: false,
            nod_ciencia: false,
            nod_averbacao: null,
            nod_ciencia_averbacao: false,
            nod_aval_horario: false,
            nod_contagem_tempo: false,
            nod_ciencia_calculo: false
        };

        const response = await request(app)
            .put(`${process.env.API_URL}/nodos/${nodo.nod_id}`)
            .set('authorization', `${token}`)
            .set('usuario', `${usuario}`)
            .send(editaNodo);

        expect(response.status).toBe(422);

        const errorParsed = JSON.parse(response.text);
        expect(errorParsed.message).toBe('Averbação obrigatório');
    });

    it('Não deve alterar um nodo com ciência avercação nulo', async() => {
        const editaNodo = {
            nod_inicio: false,
            flu_id: 10,
            area_id: '556',
            nod_fim: false,
            nod_dias_prazo: 10,
            nod_ordem: 0,
            nod_aval_executiva: false,
            nod_decisao: false,
            nod_interessado: false,
            nod_ciencia: false,
            nod_averbacao: false,
            nod_ciencia_averbacao: null,
            nod_aval_horario: false,
            nod_contagem_tempo: false,
            nod_ciencia_calculo: false
        };

        const response = await request(app)
            .put(`${process.env.API_URL}/nodos/${nodo.nod_id}`)
            .set('authorization', `${token}`)
            .set('usuario', `${usuario}`)
            .send(editaNodo);

        expect(response.status).toBe(422);

        const errorParsed = JSON.parse(response.text);
        expect(errorParsed.message).toBe('Ciência averbação obrigatório');
    });

    it('Não deve alterar um nodo com aval horário nulo', async() => {
        const editaNodo = {
            nod_inicio: false,
            flu_id: 10,
            area_id: '556',
            nod_fim: false,
            nod_dias_prazo: 10,
            nod_ordem: 0,
            nod_aval_executiva: false,
            nod_decisao: false,
            nod_interessado: false,
            nod_ciencia: false,
            nod_averbacao: false,
            nod_ciencia_averbacao: false,
            nod_aval_horario: null,
            nod_contagem_tempo: false,
            nod_ciencia_calculo: false
        };

        const response = await request(app)
            .put(`${process.env.API_URL}/nodos/${nodo.nod_id}`)
            .set('authorization', `${token}`)
            .set('usuario', `${usuario}`)
            .send(editaNodo);

        expect(response.status).toBe(422);

        const errorParsed = JSON.parse(response.text);
        expect(errorParsed.message).toBe('Aval horário obrigatório');
    });

    it('Não deve alterar um nodo com contagem tempo nulo', async() => {
        const editaNodo = {
            nod_inicio: false,
            flu_id: 10,
            area_id: '556',
            nod_fim: false,
            nod_dias_prazo: 10,
            nod_ordem: 0,
            nod_aval_executiva: false,
            nod_decisao: false,
            nod_interessado: false,
            nod_ciencia: false,
            nod_averbacao: false,
            nod_ciencia_averbacao: false,
            nod_aval_horario: false,
            nod_contagem_tempo: null,
            nod_ciencia_calculo: false
        };

        const response = await request(app)
            .put(`${process.env.API_URL}/nodos/${nodo.nod_id}`)
            .set('authorization', `${token}`)
            .set('usuario', `${usuario}`)
            .send(editaNodo);

        expect(response.status).toBe(422);

        const errorParsed = JSON.parse(response.text);
        expect(errorParsed.message).toBe('Contagem tempo obrigatório');
    });

    it('Não deve alterar um nodo com contagem tempo nulo', async() => {
        const editaNodo = {
            nod_inicio: false,
            flu_id: 10,
            area_id: '556',
            nod_fim: false,
            nod_dias_prazo: 10,
            nod_ordem: 0,
            nod_aval_executiva: false,
            nod_decisao: false,
            nod_interessado: false,
            nod_ciencia: false,
            nod_averbacao: false,
            nod_ciencia_averbacao: false,
            nod_aval_horario: false,
            nod_contagem_tempo: false,
            nod_ciencia_calculo: null
        };

        const response = await request(app)
            .put(`${process.env.API_URL}/nodos/${nodo.nod_id}`)
            .set('authorization', `${token}`)
            .set('usuario', `${usuario}`)
            .send(editaNodo);

        expect(response.status).toBe(422);

        const errorParsed = JSON.parse(response.text);
        expect(errorParsed.message).toBe('Ciência cálculo obrigatório');
    });

    it('Não deve incluir um nodo com nod_inicio nulo', async() => {
        const editaNodo = {
            nod_id: null,
            nod_inicio: null,
            flu_id: 10,
            area_id: '556',
            nod_fim: false,
            nod_dias_prazo: 15,
            nod_ordem: 10,
            nod_aval_executiva: false,
            nod_decisao: false,
            nod_interessado: false,
            nod_ciencia: false,
            nod_averbacao: false,
            nod_ciencia_averbacao: false,
            nod_aval_horario: false,
            nod_contagem_tempo: false,
            nod_ciencia_calculo: false
        };

        const response = await request(app)
            .post(`${process.env.API_URL}/nodos`)
            .set('authorization', `${token}`)
            .set('usuario', `${usuario}`)
            .send(editaNodo);

        expect(response.status).toBe(422);

        const errorParsed = JSON.parse(response.text);
        expect(errorParsed.message).toBe('Início obrigatório');
    });

    it('Não deve incluir um nodo com flu_id nulo', async() => {
        const editaNodo = {
            nod_id: null,
            nod_inicio: false,
            flu_id: null,
            area_id: '556',
            nod_fim: false,
            nod_dias_prazo: 15,
            nod_ordem: 10,
            nod_aval_executiva: false,
            nod_decisao: false,
            nod_interessado: false,
            nod_ciencia: false,
            nod_averbacao: false,
            nod_ciencia_averbacao: false,
            nod_aval_horario: false,
            nod_contagem_tempo: false,
            nod_ciencia_calculo: false
        };

        const response = await request(app)
            .post(`${process.env.API_URL}/nodos`)
            .set('authorization', `${token}`)
            .set('usuario', `${usuario}`)
            .send(editaNodo);

        expect(response.status).toBe(422);

        const errorParsed = JSON.parse(response.text);
        expect(errorParsed.message).toBe('Fluxo obrigatório');
    });

    it('Não deve incluir um nodo com area_id nulo', async() => {
        const editaNodo = {
            nod_id: null,
            nod_inicio: false,
            flu_id: 10,
            area_id: null,
            nod_fim: false,
            nod_dias_prazo: 15,
            nod_ordem: 10,
            nod_aval_executiva: false,
            nod_decisao: false,
            nod_interessado: false,
            nod_ciencia: false,
            nod_averbacao: false,
            nod_ciencia_averbacao: false,
            nod_aval_horario: false,
            nod_contagem_tempo: false,
            nod_ciencia_calculo: false
        };

        const response = await request(app)
            .post(`${process.env.API_URL}/nodos/`)
            .set('authorization', `${token}`)
            .set('usuario', `${usuario}`)
            .send(editaNodo);

        expect(response.status).toBe(422);

        const errorParsed = JSON.parse(response.text);
        expect(errorParsed.message).toBe('Área obrigatória');
    });

    it('Não deve incluir um nodo com nod_fim nulo', async() => {
        const editaNodo = {
            nod_id: null,
            nod_inicio: false,
            flu_id: 10,
            area_id: '556',
            nod_fim: null,
            nod_dias_prazo: 15,
            nod_ordem: 10,
            nod_aval_executiva: false,
            nod_decisao: false,
            nod_interessado: false,
            nod_ciencia: false,
            nod_averbacao: false,
            nod_ciencia_averbacao: false,
            nod_aval_horario: false,
            nod_contagem_tempo: false,
            nod_ciencia_calculo: false
        };

        const response = await request(app)
            .post(`${process.env.API_URL}/nodos/`)
            .set('authorization', `${token}`)
            .set('usuario', `${usuario}`)
            .send(editaNodo);

        expect(response.status).toBe(422);

        const errorParsed = JSON.parse(response.text);
        expect(errorParsed.message).toBe('Fim nodo obrigatório');
    });

    it('Não deve incluir um nodo com nod_dias_prazo nulo', async() => {
        const editaNodo = {
            nod_id: null,
            nod_inicio: false,
            flu_id: 10,
            area_id: '556',
            nod_fim: false,
            nod_dias_prazo: null,
            nod_ordem: 10,
            nod_aval_executiva: false,
            nod_decisao: false,
            nod_interessado: false,
            nod_ciencia: false,
            nod_averbacao: false,
            nod_ciencia_averbacao: false,
            nod_aval_horario: false,
            nod_contagem_tempo: false,
            nod_ciencia_calculo: false
        };

        const response = await request(app)
            .post(`${process.env.API_URL}/nodos/`)
            .set('authorization', `${token}`)
            .set('usuario', `${usuario}`)
            .send(editaNodo);

        expect(response.status).toBe(422);

        const errorParsed = JSON.parse(response.text);
        expect(errorParsed.message).toBe('Dias prazo obrigatório');
    });

    it('Não deve incluir um nodo com ordem nulo', async() => {
        const editaNodo = {
            nod_id: null,
            nod_inicio: false,
            flu_id: 10,
            area_id: '556',
            nod_fim: false,
            nod_dias_prazo: 10,
            nod_ordem: null,
            nod_aval_executiva: false,
            nod_decisao: false,
            nod_interessado: false,
            nod_ciencia: false,
            nod_averbacao: false,
            nod_ciencia_averbacao: false,
            nod_aval_horario: false,
            nod_contagem_tempo: false,
            nod_ciencia_calculo: false
        };

        const response = await request(app)
            .post(`${process.env.API_URL}/nodos`)
            .set('authorization', `${token}`)
            .set('usuario', `${usuario}`)
            .send(editaNodo);

        expect(response.status).toBe(422);

        const errorParsed = JSON.parse(response.text);
        expect(errorParsed.message).toBe('Ordem obrigatória');
    });

    it('Não deve incluir um nodo com nod_aval_executiva nulo', async() => {
        const editaNodo = {
            nod_id: null,
            nod_inicio: false,
            flu_id: 10,
            area_id: '556',
            nod_fim: false,
            nod_dias_prazo: 10,
            nod_ordem: 0,
            nod_aval_executiva: null,
            nod_decisao: false,
            nod_interessado: false,
            nod_ciencia: false,
            nod_averbacao: false,
            nod_ciencia_averbacao: false,
            nod_aval_horario: false,
            nod_contagem_tempo: false,
            nod_ciencia_calculo: false
        };

        const response = await request(app)
            .post(`${process.env.API_URL}/nodos`)
            .set('authorization', `${token}`)
            .set('usuario', `${usuario}`)
            .send(editaNodo);

        expect(response.status).toBe(422);

        const errorParsed = JSON.parse(response.text);
        expect(errorParsed.message).toBe('Aval executiva obrigatória');
    });

    it('Não deve incluir um nodo com decisão nulo', async() => {
        const editaNodo = {
            nod_id: null,
            nod_inicio: false,
            flu_id: 10,
            area_id: '556',
            nod_fim: false,
            nod_dias_prazo: 10,
            nod_ordem: 0,
            nod_aval_executiva: false,
            nod_decisao: null,
            nod_interessado: false,
            nod_ciencia: false,
            nod_averbacao: false,
            nod_ciencia_averbacao: false,
            nod_aval_horario: false,
            nod_contagem_tempo: false,
            nod_ciencia_calculo: false
        };

        const response = await request(app)
            .post(`${process.env.API_URL}/nodos`)
            .set('authorization', `${token}`)
            .set('usuario', `${usuario}`)
            .send(editaNodo);

        expect(response.status).toBe(422);

        const errorParsed = JSON.parse(response.text);
        expect(errorParsed.message).toBe('Decisão obrigatório');
    });

    it('Não deve incluir um nodo com interessado nulo', async() => {
        const editaNodo = {
            nod_id: null,
            nod_inicio: false,
            flu_id: 10,
            area_id: '556',
            nod_fim: false,
            nod_dias_prazo: 10,
            nod_ordem: 0,
            nod_aval_executiva: false,
            nod_decisao: false,
            nod_interessado: null,
            nod_ciencia: false,
            nod_averbacao: false,
            nod_ciencia_averbacao: false,
            nod_aval_horario: false,
            nod_contagem_tempo: false,
            nod_ciencia_calculo: false
        };

        const response = await request(app)
            .post(`${process.env.API_URL}/nodos`)
            .set('authorization', `${token}`)
            .set('usuario', `${usuario}`)
            .send(editaNodo);

        expect(response.status).toBe(422);

        const errorParsed = JSON.parse(response.text);
        expect(errorParsed.message).toBe('Interessado obrigatório');
    });

    it('Não deve incluir um nodo com ciencia nulo', async() => {
        const editaNodo = {
            nod_id: null,
            nod_inicio: false,
            flu_id: 10,
            area_id: '556',
            nod_fim: false,
            nod_dias_prazo: 10,
            nod_ordem: 0,
            nod_aval_executiva: false,
            nod_decisao: false,
            nod_interessado: false,
            nod_ciencia: null,
            nod_averbacao: false,
            nod_ciencia_averbacao: false,
            nod_aval_horario: false,
            nod_contagem_tempo: false,
            nod_ciencia_calculo: false
        };

        const response = await request(app)
            .post(`${process.env.API_URL}/nodos`)
            .set('authorization', `${token}`)
            .set('usuario', `${usuario}`)
            .send(editaNodo);

        expect(response.status).toBe(422);

        const errorParsed = JSON.parse(response.text);
        expect(errorParsed.message).toBe('Ciência obrigatório');
    });

    it('Não deve incluir um nodo com avercação nulo', async() => {
        const editaNodo = {
            nod_id: null,
            nod_inicio: false,
            flu_id: 10,
            area_id: '556',
            nod_fim: false,
            nod_dias_prazo: 10,
            nod_ordem: 0,
            nod_aval_executiva: false,
            nod_decisao: false,
            nod_interessado: false,
            nod_ciencia: false,
            nod_averbacao: null,
            nod_ciencia_averbacao: false,
            nod_aval_horario: false,
            nod_contagem_tempo: false,
            nod_ciencia_calculo: false
        };

        const response = await request(app)
            .post(`${process.env.API_URL}/nodos`)
            .set('authorization', `${token}`)
            .set('usuario', `${usuario}`)
            .send(editaNodo);

        expect(response.status).toBe(422);

        const errorParsed = JSON.parse(response.text);
        expect(errorParsed.message).toBe('Averbação obrigatório');
    });

    it('Não deve incluir um nodo com ciência avercação nulo', async() => {
        const editaNodo = {
            nod_id: null,
            nod_inicio: false,
            flu_id: 10,
            area_id: '556',
            nod_fim: false,
            nod_dias_prazo: 10,
            nod_ordem: 0,
            nod_aval_executiva: false,
            nod_decisao: false,
            nod_interessado: false,
            nod_ciencia: false,
            nod_averbacao: false,
            nod_ciencia_averbacao: null,
            nod_aval_horario: false,
            nod_contagem_tempo: false,
            nod_ciencia_calculo: false
        };

        const response = await request(app)
            .post(`${process.env.API_URL}/nodos`)
            .set('authorization', `${token}`)
            .set('usuario', `${usuario}`)
            .send(editaNodo);

        expect(response.status).toBe(422);

        const errorParsed = JSON.parse(response.text);
        expect(errorParsed.message).toBe('Ciência averbação obrigatório');
    });

    it('Não deve incluir um nodo com aval horário nulo', async() => {
        const editaNodo = {
            nod_id: null,
            nod_inicio: false,
            flu_id: 10,
            area_id: '556',
            nod_fim: false,
            nod_dias_prazo: 10,
            nod_ordem: 0,
            nod_aval_executiva: false,
            nod_decisao: false,
            nod_interessado: false,
            nod_ciencia: false,
            nod_averbacao: false,
            nod_ciencia_averbacao: false,
            nod_aval_horario: null,
            nod_contagem_tempo: false,
            nod_ciencia_calculo: false
        };

        const response = await request(app)
            .post(`${process.env.API_URL}/nodos`)
            .set('authorization', `${token}`)
            .set('usuario', `${usuario}`)
            .send(editaNodo);

        expect(response.status).toBe(422);

        const errorParsed = JSON.parse(response.text);
        expect(errorParsed.message).toBe('Aval horário obrigatório');
    });

    it('Não deve incluir um nodo com contagem tempo nulo', async() => {
        const editaNodo = {
            nod_id: null,
            nod_inicio: false,
            flu_id: 10,
            area_id: '556',
            nod_fim: false,
            nod_dias_prazo: 10,
            nod_ordem: 0,
            nod_aval_executiva: false,
            nod_decisao: false,
            nod_interessado: false,
            nod_ciencia: false,
            nod_averbacao: false,
            nod_ciencia_averbacao: false,
            nod_aval_horario: false,
            nod_contagem_tempo: null,
            nod_ciencia_calculo: false
        };

        const response = await request(app)
            .post(`${process.env.API_URL}/nodos`)
            .set('authorization', `${token}`)
            .set('usuario', `${usuario}`)
            .send(editaNodo);

        expect(response.status).toBe(422);

        const errorParsed = JSON.parse(response.text);
        expect(errorParsed.message).toBe('Contagem tempo obrigatório');
    });

    it('Não deve incluir um nodo com contagem tempo nulo', async() => {
        const editaNodo = {
            nod_id: null,
            nod_inicio: false,
            flu_id: 10,
            area_id: '556',
            nod_fim: false,
            nod_dias_prazo: 10,
            nod_ordem: 0,
            nod_aval_executiva: false,
            nod_decisao: false,
            nod_interessado: false,
            nod_ciencia: false,
            nod_averbacao: false,
            nod_ciencia_averbacao: false,
            nod_aval_horario: false,
            nod_contagem_tempo: false,
            nod_ciencia_calculo: null
        };

        const response = await request(app)
            .post(`${process.env.API_URL}/nodos`)
            .set('authorization', `${token}`)
            .set('usuario', `${usuario}`)
            .send(editaNodo);

        expect(response.status).toBe(422);

        const errorParsed = JSON.parse(response.text);
        expect(errorParsed.message).toBe('Ciência cálculo obrigatório');
    });
});
