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
        if (err) {
          return done(err);
        }
        return done();
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

  // Perfil de tela
  it('Perfil de tela - Lista', function(done) {
    request(app)
      .get(`${process.env.API_URL}/perfil-tela`)
      .set('authorization', `${token}`)
      .expect(200)
      .end(function(err) {
        if (err) {
          return done(err);
        }
        return done();
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
        if (err) {
          return done(err);
        }
        return done();
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
        if (err) {
          return done(err);
        }
        return done();
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
        if (err) {
          return done(err);
        }
        return done();
      });
  });

  // Perfil de área
  it('Perfil de área - Lista', function(done) {
    request(app)
      .get(`${process.env.API_URL}/perfil-area`)
      .set('authorization', `${token}`)
      .expect(200)
      .end(function(err) {
        if (err) {
          return done(err);
        }
        return done();
      });
  });
  let perfilAreaId = '';
  it('Perfil de area - Insere', function(done) {
    const inserePerfilArea = {
      pea_id: null,
      pea_nome: `Inserção nome - ${Math.random()}`,
      pea_descricao: `Inserção descriçao - ${Math.random()}`,
    };
    request(app)
      .post(`${process.env.API_URL}/perfil-area`)
      .set('authorization', `${token}`)
      .set('usuario', `${usuario}`)
      .send(inserePerfilArea)
      .set('Content-Type', 'application/json')
      .expect(200)
      .end(function(err, res) {
        perfilAreaId = res.body.pea_id;
        if (err) {
          return done(err);
        }
        return done();
      });
  });
  it('Perfil de área - Edita', function(done) {
    const editaPerfilArea = {
      pea_nome: `Edição nome - ${Math.random()}`,
      pea_descricao: `Edição descrição - ${Math.random()}`,
    };
    request(app)
      .put(`${process.env.API_URL}/perfil-area/${perfilAreaId}`)
      .set('authorization', `${token}`)
      .set('usuario', `${usuario}`)
      .send(editaPerfilArea)
      .set('Content-Type', 'application/json')
      .expect(200)
      .end(function(err, res) {
        perfilAreaId = res.body.pea_id;
        if (err) {
          return done(err);
        }
        return done();
      });
  });
  it('Perfil de área - Apaga', function(done) {
    request(app)
      .delete(`${process.env.API_URL}/perfil-area/${perfilAreaId}`)
      .set('authorization', `${token}`)
      .set('usuario', `${usuario}`)
      .set('Content-Type', 'application/json')
      .expect(200)
      .end(function(err, res) {
        perfilAreaId = res.body.pea_id;
        if (err) {
          return done(err);
        }
        return done();
      });
  });

  // Tela no Perfil
  it('Tela no Perfil - Lista', function(done) {
    request(app)
      .get(`${process.env.API_URL}/tela-no-perfil`)
      .set('authorization', `${token}`)
      .expect(200)
      .end(function(err) {
        if (err) {
          return done(err);
        }
        return done();
      });
  });
  let telId = '';
  let petId = '';
  it('Tela no Perfil - Insere', function(done) {
    const insereTelasAux = {
      tel_id: null,
      tel_nome: `Inserção nome - ${Math.random()}`,
      tel_url: `Inserção url - ${Math.random()}`,
    };
    request(app)
      .post(`${process.env.API_URL}/telas`)
      .set('authorization', `${token}`)
      .set('usuario', `${usuario}`)
      .send(insereTelasAux)
      .set('Content-Type', 'application/json')
      .expect(200)
      .end(function(err, resTela) {
        telId = resTela.body.tel_id;
        const inserePerfilTelaAux = {
          pet_id: null,
          pet_nome: `Inserção nome - ${Math.random()}`,
          pet_descricao: `Inserção descriçao - ${Math.random()}`,
        };
        request(app)
          .post(`${process.env.API_URL}/perfil-tela`)
          .set('authorization', `${token}`)
          .set('usuario', `${usuario}`)
          .send(inserePerfilTelaAux)
          .set('Content-Type', 'application/json')
          .expect(200)
          // eslint-disable-next-line no-shadow
          .end(function(err, resPerfilTela) {
            petId = resPerfilTela.body.pet_id;
            const insereTelaNoPerfil = {
              tel_id: telId,
              pet_id: petId,
            };
            request(app)
              .post(`${process.env.API_URL}/tela-no-perfil`)
              .set('authorization', `${token}`)
              .set('usuario', `${usuario}`)
              .send(insereTelaNoPerfil)
              .set('Content-Type', 'application/json')
              .expect(200)
              .end(function(erroTelaNoPerfil, res) {
                telId = res.body.tel_id;
                petId = res.body.pet_id;
                if (erroTelaNoPerfil) {
                  return done(erroTelaNoPerfil);
                }
                return done();
              });
          });
      });
  });

  it('Tela no Perfil - Apaga', function(done) {
    request(app)
      .delete(`${process.env.API_URL}/tela-no-perfil/${telId}/${petId}`)
      .set('authorization', `${token}`)
      .set('usuario', `${usuario}`)
      .set('Content-Type', 'application/json')
      .expect(200)
      .end(function(err) {
        if (err) {
          return done(err);
        }
        return done();
      });
    request(app)
      .delete(`${process.env.API_URL}/telas/${telId}`)
      .set('authorization', `${token}`)
      .set('usuario', `${usuario}`)
      .set('Content-Type', 'application/json')
      .expect(200)
      .end(function(err) {
        if (err) {
          return done(err);
        }
        return done();
      });
    request(app)
      .delete(`${process.env.API_URL}/perfil-tela/${petId}`)
      .set('authorization', `${token}`)
      .set('usuario', `${usuario}`)
      .set('Content-Type', 'application/json')
      .expect(200)
      .end(function(err) {
        if (err) {
          return done(err);
        }
        return done();
      });
  });

  // Área no Perfil
  it('Área no Perfil - Lista', function(done) {
    request(app)
      .get(`${process.env.API_URL}/area-no-perfil`)
      .set('authorization', `${token}`)
      .expect(200)
      .end(function(err) {
        if (err) {
          return done(err);
        }
        return done();
      });
  });
  let setId = '';
  let peaId = '';
  it('Área no Perfil - Insere', function(done) {
    const inserePerfilAreaAux = {
      pea_id: null,
      pea_nome: `Inserção nome aux - ${Math.random()}`,
      pea_descricao: `Inserção descriçao - ${Math.random()}`,
    };
    request(app)
      .post(`${process.env.API_URL}/perfil-area`)
      .set('authorization', `${token}`)
      .set('usuario', `${usuario}`)
      .send(inserePerfilAreaAux)
      .set('Content-Type', 'application/json')
      .expect(200)
      .end(function(err, resPerfilAreaAux) {
        peaId = resPerfilAreaAux.body.pea_id;
        const insereAreaNoPerfil = {
          set_id: '007',
          pea_id: peaId,
        };
        request(app)
          .post(`${process.env.API_URL}/area-no-perfil`)
          .set('authorization', `${token}`)
          .set('usuario', `${usuario}`)
          .send(insereAreaNoPerfil)
          .set('Content-Type', 'application/json')
          .expect(200)
          .end(function(erroAreaNoPerfil, resAreaNoPerfil) {
            setId = resAreaNoPerfil.body.set_id;
            peaId = resAreaNoPerfil.body.pea_id;
            if (erroAreaNoPerfil) {
              return done(erroAreaNoPerfil);
            }
            return done();
          });
      });
  });
  it('Área no Perfil - Apaga', function(done) {
    request(app)
      .delete(`${process.env.API_URL}/area-no-perfil/${setId}/${peaId}`)
      .set('authorization', `${token}`)
      .set('usuario', `${usuario}`)
      .set('Content-Type', 'application/json')
      .expect(200)
      .end(function() {
        request(app)
          .delete(`${process.env.API_URL}/perfil-area/${peaId}`)
          .set('authorization', `${token}`)
          .set('usuario', `${usuario}`)
          .set('Content-Type', 'application/json')
          .expect(200)
          .end(function(erroPerfilArea) {
            if (erroPerfilArea) {
              return done(erroPerfilArea);
            }
            return done();
          });
      });
  });

  // União dos perfis
  it('União dos perfis - Lista', function(done) {
    request(app)
      .get(`${process.env.API_URL}/uniao-perfis`)
      .set('authorization', `${token}`)
      .expect(200)
      .end(function(err) {
        if (err) {
          return done(err);
        }
        return done();
      });
  });

  let perfilAreaIdAux = '';
  let perfilTelaIdAux = '';
  it('União dos perfis - Insere', function(done) {
    const inserePerfilAreaUniaoPerfis = {
      pea_id: null,
      pea_nome: `Inserção nome aux união perfis - ${Math.random()}`,
      pea_descricao: `Inserção descriçao - ${Math.random()}`,
    };
    request(app)
      .post(`${process.env.API_URL}/perfil-area`)
      .set('authorization', `${token}`)
      .set('usuario', `${usuario}`)
      .send(inserePerfilAreaUniaoPerfis)
      .set('Content-Type', 'application/json')
      .expect(200)
      .end(function(err, resPerfilAreaUniaoPerfis) {
        perfilAreaIdAux = resPerfilAreaUniaoPerfis.body.pea_id;
        const inserePerfilTelaUniaoPerfis = {
          pet_id: null,
          pet_nome: `Inserção nome - ${Math.random()}`,
          pet_descricao: `Inserção descriçao - ${Math.random()}`,
        };
        request(app)
          .post(`${process.env.API_URL}/perfil-tela`)
          .set('authorization', `${token}`)
          .set('usuario', `${usuario}`)
          .send(inserePerfilTelaUniaoPerfis)
          .set('Content-Type', 'application/json')
          .expect(200)
          .end(function(_err, resPerfilTelaUniaoPerfis) {
            perfilTelaIdAux = resPerfilTelaUniaoPerfis.body.pet_id;
            const insereUniaoPerfis = {
              pet_id: perfilTelaIdAux,
              pea_id: perfilAreaIdAux,
            };
            request(app)
              .post(`${process.env.API_URL}/uniao-perfis`)
              .set('authorization', `${token}`)
              .set('usuario', `${usuario}`)
              .send(insereUniaoPerfis)
              .set('Content-Type', 'application/json')
              .expect(200)
              .end(function(erroUniaoPerfis) {
                if (erroUniaoPerfis) {
                  return done(erroUniaoPerfis);
                }
                return done();
              });
          });
      });
  });
  it('União dos perfis - Apaga', function(done) {
    request(app)
      .delete(
        `${process.env.API_URL}/uniao-perfis/${perfilTelaIdAux}/${perfilAreaIdAux}`
      )
      .set('authorization', `${token}`)
      .set('usuario', `${usuario}`)
      .set('Content-Type', 'application/json')
      .expect(200)
      .end(function() {
        request(app)
          .delete(`${process.env.API_URL}/perfil-area/${perfilAreaIdAux}`)
          .set('authorization', `${token}`)
          .set('usuario', `${usuario}`)
          .set('Content-Type', 'application/json')
          .expect(200)
          .end(function(err) {
            if (err) {
              return done(err);
            }
            return done();
          });
        request(app)
          .delete(`${process.env.API_URL}/perfil-tela/${perfilTelaIdAux}`)
          .set('authorization', `${token}`)
          .set('usuario', `${usuario}`)
          .set('Content-Type', 'application/json')
          .expect(200)
          .end(function(err, res) {
            perfilTelaId = res.body.pet_id;
            if (err) {
              return done(err);
            }
            return done();
          });
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
      men_nome: `Inserção nome menu - ${Math.random()}`,
      men_url: `Inserção url menu - ${Math.random()}`,
      tel_id: null,
      men_icone: `Inserção icone menu - ${Math.random()}`,
    };
    request(app)
      .put(`${process.env.API_URL}/menu/${menuId}`)
      .set('authorization', `${token}`)
      .set('usuario', `${usuario}`)
      .send(editaMenus)
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
});
