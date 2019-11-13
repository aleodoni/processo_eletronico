/* eslint-disable func-names */
/* eslint-disable no-undef */
const request = require('supertest');
const app = require('../app').default;
require('dotenv/config');

let token = '';
let usuario = '';
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
  test('Área por código', () => {
    return request(app)
      .get(`${process.env.API_URL}/area-por-codigo/027`)
      .set('authorization', `${token}`)
      .then(response => {
        expect(response.statusCode).toBe(200);
      });
  });
  test('Setor por código', () => {
    return request(app)
      .get(`${process.env.API_URL}/setor-por-codigo/171`)
      .set('authorization', `${token}`)
      .then(response => {
        expect(response.statusCode).toBe(200);
      });
  });
  test('Geração do menu', async () => {
    const response = await request(app)
      .get(`${process.env.API_URL}/geraMenu/027`)
      .set('authorization', `${token}`);
    expect(response.statusCode).toBe(200);
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
        if (err) {
          return done(err);
        }
        return done();
      });
  });
  let telaId = '';
  it('Telas - Insere', function(done) {
    const insereTelas = {
      tel_id: null,
      tel_nome: `Inserção nome - ${Math.random()}`,
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
        if (err) {
          return done(err);
        }
        return done();
      });
  });
  it('Telas - Edita', function(done) {
    const editaTelas = {
      tel_nome: `Edição nome - ${Math.random()}`,
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
        if (err) {
          return done(err);
        }
        return done();
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
        if (err) {
          return done(err);
        }
        return done();
      });
  });

  // Menu
  it('Menu - Lista', function(done) {
    request(app)
      .get(`${process.env.API_URL}/menu`)
      .set('authorization', `${token}`)
      .expect(200)
      .end(function(err) {
        if (err) {
          return done(err);
        }
        return done();
      });
  });
  let menuId = '';
  it('Menu - Insere', function(done) {
    const insereMenus = {
      men_id: null,
      men_id_pai: null,
      men_nome: `Inserção nome menu - ${Math.random()}`,
      men_url: `Inserção url menu - ${Math.random()}`,
      tel_id: null,
      men_icone: `Inserção icone menu - ${Math.random()}`,
    };
    request(app)
      .post(`${process.env.API_URL}/menu`)
      .set('authorization', `${token}`)
      .set('usuario', `${usuario}`)
      .send(insereMenus)
      .set('Content-Type', 'application/json')
      .expect(200)
      .end(function(err, res) {
        menuId = res.body.men_id;
        if (err) {
          return done(err);
        }
        return done();
      });
  });
  it('Menu - Edita', function(done) {
    const editaMenus = {
      men_id_pai: null,
      men_nome: `Edição nome menu - ${Math.random()}`,
      men_url: `Edição url menu - ${Math.random()}`,
      tel_id: null,
      men_icone: `Edição icone menu - ${Math.random()}`,
    };
    request(app)
      .put(`${process.env.API_URL}/menu/${menuId}`)
      .set('authorization', `${token}`)
      .set('usuario', `${usuario}`)
      .send(editaMenus)
      .set('Content-Type', 'application/json')
      .expect(200)
      .end(function(err, _res) {
        if (err) {
          return done(err);
        }
        return done();
      });
  });
  it('Menu - Apaga', function(done) {
    request(app)
      .delete(`${process.env.API_URL}/menu/${menuId}`)
      .set('authorization', `${token}`)
      .set('usuario', `${usuario}`)
      .set('Content-Type', 'application/json')
      .expect(200)
      .end(function(err, res) {
        menuId = res.body.men_id;
        if (err) {
          return done(err);
        }
        return done();
      });
  });
  
  // Modelo de Menu
  it('Modelo de menu - Lista', function(done) {
    request(app)
      .get(`${process.env.API_URL}/modelo-menu`)
      .set('authorization', `${token}`)
      .expect(200)
      .end(function(err) {
        if (err) {
          return done(err);
        }
        return done();
      });
  });
  let modeloMenuId = '';
  it('Modelo de menu - Insere', function(done) {
    const insereModeloMenus = {
      mmu_id: null,
      mmu_nome: `Inserção nome menu - ${Math.random()}`,
    };
    request(app)
      .post(`${process.env.API_URL}/modelo-menu`)
      .set('authorization', `${token}`)
      .set('usuario', `${usuario}`)
      .send(insereModeloMenus)
      .set('Content-Type', 'application/json')
      .expect(200)
      .end(function(err, res) {
        modeloMenuId = res.body.mmu_id;
        if (err) {
          return done(err);
        }
        return done();
      });
  });
  it('Modelo de menu - Edita', function(done) {
    const editaModeloMenus = {
      mmu_nome: `Edição nome modelo menu - ${Math.random()}`,
    };
    request(app)
      .put(`${process.env.API_URL}/modelo-menu/${modeloMenuId}`)
      .set('authorization', `${token}`)
      .set('usuario', `${usuario}`)
      .send(editaModeloMenus)
      .set('Content-Type', 'application/json')
      .expect(200)
      .end(function(err, res) {
        if (err) {
          return done(err);
        }
        return done();
      });
  });
  it('Modelo de menu - Apaga', function(done) {
    request(app)
      .delete(`${process.env.API_URL}/modelo-menu/${modeloMenuId}`)
      .set('authorization', `${token}`)
      .set('usuario', `${usuario}`)
      .set('Content-Type', 'application/json')
      .expect(200)
      .end(function(err, res) {
        menuId = res.body.mmu_id;
        if (err) {
          return done(err);
        }
        return done();
      });
  });
  // Área de Menu
  it('Área de menu - Lista', function(done) {
    request(app)
      .get(`${process.env.API_URL}/area-menu`)
      .set('authorization', `${token}`)
      .expect(200)
      .end(function(err) {
        if (err) {
          return done(err);
        }
        return done();
      });
  });
  let areaMenuId = '';
  it('Área de menu - Insere', function(done) {
    const insereAreaMenus = {
      amu_id: null,
      set_id: '027',
      mmu_id: 1,
    };
    request(app)
      .post(`${process.env.API_URL}/area-menu`)
      .set('authorization', `${token}`)
      .set('usuario', `${usuario}`)
      .send(insereAreaMenus)
      .set('Content-Type', 'application/json')
      .expect(200)
      .end(function(err, res) {
        areaMenuId = res.body.amu_id;
        if (err) {
          return done(err);
        }
        return done();
      });
  });
  it('Área de menu - Edita', function(done) {
    const editaAreaMenus = {
      set_id: '032',
      mmu_id: 2,
    };
    request(app)
      .put(`${process.env.API_URL}/area-menu/${areaMenuId}`)
      .set('authorization', `${token}`)
      .set('usuario', `${usuario}`)
      .send(editaAreaMenus)
      .set('Content-Type', 'application/json')
      .expect(200)
      .end(function(err, res) {
        if (err) {
          return done(err);
        }
        return done();
      });
  });
  it('Área de menu - Apaga', function(done) {
    request(app)
      .delete(`${process.env.API_URL}/area-menu/${areaMenuId}`)
      .set('authorization', `${token}`)
      .set('usuario', `${usuario}`)
      .set('Content-Type', 'application/json')
      .expect(200)
      .end(function(err, res) {
        menuId = res.body.amu_id;
        if (err) {
          return done(err);
        }
        return done();
      });
  });
});
