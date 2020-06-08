/* eslint-disable func-names */
/* eslint-disable no-undef */
const request = require('supertest');
const app = require('../app').default;
require('dotenv/config');
process.env.NODE_ENV = 'test';

let token = '';
let usuario = '';
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

describe('Criação de processo', () => {
    it('Criação de processo - dados da pessoa', function(done) {
        request(app)
            .get(`${process.env.API_URL}/dados-pessoa/2209`)
            .set('authorization', `${token}`)
            .expect(200)
            .end(function(err) {
                if (err) {
                    return done(err);
                }
                return done();
            });
    });
    // let processoId = '';
    it('Processo - Insere', function(done) {
        const insereProcesso = {
            pro_codigo: '00001/2019',
            tpr_id: 17,
            pro_iniciativa: 'Interna',
            pro_tipo_iniciativa: 'Servidor Público',
            pro_nome: `Inserção de ini nome - ${Math.random()}`,
            pro_matricula: 99999,
            pro_cpf: '99999999999',
            pro_cnpj: '99999999999',
            pro_contato_pj: `Inserção de contato pj - ${Math.random()}`,
            pro_fone: '(99) 99999-9999',
            pro_celular: '(99) 99999-9999',
            pro_email: 'teste@teste.com',
            pro_encerramento: null,
            pro_assunto: `Inserção de pro assunto - ${Math.random()}`,
            usu_autuador: 'usuario.teste',
            set_id_autuador: '171',
            area_id: '027',
            area_id_iniciativa: '027',
            pro_ultimo_tramite: null,
            usu_finalizador: 'usuario.teste',
            set_id_finalizador: '171',
            nod_id: 1
        };
        request(app)
            .post(`${process.env.API_URL}/processo`)
            .set('authorization', `${token}`)
            .set('usuario', `${usuario}`)
            .send(insereProcesso)
            .set('Content-Type', 'application/json')
            .expect(200)
            .end(function(err, res) {
                processoId = res.body.pro_id;
                if (err) {
                    return done(err);
                }
                return done();
            });
    });
});
