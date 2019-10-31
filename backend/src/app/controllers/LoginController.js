import Autorizacao from '../models/Autorizacao';
import Ldapjs from 'ldapjs';
import nJwt from 'njwt';
const ERRO_USUARIO_INVALIDO = 'Usuário ou senha inválidos.';
const ERRO_USUARIO_SENHA_BRANCO = 'Usuário ou senha em branco.';
const ERRO_PROCURA_LDAP = 'Erro ao fazer a procura no LDAP.';
const ERRO_PERMISSAO = 'Sem permissão de acessar o sistema.';
const ldapOptions = {
  url: process.env.LDAP_URL,
  connectTimeout: 30000,
  reconnect: true,
};
class LoginController {
  async index(req, res) {
    const ldapClient = Ldapjs.createClient(ldapOptions);
    if (req.body.usuario && req.body.senha) {
      const usuario = req.body.usuario;
      const senha = req.body.senha;
      const timeout = req.body.timeout;
      const dn = 'uid=' + usuario + ',' + process.env.OUS;
      ldapClient.bind(dn, senha, function(err) {
        if (err != null) {
          console.log(ERRO_USUARIO_INVALIDO);
          res.status(412).json({ message: ERRO_USUARIO_INVALIDO });
        } else {
          const procura = {
            scope: 'sub',
            filter: '(&(objectClass=*)(uid=' + usuario + '))',
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
                      const nomeUsuario = dados.dataValues.pes_nome;
                      console.log(
                        'Usuário: ' +
                          usuario +
                          ' logado com sucesso no sistema SPA2.');
                      let adicionaMinutos = function(dt, minutos) {
                        return new Date(dt.getTime() + minutos * 60000);
                      };
                      let claims = {
                        sub: usuario, // login do usuario
                        nomeUsuario: nomeUsuario, //nome do usuario
                        pesId: entry.object.employeeNumber, //pes_id no LDAP
                        iat: new Date().getTime(), //data e hora de criação do token
                        exp: adicionaMinutos(new Date(), timeout), //data e hora de expiração do token
                      };
                      let jwt = nJwt.create(
                        claims,
                        process.env.CHAVE,
                        'HS512'
                      );
                      let token = jwt.compact();
                      res
                        .status(201)
                        .json({ token: token, usuario: usuario });
                    }
                  })
                  .catch(function(err) {
                    console.log(err);
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
