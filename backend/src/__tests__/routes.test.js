/* eslint-disable no-undef */
const request = require('supertest');
const app = require('../app').default;
require('dotenv/config');

let token = '';
let usuario = '';
let nomeUsuario = '';
let areaUsuario = '';
beforeAll(done => {
  request(app)
    .post(`${process.env.API_URL}/autorizacao`)
    .send({
      senha: process.env.SENHA_TESTE,
      timeout: 1440,
      usuario: process.env.USUARIO_TESTE,
    })
    .end((err, response) => {
      token = response.body.token;
      usuario = response.body.usuario;
      nomeUsuario = response.body.nomeUsuario;
      areaUsuario = response.body.lotacaoSPA2;
      done();
    });
});

describe('Testando as rotas do sistema.', () => {
  test('Raiz', () => {
    return request(app)
      .get(`${process.env.API_URL}/`)
      .set('authorization', `${token}`)
      .then(response => {
        expect(response.statusCode).toBe(200);
      });
  });
  test('Área', () => {
    return request(app)
      .get(`${process.env.API_URL}/area`)
      .set('authorization', `${token}`)
      .then(response => {
        expect(response.statusCode).toBe(200);
      });
  });
});
