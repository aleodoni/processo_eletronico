/* eslint-disable func-names */
/* eslint-disable no-undef */
const request = require('supertest');
const app = require('../../src/app').default;
require('dotenv/config');
process.env.NODE_ENV = 'test';

// eslint-disable-next-line no-unused-vars
let token;
// eslint-disable-next-line no-unused-vars
const usuario = '';
// eslint-disable-next-line no-unused-vars
const menuCreated = '';

describe('Login', () => {
    it('Deve se logar com sucesso', async() => {
        const response = await request(app)
            .post(`${process.env.API_URL}/autorizacao`)
            .send({
                senha: '123456',
                timeout: 1440,
                login: 'alexandre.odoni'
            });

        expect(response.status).toBe(201);

        expect(response.body).toEqual(
            expect.objectContaining({
                usuario: 'alexandre.odoni'
            })
        );
    });

    it('Não deve se logar com senha incorreta - Invalid credentials pelo LDAP', async() => {
        const response = await request(app)
            .post(`${process.env.API_URL}/autorizacao`)
            .send({
                senha: '111111',
                timeout: 1440,
                login: 'alexandre.odoni'
            });

        expect(response.status).toBe(400);

        expect(response.body).toEqual({
            error: 'Usuário ou senha inválidos.'
        });
    });

    it('Não deve se logar no sistema - Usuário não cadastrado no SPA', async() => {
        const response = await request(app)
            .post(`${process.env.API_URL}/autorizacao`)
            .send({
                senha: '123456',
                timeout: 1440,
                login: 'usuario.invalido'
            });

        expect(response.status).toBe(400);

        expect(response.body).toEqual({
            error: 'Usuário não cadastrado no sistema.'
        });
    });
});
