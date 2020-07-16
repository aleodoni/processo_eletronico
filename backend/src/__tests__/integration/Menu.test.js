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
let menuCreated = '';

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

describe('Menu', () => {
    it('Deve retornar lista de menus', async() => {
        const response = await request(app)
            .get(`${process.env.API_URL}/menu`)
            .set('authorization', `${token}`);

        expect(response.status).toBe(200);

        expect(response.body).toEqual(
            expect.arrayContaining([
                expect.objectContaining({
                    men_id: 47,
                    men_nome: 'Complementar dados'
                })
            ])
        );
    });

    it('Deve retornar lista de telas do menu', async() => {
        const response = await request(app)
            .get(`${process.env.API_URL}/tela-menu`)
            .set('authorization', `${token}`);

        expect(response.status).toBe(200);

        expect(response.body).toEqual(
            expect.arrayContaining([
                expect.objectContaining({
                    men_id: 47,
                    men_nome: 'Complementar dados'
                })
            ])
        );
    });

    it('Deve retornar lista de menu pai', async() => {
        const response = await request(app)
            .get(`${process.env.API_URL}/menu-pai`)
            .set('authorization', `${token}`)
            .expect(200);

        expect(response.status).toBe(200);

        expect(response.body).toEqual(
            expect.arrayContaining([
                expect.objectContaining({
                    men_id: 440,
                    nome_pai: 'Dados processo - Modelo informática'
                })
            ])
        );
    });

    it('Deve inserir um menu com sucesso', async() => {
        const insereMenu = {
            men_id: null,
            men_id_pai: null,
            men_nome: `Inserção nome menu - ${Math.random()}`,
            men_url: `Inserção url menu - ${Math.random()}`,
            tel_id: 22,
            mmu_id: 1,
            tel_interna: true
        };

        const response = await request(app)
            .post(`${process.env.API_URL}/menu`)
            .set('authorization', `${token}`)
            .set('usuario', `${usuario}`)
            .send(insereMenu);

        menuCreated = response.body;

        expect(response.status).toBe(200);

        expect(response.body).toHaveProperty('men_nome', insereMenu.men_nome);
    });

    it('Deve alterar um menu com sucesso', async() => {
        const alteraMenu = {
            men_id_pai: null,
            men_nome: 'Menu Alterado',
            men_url: menuCreated.men_url,
            tel_id: 22,
            mmu_id: 1,
            tel_interna: true
        };

        const response = await request(app)
            .put(`${process.env.API_URL}/menu/${menuCreated.men_id}`)
            .set('authorization', `${token}`)
            .set('usuario', `${usuario}`)
            .send(alteraMenu);

        menuCreated = response.body;

        expect(response.status).toBe(200);

        expect(response.body).toHaveProperty('men_nome', 'Menu Alterado');
    });

    it('Deve deletar um menu', async() => {
        const response = await request(app)
            .delete(`${process.env.API_URL}/menu/${menuCreated.men_id}`)
            .set('authorization', `${token}`)
            .set('usuario', `${usuario}`);

        expect(response.status).toBe(200);
    });

    it('Não deve inserir um  menu com o nome nulo', async() => {
        const insereMenu = {
            men_id: null,
            men_id_pai: null,
            men_nome: null,
            men_url: `Inserção url menu - ${Math.random()}`,
            tel_id: 22,
            mmu_id: 1,
            tel_interna: true
        };

        const response = await request(app)
            .post(`${process.env.API_URL}/menu`)
            .set('authorization', `${token}`)
            .set('usuario', `${usuario}`)
            .send(insereMenu);

        expect(response.status).toBe(422);

        const errorParsed = JSON.parse(response.text);
        expect(errorParsed.message).toBe('Nome menu obrigatório');
    });

    it('Não deve inserir um menu com o nome maior que 60 caracteres', async() => {
        const insereMenu = {
            men_id: null,
            men_id_pai: null,
            men_nome: '1'.repeat(61),
            men_url: `Inserção url menu - ${Math.random()}`,
            tel_id: 22,
            mmu_id: 1,
            tel_interna: true
        };

        const response = await request(app)
            .post(`${process.env.API_URL}/menu`)
            .set('authorization', `${token}`)
            .set('usuario', `${usuario}`)
            .send(insereMenu);

        expect(response.status).toBe(422);

        const errorParsed = JSON.parse(response.text);
        expect(errorParsed.message).toBe('Nome menu não pode ter mais que 60 caracteres');
    });

    it('Não deve inserir um menu com o url maior que 200 caracteres', async() => {
        const insereMenu = {
            men_id: null,
            men_id_pai: null,
            men_nome: 'Teste nome',
            men_url: '1'.repeat(201),
            tel_id: 22,
            mmu_id: 1,
            tel_interna: true
        };

        const response = await request(app)
            .post(`${process.env.API_URL}/menu`)
            .set('authorization', `${token}`)
            .set('usuario', `${usuario}`)
            .send(insereMenu);

        expect(response.status).toBe(422);

        const errorParsed = JSON.parse(response.text);
        expect(errorParsed.message).toBe('Url menu não pode ter mais que 200 caracteres');
    });
});
