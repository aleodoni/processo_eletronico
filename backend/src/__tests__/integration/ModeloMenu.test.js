/* eslint-disable func-names */
/* eslint-disable no-undef */
const request = require('supertest');
const app = require('../../app').default;
require('dotenv/config');
process.env.NODE_ENV = 'test';

// eslint-disable-next-line no-unused-vars
let token = '';
// eslint-disable-next-line no-unused-vars
let usuario = '';

let modeloMenu;

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

describe('Modelo Menu', () => {
    it('Deve retornar lista de modelos menu', async() => {
        const response = await request(app)
            .get(`${process.env.API_URL}/modelo-menu`)
            .set('authorization', `${token}`);

        expect(response.status).toBe(200);

        expect(response.body).toEqual(
            expect.arrayContaining([{
                mmu_id: 4,
                mmu_nome: 'Modelo gabinetes'
            }])
        );
    });

    it('Deve inserir um novo modelo menu', async() => {
        const insereModeloMenu = {
            mmu_id: null,
            mmu_nome: `Inserção nome - ${Math.random()}`
        };

        const response = await request(app)
            .post(`${process.env.API_URL}/modelo-menu`)
            .set('authorization', `${token}`)
            .set('usuario', `${usuario}`)
            .send(insereModeloMenu);

        modeloMenu = response.body;

        expect(response.status).toBe(200);

        expect(response.body).toHaveProperty('mmu_nome', insereModeloMenu.mmu_nome);
    });

    it('Deve alterar um modelo menu', async() => {
        const editaModeloMenu = {
            mmu_nome: `Edição nome - ${Math.random()}`
        };

        const response = await request(app)
            .put(`${process.env.API_URL}/modelo-menu/${modeloMenu.mmu_id}`)
            .set('authorization', `${token}`)
            .set('usuario', `${usuario}`)
            .send(editaModeloMenu);

        expect(response.status).toBe(200);

        expect(response.body).toHaveProperty('mmu_nome', editaModeloMenu.mmu_nome);
    });

    it('Deve deletar um modelo menu', async() => {
        const response = await request(app)
            .delete(`${process.env.API_URL}/modelo-menu/${modeloMenu.mmu_id}`)
            .set('authorization', `${token}`)
            .set('usuario', `${usuario}`);

        expect(response.status).toBe(200);
    });

    it('Não deve inserir um novo modelo menu com o nome nulo', async() => {
        const insereModeloMenu = {
            mmu_id: null,
            mmu_nome: null
        };

        const response = await request(app)
            .post(`${process.env.API_URL}/modelo-menu`)
            .set('authorization', `${token}`)
            .set('usuario', `${usuario}`)
            .send(insereModeloMenu);

        expect(response.status).toBe(422);

        const errorParsed = JSON.parse(response.text);
        expect(errorParsed.message).toBe('Nome do modelo menu obrigatório');
    });

    it('Não deve inserir um novo modelo menu com o nome em branco', async() => {
        const insereModeloMenu = {
            mmu_id: null,
            mmu_nome: '   '
        };

        const response = await request(app)
            .post(`${process.env.API_URL}/modelo-menu`)
            .set('authorization', `${token}`)
            .set('usuario', `${usuario}`)
            .send(insereModeloMenu);

        expect(response.status).toBe(422);

        const errorParsed = JSON.parse(response.text);
        expect(errorParsed.message).toBe('Nome do modelo menu obrigatório');
    });

    it('Não deve inserir um novo modelo menu com o nome maior que 50 caracteres', async() => {
        const insereModeloMenu = {
            mmu_id: null,
            mmu_nome: '1'.repeat(101)
        };

        const response = await request(app)
            .post(`${process.env.API_URL}/modelo-menu`)
            .set('authorization', `${token}`)
            .set('usuario', `${usuario}`)
            .send(insereModeloMenu);

        expect(response.status).toBe(422);

        const errorParsed = JSON.parse(response.text);
        expect(errorParsed.message).toBe('Nome do modelo menu não pode ter mais que 50 caracteres');
    });
});
