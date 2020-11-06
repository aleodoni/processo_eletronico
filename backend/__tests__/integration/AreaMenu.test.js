/* eslint-disable func-names */
/* eslint-disable no-undef */
const request = require('supertest');
const app = require('../../src/app').default;
require('dotenv/config');
process.env.NODE_ENV = 'test';

// eslint-disable-next-line no-unused-vars
let token;
// eslint-disable-next-line no-unused-vars
let usuario = '';

let areaMenu;

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

describe('Área Menu', () => {
    it('Deve retornar lista de áreas menu', async() => {
        const response = await request(app)
            .get(`${process.env.API_URL}/area-menu`)
            .set('authorization', `${token}`);

        expect(response.status).toBe(200);

        expect(response.body).toEqual(
            expect.arrayContaining([{
                amu_id: 1,
                mmu_id: 1,
                set_id: '027'
            }])
        );
    });

    it('Deve inserir uma nova área menu', async() => {
        const insereAreaMenu = {
            amu_id: null,
            set_id: '171',
            mmu_id: 1
        };

        const response = await request(app)
            .post(`${process.env.API_URL}/area-menu`)
            .set('authorization', `${token}`)
            .set('usuario', `${usuario}`)
            .send(insereAreaMenu);

        areaMenu = response.body;

        expect(response.status).toBe(200);

        expect(response.body).toHaveProperty('mmu_id', insereAreaMenu.mmu_id);
    });

    it('Deve alterar uma área menu', async() => {
        const editaAreaMenu = {
            set_id: '27',
            mmu_id: 1
        };

        const response = await request(app)
            .put(`${process.env.API_URL}/area-menu/${areaMenu.amu_id}`)
            .set('authorization', `${token}`)
            .set('usuario', `${usuario}`)
            .send(editaAreaMenu);

        console.log(response.error);
        expect(response.status).toBe(200);

        expect(response.body).toHaveProperty('set_id', editaAreaMenu.set_id);
    });

    it('Deve deletar uma área menu', async() => {
        const response = await request(app)
            .delete(`${process.env.API_URL}/area-menu/${areaMenu.amu_id}`)
            .set('authorization', `${token}`)
            .set('usuario', `${usuario}`);

        expect(response.status).toBe(200);
    });

    it('Não deve inserir uma nova área menu com o setor nulo', async() => {
        const insereAreaMenu = {
            amu_id: null,
            set_id: null,
            mmu_id: 1
        };

        const response = await request(app)
            .post(`${process.env.API_URL}/area-menu`)
            .set('authorization', `${token}`)
            .set('usuario', `${usuario}`)
            .send(insereAreaMenu);

        expect(response.status).toBe(422);

        const errorParsed = JSON.parse(response.text);
        expect(errorParsed.message).toBe('Código do setor obrigatório');
    });

    it('Não deve inserir uma nova área menu com o setor em branco', async() => {
        const insereAreaMenu = {
            amu_id: null,
            set_id: ' ',
            mmu_id: 1
        };

        const response = await request(app)
            .post(`${process.env.API_URL}/area-menu`)
            .set('authorization', `${token}`)
            .set('usuario', `${usuario}`)
            .send(insereAreaMenu);

        expect(response.status).toBe(422);

        const errorParsed = JSON.parse(response.text);
        expect(errorParsed.message).toBe('Código do setor obrigatório');
    });

    it('Não deve inserir uma nova área menu com o modelo menu nulo', async() => {
        const insereAreaMenu = {
            amu_id: null,
            set_id: '027',
            mmu_id: null
        };

        const response = await request(app)
            .post(`${process.env.API_URL}/area-menu`)
            .set('authorization', `${token}`)
            .set('usuario', `${usuario}`)
            .send(insereAreaMenu);

        expect(response.status).toBe(422);

        const errorParsed = JSON.parse(response.text);
        expect(errorParsed.message).toBe('Modelo Menu obrigatório');
    });

    it('Não deve inserir uma nova área menu com o modelo do menu em branco', async() => {
        const insereAreaMenu = {
            amu_id: null,
            set_id: '027'
        };

        const response = await request(app)
            .post(`${process.env.API_URL}/area-menu`)
            .set('authorization', `${token}`)
            .set('usuario', `${usuario}`)
            .send(insereAreaMenu);

        expect(response.status).toBe(422);

        const errorParsed = JSON.parse(response.text);
        expect(errorParsed.message).toBe('Modelo Menu obrigatório');
    });
});
