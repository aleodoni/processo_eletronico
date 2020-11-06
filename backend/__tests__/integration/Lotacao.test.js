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

let lotacao;

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

describe('Lotação', () => {
    it('Deve retornar lista de lotações', async() => {
        const response = await request(app)
            .get(`${process.env.API_URL}/lotacoes`)
            .set('authorization', `${token}`);

        expect(response.status).toBe(200);

        expect(response.body).toEqual(
            expect.arrayContaining([
                expect.objectContaining({
                    matricula: '2179',
                    pes_login: 'alexandre.odoni'
                })
            ])
        );
    });

    it('Deve inserir uma nova lotação', async() => {
        const novaLotacao = {
            matricula: '12345',
            pes_nome: 'Novo Usuário',
            set_id: 171,
            pes_login: 'novo.usuario'
        };

        const response = await request(app)
            .post(`${process.env.API_URL}/lotacoes`)
            .set('authorization', `${token}`)
            .set('usuario', `${usuario}`)
            .send(novaLotacao);

        lotacao = novaLotacao;

        expect(response.status).toBe(200);

        expect(response.body).toHaveProperty('pes_login', novaLotacao.pes_login);
    });

    it('Deve alterar uma lotação', async() => {
        const editaLotacao = {
            matricula: '12345',
            pes_nome: 'Usuário Alterado',
            set_id: 171,
            pes_login: 'novo.usuario'
        };

        const response = await request(app)
            .put(`${process.env.API_URL}/lotacoes/${lotacao.matricula}`)
            .set('authorization', `${token}`)
            .set('usuario', `${usuario}`)
            .send(editaLotacao);

        expect(response.status).toBe(200);

        expect(response.body).toHaveProperty('pes_nome', editaLotacao.pes_nome);
    });

    it('Deve deletar uma lotação', async() => {
        const response = await request(app)
            .delete(`${process.env.API_URL}/lotacoes/${lotacao.matricula}`)
            .set('authorization', `${token}`)
            .set('usuario', `${usuario}`);

        expect(response.status).toBe(200);
    });

    it('Não deve inserir uma nova lotação com o nome nulo', async() => {
        const insereLotacao = {
            matricula: '11111',
            pes_nome: null,
            set_id: 171,
            pes_login: 'usuario.semnome'
        };

        const response = await request(app)
            .post(`${process.env.API_URL}/lotacoes`)
            .set('authorization', `${token}`)
            .set('usuario', `${usuario}`)
            .send(insereLotacao);

        expect(response.status).toBe(422);
    });

    it('Não deve inserir uma nova lotação com o nome branco', async() => {
        const insereLotacao = {
            matricula: '11111',
            pes_nome: '  ',
            set_id: 171,
            pes_login: 'usuario.semnome'
        };

        const response = await request(app)
            .post(`${process.env.API_URL}/lotacoes`)
            .set('authorization', `${token}`)
            .set('usuario', `${usuario}`)
            .send(insereLotacao);

        expect(response.status).toBe(422);
    });

    it('Não deve inserir uma nova lotação com o nome maior que 200 caracteres', async() => {
        const insereLotacao = {
            matricula: '11111',
            pes_nome: '1'.repeat(201),
            set_id: 171,
            pes_login: 'usuario.semnome'
        };

        const response = await request(app)
            .post(`${process.env.API_URL}/lotacoes`)
            .set('authorization', `${token}`)
            .set('usuario', `${usuario}`)
            .send(insereLotacao);

        expect(response.status).toBe(422);
    });

    it('Não deve inserir uma nova lotação com matrícula nula', async() => {
        const insereLotacao = {
            matricula: null,
            pes_nome: 'Usuário Teste',
            set_id: 171,
            pes_login: 'usuario.teste'
        };

        const response = await request(app)
            .post(`${process.env.API_URL}/lotacoes`)
            .set('authorization', `${token}`)
            .set('usuario', `${usuario}`)
            .send(insereLotacao);

        expect(response.status).toBe(422);
    });

    it('Não deve inserir uma nova lotação com login nulo', async() => {
        const insereLotacao = {
            matricula: 1234,
            pes_nome: 'Usuário Teste',
            set_id: 171,
            pes_login: null
        };

        const response = await request(app)
            .post(`${process.env.API_URL}/lotacoes`)
            .set('authorization', `${token}`)
            .set('usuario', `${usuario}`)
            .send(insereLotacao);

        expect(response.status).toBe(422);
    });

    it('Não deve inserir uma nova lotação com login em branco', async() => {
        const insereLotacao = {
            matricula: 1234,
            pes_nome: 'Usuário Teste',
            set_id: 171,
            pes_login: '  '
        };

        const response = await request(app)
            .post(`${process.env.API_URL}/lotacoes`)
            .set('authorization', `${token}`)
            .set('usuario', `${usuario}`)
            .send(insereLotacao);

        expect(response.status).toBe(422);
    });

    it('Não deve inserir uma nova lotação com o login maior que 100 caracteres', async() => {
        const insereLotacao = {
            matricula: '1111',
            pes_nome: 'Usuário Teste',
            set_id: 171,
            pes_login: '1'.repeat(101)
        };

        const response = await request(app)
            .post(`${process.env.API_URL}/lotacoes`)
            .set('authorization', `${token}`)
            .set('usuario', `${usuario}`)
            .send(insereLotacao);

        expect(response.status).toBe(422);
    });

    // it('Não deve inserir uma nova lotação com setor inexistente', async() => {
    //     const insereLotacao = {
    //         matricula: 1234,
    //         pes_nome: 'Usuário Teste',
    //         set_id: 999,
    //         pes_login: 'usuario.teste'
    //     };

    //     const response = await request(app)
    //         .post(`${process.env.API_URL}/lotacoes`)
    //         .set('authorization', `${token}`)
    //         .set('usuario', `${usuario}`)
    //         .send(insereLotacao);

    //     expect(response.status).toBe(400);

    //     const error = JSON.parse(response.error.text);
    //     expect(error.message).toBe('Setor não existe');
    // });
});
