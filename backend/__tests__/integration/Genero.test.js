const request = require('supertest');
const app = require('../../src/app').default;
require('dotenv/config');
process.env.NODE_ENV = 'test';

// eslint-disable-next-line no-unused-vars
let token = '';
// eslint-disable-next-line no-unused-vars
let usuario = '';
// eslint-disable-next-line no-unused-vars
let genero;

describe('Gênero', () => {
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

    it('Deve retornar lista de gêneros', async() => {
        const response = await request(app)
            .get(`${process.env.API_URL}/generos`)
            .set('authorization', `${token}`);

        expect(response.status).toBe(200);

        expect(response.body).toEqual(
            expect.arrayContaining([
                expect.objectContaining({
                    gen_id: 6,
                    gen_nome: 'Baixa de bens'
                })])
        );
    });

    it('Deve inserir um novo gênero', async() => {
        const novoGenero = {
            gen_id: null,
            gen_nome: `Inserção nome - ${Math.random()}`,
            gen_visivel: true

        };

        const response = await request(app)
            .post(`${process.env.API_URL}/generos`)
            .set('authorization', `${token}`)
            .set('usuario', `${usuario}`)
            .send(novoGenero);

        genero = response.body;

        expect(response.status).toBe(200);

        expect(response.body).toHaveProperty('gen_nome', novoGenero.gen_nome);
    });

    it('Deve atualizar um gênero', async() => {
        const generoEditado = {
            gen_nome: 'Genero Editado',
            gen_visivel: true
        };

        const response = await request(app)
            .put(`${process.env.API_URL}/generos/${genero.gen_id}`)
            .set('authorization', `${token}`)
            .set('usuario', `${usuario}`)
            .send(generoEditado);

        expect(response.status).toBe(200);

        expect(response.body).toHaveProperty('gen_nome', generoEditado.gen_nome);
    });

    it('Deve deletar um gênero', async() => {
        const response = await request(app)
            .delete(`${process.env.API_URL}/generos/${genero.gen_id}`)
            .set('authorization', `${token}`)
            .set('usuario', `${usuario}`);

        expect(response.status).toBe(200);
    });

    it('Não deve inserir um gênero com o nome nulo', async() => {
        const genero = {
            gen_id: null,
            gen_nome: null
        };

        const response = await request(app)
            .post(`${process.env.API_URL}/generos`)
            .set('authorization', `${token}`)
            .set('usuario', `${usuario}`)
            .send(genero);

        expect(response.status).toBe(422);

        const errorParsed = JSON.parse(response.text);
        expect(errorParsed.message).toBe('Nome do gênero obrigatório');
    });

    it('Não deve inserir um novo gênero com o nome em branco', async() => {
        const genero = {
            gen_id: null,
            gen_nome: '   '
        };

        const response = await request(app)
            .post(`${process.env.API_URL}/generos`)
            .set('authorization', `${token}`)
            .set('usuario', `${usuario}`)
            .send(genero);

        expect(response.status).toBe(422);

        const errorParsed = JSON.parse(response.text);
        expect(errorParsed.message).toBe('Nome do gênero obrigatório');
    });

    it('Não deve inserir um novo gênero com o nome maior que 100 caracteres', async() => {
        const genero = {
            gen_id: null,
            gen_nome: '1'.repeat(101)
        };

        const response = await request(app)
            .post(`${process.env.API_URL}/generos`)
            .set('authorization', `${token}`)
            .set('usuario', `${usuario}`)
            .send(genero);

        expect(response.status).toBe(422);

        const errorParsed = JSON.parse(response.text);
        expect(errorParsed.message).toBe('Nome do gênero não pode ter mais que 100 caracteres');
    });
});
