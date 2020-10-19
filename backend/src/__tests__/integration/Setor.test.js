const request = require('supertest');
const app = require('../../app').default;
require('dotenv/config');
process.env.NODE_ENV = 'test';

// eslint-disable-next-line no-unused-vars
let token = '';
// eslint-disable-next-line no-unused-vars
let usuario = '';
// eslint-disable-next-line no-unused-vars
let setor;

describe('Setor', () => {
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

    it('Deve retornar lista de setores', async() => {
        const response = await request(app)
            .get(`${process.env.API_URL}/setores`)
            .set('authorization', `${token}`);

        expect(response.status).toBe(200);

        expect(response.body).toEqual(
            expect.arrayContaining([{
                set_ativo: true,
                set_id: 27,
                set_id_area: 27,
                set_nome: 'Diretoria De Informática',
                set_sigla: 'DIF',
                set_tipo: 'N'
            }])
        );
    });

    it('Deve inserir um novo setor', async() => {
        const novoSetor = {
            set_id: null,
            set_nome: `Inserção nome - ${Math.random()}`,
            set_ativo: true,
            set_id_area: 27,
            set_sigla: 'NEW',
            set_tipo: 'N'
        };

        const response = await request(app)
            .post(`${process.env.API_URL}/setores`)
            .set('authorization', `${token}`)
            .set('usuario', `${usuario}`)
            .send(novoSetor);

        setor = response.body;

        expect(response.status).toBe(200);

        expect(response.body).toHaveProperty('set_nome', setor.set_nome);
    });

    it('Deve atualizar um setor', async() => {
        const setorEditado = {
            set_nome: 'Setor Editado'
        };

        const response = await request(app)
            .put(`${process.env.API_URL}/setores/${setor.set_id}`)
            .set('authorization', `${token}`)
            .set('usuario', `${usuario}`)
            .send(setorEditado);

        expect(response.status).toBe(200);

        expect(response.body).toHaveProperty('set_nome', setorEditado.set_nome);
    });

    it('Deve deletar um setor', async() => {
        const response = await request(app)
            .delete(`${process.env.API_URL}/setores/${setor.set_id}`)
            .set('authorization', `${token}`)
            .set('usuario', `${usuario}`);

        expect(response.status).toBe(200);
    });
});
