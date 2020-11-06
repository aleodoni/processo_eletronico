const request = require('supertest');
const app = require('../../src/app').default;
require('dotenv/config');
process.env.NODE_ENV = 'test';

// eslint-disable-next-line no-unused-vars
let token = '';
// eslint-disable-next-line no-unused-vars
let usuario = '';
// eslint-disable-next-line no-unused-vars
let tela;

describe('Tela', () => {
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

    it('Deve retornar lista de telas', async() => {
        const response = await request(app)
            .get(`${process.env.API_URL}/telas`)
            .set('authorization', `${token}`);

        expect(response.status).toBe(200);

        expect(response.body).toEqual(
            expect.arrayContaining([
                { tel_id: 26, tel_nome: 'Cadastros' }
            ])
        );
    });

    it('Deve inserir uma nova tela', async() => {
        const novaTela = {
            tel_id: null,
            tel_nome: `Inserção nome - ${Math.random()}`
        };

        const response = await request(app)
            .post(`${process.env.API_URL}/telas`)
            .set('authorization', `${token}`)
            .set('usuario', `${usuario}`)
            .send(novaTela);

        tela = response.body;

        expect(response.status).toBe(200);

        expect(response.body).toHaveProperty('tel_nome', novaTela.tel_nome);
    });

    it('Deve atualizar uma tela', async() => {
        const telaEditada = {
            tel_nome: 'Tela Editado'
        };

        const response = await request(app)
            .put(`${process.env.API_URL}/telas/${tela.tel_id}`)
            .set('authorization', `${token}`)
            .set('usuario', `${usuario}`)
            .send(telaEditada);

        expect(response.status).toBe(200);

        expect(response.body).toHaveProperty('tel_nome', telaEditada.tel_nome);
    });

    it('Deve deletar uma tela', async() => {
        const response = await request(app)
            .delete(`${process.env.API_URL}/telas/${tela.tel_id}`)
            .set('authorization', `${token}`)
            .set('usuario', `${usuario}`);

        expect(response.status).toBe(200);
    });
});
