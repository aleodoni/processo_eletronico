/* eslint-disable func-names */
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

describe('Testando as rotas de manutenção do sistema.', () => {  
  // Tela
  it('Telas - Lista', function(done) {
    request(app)
      .get(`${process.env.API_URL}/telas`)
      .set('authorization', `${token}`)
      .expect(200)
      .end(function(err) {
        if (err) return done(err);
        done();
      });
  });
  let telaId = '';
  it('Telas - Insere', function(done) {
    const insereTelas = {
      tel_id: null,
      tel_nome: `Inserção nome - ${Math.random()}`,
      tel_url: `Inserção url - ${Math.random()}`,
    };
    request(app)
      .post(`${process.env.API_URL}/telas`)
      .set('authorization', `${token}`)
      .set('usuario', `${usuario}`)
      .send(insereTelas)
      .set('Content-Type', 'application/json')
      .expect(200)
      .end(function(err, res) {
        telaId = res.body.tel_id;
        if (err) return done(err);
        done();
      });
  });
  it('Telas - Edita', function(done) {
    const editaTelas = {
      tel_nome: `Edição nome - ${Math.random()}`,
      tel_url: `Edição url - ${Math.random()}`,
    };
    request(app)
      .put(`${process.env.API_URL}/telas/${telaId}`)
      .set('authorization', `${token}`)
      .set('usuario', `${usuario}`)
      .send(editaTelas)
      .set('Content-Type', 'application/json')
      .expect(200)
      .end(function(err, res) {
        telaId = res.body.tel_id;
        if (err) return done(err);
        done();
      });
  });
  it('Telas - Apaga', function(done) {
    request(app)
      .delete(`${process.env.API_URL}/telas/${telaId}`)
      .set('authorization', `${token}`)
      .set('usuario', `${usuario}`)
      .set('Content-Type', 'application/json')
      .expect(200)
      .end(function(err, res) {
        telaId = res.body.tel_id;
        if (err) return done(err);
        done();
      });
  });

  // Perfil de tela
  it('Perfil de tela - Lista', function(done) {
    request(app)
      .get(`${process.env.API_URL}/perfil-tela`)
      .set('authorization', `${token}`)
      .expect(200)
      .end(function(err) {
        if (err) return done(err);
        done();
      });
  });
  let perfilTelaId = '';
  it('Perfil de tela - Insere', function(done) {
    const inserePerfilTela = {
      pet_id: null,
      pet_nome: `Inserção nome - ${Math.random()}`,
      pet_descricao: `Inserção descriçao - ${Math.random()}`,
    };
    request(app)
      .post(`${process.env.API_URL}/perfil-tela`)
      .set('authorization', `${token}`)
      .set('usuario', `${usuario}`)
      .send(inserePerfilTela)
      .set('Content-Type', 'application/json')
      .expect(200)
      .end(function(err, res) {
        perfilTelaId = res.body.pet_id;
        if (err) return done(err);
        done();
      });
  });
  it('Perfil de tela - Edita', function(done) {
    const editaPerfilTela = {
      pet_nome: `Edição nome - ${Math.random()}`,
      pet_descricao: `Edição descrição - ${Math.random()}`,
    };
    request(app)
      .put(`${process.env.API_URL}/perfil-tela/${perfilTelaId}`)
      .set('authorization', `${token}`)
      .set('usuario', `${usuario}`)
      .send(editaPerfilTela)
      .set('Content-Type', 'application/json')
      .expect(200)
      .end(function(err, res) {
        perfilTelaId = res.body.pet_id;
        if (err) return done(err);
        done();
      });
  });
  it('Perfil de tela - Apaga', function(done) {
    request(app)
      .delete(`${process.env.API_URL}/perfil-tela/${perfilTelaId}`)
      .set('authorization', `${token}`)
      .set('usuario', `${usuario}`)
      .set('Content-Type', 'application/json')
      .expect(200)
      .end(function(err, res) {
        perfilTelaId = res.body.pet_id;
        if (err) return done(err);
        done();
      });
  });
});
