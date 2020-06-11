const request = require('supertest');
const app = require('../../app').default;
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
                usuario: process.env.USUARIO_TESTE
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
            expect.arrayContaining([{
                gen_id: 6,
                gen_nome: 'Baixa de bens'
            }])
        );
    });

    it('Deve inserir um novo gênero', async() => {
        const novoGenero = {
            gen_id: null,
            gen_nome: `Inserção nome - ${Math.random()}`
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
            gen_nome: 'Genero Editado'
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
});
