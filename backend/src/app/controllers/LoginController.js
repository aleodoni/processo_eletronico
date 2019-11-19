/* eslint-disable func-names */
/* eslint-disable no-console */
import nJwt from 'njwt';
import Ldapjs from 'ldapjs';
import Autorizacao from '../models/Autorizacao';
import SetorUsuario from '../models/SetorUsuario';

const ERRO_USUARIO_INVALIDO = 'Usuário ou senha inválidos.';
const ERRO_USUARIO_SETOR = 'Usuário não consta em nenhum setor.';
const ERRO_USUARIO_SENHA_BRANCO = 'Usuário ou senha em branco.';
const ERRO_PROCURA_LDAP = 'Erro ao fazer a procura no LDAP.';
const ERRO_PERMISSAO = 'Sem permissão de acessar o sistema.';
const ERRO_CONECTAR_LDAP = 'Erro ao conectar ao LDAP.';
const ldapOptions = {
  url: process.env.LDAP_URL,
  connectTimeout: 30000,
  reconnect: true,
};
class LoginController {
  async index(req, res) {
    const ldapClient = Ldapjs.createClient(ldapOptions);
    if (req.body.usuario && req.body.senha) {
      const { usuario } = req.body;
      const { senha } = req.body;
      const { timeout } = req.body;
      const dn = `uid=${usuario},${process.env.OUS}`;
      ldapClient.bind(dn, senha, function(err) {
        if (err != null) {
          console.log(ERRO_USUARIO_INVALIDO);
          res.status(412).json({ message: ERRO_USUARIO_INVALIDO });
        } else {
          const procura = {
            scope: 'sub',
            filter: `(&(objectClass=*)(uid=${usuario}))`,
            attrs: 'memberOf',
          };
          ldapClient.search(process.env.OUS, procura, function(err, resposta) {
            if (err) {
              console.log(ERRO_PROCURA_LDAP);
              res.status(412).json({
                message: ERRO_PROCURA_LDAP,
              });
            } else {
              resposta.on('searchEntry', function(entry) {
                const pesId = entry.object.employeeNumber;
                Autorizacao.findAll({
                  where: {
                    pessoa: pesId,
                  },
                  plain: true,
                  logging: false,
                })
                  .then(dados => {
                    if (dados.length === 0) {
                      console.log(ERRO_PERMISSAO);
                      res.status(412).json({
                        message: ERRO_PERMISSAO,
                      });
                    } else {
                      // carrega o setor do usuário
                      let setorUsuario = dados.dataValues.set_id.toString();
                      if (setorUsuario.length === 1) {
                        setorUsuario = `00${setorUsuario}`;
                      }
                      if (setorUsuario.length === 2) {
                        setorUsuario = `0${setorUsuario}`;
                      }
                      SetorUsuario.sequelize
                        .query(
                          `SELECT * FROM spa2.v_cmclotacaousuario where substring(set_id,1,3) = '${setorUsuario}' 
                          union SELECT * FROM spa2.v_cmclotacaousuario where substring(set_id,4,3) = '${setorUsuario}' 
                          union SELECT * FROM spa2.v_cmclotacaousuario where substring(set_id,7,3) = '${setorUsuario}' 
                          union SELECT * FROM spa2.v_cmclotacaousuario where substring(set_id,10,3) = '${setorUsuario}' 
                          union SELECT * FROM spa2.v_cmclotacaousuario where substring(set_id,10,3) = '${setorUsuario}' 
                          order by nivellotacao`,
                          {
                            model: SetorUsuario,
                            mapToModel: true,
                            logging: false,
                          }
                        )
                        .then(function(area) {
                          if (area.length !== 0) {
                            const nivel = area[0].nivellotacao;
                            let setorPaiUsuario;
                            let areaUsuario;
                            // verifica o nível da lotação, conforme o nível pega a lotação pai
                            if (nivel === 1) {
                              setorPaiUsuario = area[0].set_id;
                              areaUsuario = setorPaiUsuario;
                            }
                            if (nivel === 2) {
                              setorPaiUsuario = area[0].set_id;
                              areaUsuario = setorPaiUsuario.substring(3, 6);
                            }
                            if (nivel === 3) {
                              setorPaiUsuario = area[0].set_id;
                              // seção de relações públicas ou institucionais
                              if (
                                setorPaiUsuario === '088382433' ||
                                setorPaiUsuario === '088382434'
                              ) {
                                areaUsuario = setorPaiUsuario.substring(3, 6);
                              } else {
                                areaUsuario = setorPaiUsuario.substring(6, 9);
                              }
                            }
                            if (nivel === 4) {
                              setorPaiUsuario = area[0].set_id;
                              if (setorPaiUsuario === '001288149439'){
                                areaUsuario = setorPaiUsuario.substring(3, 6);
                              }else{
                                areaUsuario = setorPaiUsuario.substring(6, 9);
                              }
                            }
                            if (nivel === 5) {
                              setorPaiUsuario = area[0].set_id;
                              areaUsuario = setorPaiUsuario.substring(6, 9);
                            }
                              const nomeUsuario = dados.dataValues.pes_nome;
                              console.log(
                                `Usuário: ${usuario} logado com sucesso no sistema SPA2.`
                              );
                              const adicionaMinutos = function(dt, minutos) {
                                return new Date(dt.getTime() + minutos * 60000);
                              };
                              const claims = {
                                sub: usuario, // login do usuario
                                nomeUsuario, // nome do usuario
                                pesId: entry.object.employeeNumber, // pes_id no LDAP
                                iat: new Date().getTime(), // data e hora de criação do token
                                exp: adicionaMinutos(new Date(), timeout), // data e hora de expiração do token
                              };
                              const jwt = nJwt.create(
                                claims,
                                process.env.CHAVE,
                                'HS512'
                              );
                              const token = jwt.compact();
                              res.status(201).json({
                                token,
                                usuario,
                                nomeUsuario,
                                setorUsuario,
                                areaUsuario,
                              }); 
                              return null;
                           
                          } else {
                            console.log(ERRO_USUARIO_SETOR);
                            res.status(412).json({
                              message: ERRO_USUARIO_SETOR,
                            });
                          }
                        })
                        .catch(function(erro) {
                          console.log(erro);
                        });
                      return null;
                      //
                    }
                  })
                  .catch(function(erroAutorizacao) {
                    res.status(412).json({
                      message: ERRO_CONECTAR_LDAP,
                    });
                    console.log(erroAutorizacao);
                  });
              });
            }
          });
        }
      });
    } else {
      console.log(ERRO_USUARIO_SENHA_BRANCO);
      res.status(412).json({
        message: ERRO_USUARIO_SENHA_BRANCO,
      });
    }
  }

  
}
export default new LoginController();
