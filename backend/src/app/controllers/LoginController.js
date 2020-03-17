/* eslint-disable func-names */
/* eslint-disable no-console */
import nJwt from 'njwt';
import Autorizacao from '../models/Autorizacao';
import SetorUsuario from '../models/SetorUsuario';
import Area from '../models/Area';
import Sequelize from 'sequelize';

import LdapClient from 'ldapjs-client';

const ERRO_USUARIO_SETOR = 'Usuário não consta em nenhum setor.';

class LoginController {
    async areaPorCodigo(id) {
        const area = await Area.findByPk(id, { logging: false });
        return area;
    }

    async index(req, res) {
        const client = new LdapClient({ url: process.env.LDAP_URL });
        const { usuario, senha, timeout } = req.body;
        let pesIdLdap;
        let nomeUsuarioLdap;
        // procura o usuario no ldap, se existir ok, senão retorna erro
        try {
            await client.bind(`uid=${usuario},${process.env.OUS}`, senha);
            const options = {
                filter: `(&(uid=${usuario}))`,
                scope: 'sub',
                attributes: ['uid', 'cn', 'employeeNumber']
            };
            const entries = await client.search(
                process.env.OUS,
                options
            );
            entries.map(b => {
                pesIdLdap = parseInt(b.employeeNumber);
                nomeUsuarioLdap = b.cn;
            });

            // limpa a sessão no ldap
            await client.unbind();
            await client.destroy();

            // baseado no pesId, retorna o setor do usuário conforme código da Elotech
            const autorizacao = await Autorizacao.findAll({
                where: {
                    pessoa: pesIdLdap
                },
                attributes: ['set_id'],
                logging: false
            });

            let setorUsuario = '';
            autorizacao.map(setor => {
                setorUsuario = setor.set_id.toString();
                if (setorUsuario.length === 1) {
                    setorUsuario = `00${setorUsuario}`;
                }
                if (setorUsuario.length === 2) {
                    setorUsuario = `0${setorUsuario}`;
                }
            });

            // baseado na lotação do usuário retorna a lotaçao dele

            const lotacao = await SetorUsuario.sequelize.query(
                `SELECT * FROM spa2.v_cmclotacaousuario where substring(set_id,1,3) = '${setorUsuario}'
union SELECT * FROM spa2.v_cmclotacaousuario where substring(set_id,4,3) = '${setorUsuario}'
union SELECT * FROM spa2.v_cmclotacaousuario where substring(set_id,7,3) = '${setorUsuario}'
union SELECT * FROM spa2.v_cmclotacaousuario where substring(set_id,10,3) = '${setorUsuario}'
union SELECT * FROM spa2.v_cmclotacaousuario where substring(set_id,10,3) = '${setorUsuario}'
order by nivellotacao`,
                {
                    model: SetorUsuario,
                    mapToModel: true,
                    logging: false
                }
            );
            let setorPaiUsuario = '';
            let nomeSetorUsuario = '';
            let areaUsuario = '';
            if (lotacao.length === 0) {
                console.log(ERRO_USUARIO_SETOR);
                res.status(412).json({
                    message: ERRO_USUARIO_SETOR
                });
            } else {
                lotacao.map(lot => {
                    const nivel = lot.nivellotacao;
                    nomeSetorUsuario = lot.set_nome;
                    setorPaiUsuario = lot.set_id;
                    // verifica o nível da lotação, conforme o nível pega a lotação pai
                    if (nivel === 1) {
                        areaUsuario = setorPaiUsuario;
                    }
                    if (nivel === 2) {
                        areaUsuario = setorPaiUsuario.substring(3, 6);
                    }
                    if (nivel === 3) {
                        // seção de relações públicas ou institucionais
                        if (setorPaiUsuario === '088382433' || setorPaiUsuario === '088382434') {
                            areaUsuario = setorPaiUsuario.substring(3, 6);
                        } else {
                            areaUsuario = setorPaiUsuario.substring(6, 9);
                        }
                    }
                    if (nivel === 4) {
                        if (setorPaiUsuario === '001288149439') {
                            areaUsuario = setorPaiUsuario.substring(3, 6);
                        } else {
                            areaUsuario = setorPaiUsuario.substring(6, 9);
                        }
                    }
                    if (nivel === 5) {
                        areaUsuario = setorPaiUsuario.substring(6, 9);
                    }
                });
            }

            // retorna a área do usuário
            const area = await Area.findByPk(areaUsuario, { logging: false, plain: true });
            const nomeAreaUsuario = area.dataValues.set_nome;

            const sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASS, {
                host: process.env.DB_HOST,
                dialect: 'postgres',
                define: {
                    timestamps: false,
                    underscoredAll: true
                },
                pool: {
                    max: 7,
                    min: 0,
                    acquire: 30000,
                    idle: 10000
                }
            });
            // monta o menu baseado nas permissões do usuário
            const sql = "select spa2.monta_menu_raiz('" + areaUsuario + "')";
            const montaMenu = await sequelize.query(sql,
                {
                    logging: false,
                    plain: true,
                    raw: true
                }
            );
            if (process.env.NODE_ENV !== 'test') {
                console.log(`Usuário: ${usuario} logado com sucesso no sistema SPA2.`);
            }
            // geração de token
            const adicionaMinutos = function(dt, minutos) {
                return new Date(dt.getTime() + minutos * 60000);
            };
            const claims = {
                sub: req.body.usuario, // login do usuario
                nomeUsuarioLdap, // nome do usuario no LDAP
                pesId: pesIdLdap, // pes_id no LDAP
                iat: new Date().getTime(), // data e hora de criação do token
                exp: adicionaMinutos(new Date(), timeout) // data e hora de expiração do token
            };
            const jwt = nJwt.create(
                claims,
                process.env.CHAVE,
                'HS512'
            );
            const token = jwt.compact();

            return res.status(201).json({
                token: token,
                usuario: req.body.usuario,
                nomeUsuario: nomeUsuarioLdap,
                setorUsuario: setorUsuario,
                areaUsuario: areaUsuario,
                nomeSetorUsuario: nomeSetorUsuario,
                nomeAreaUsuario: nomeAreaUsuario,
                menu: montaMenu.monta_menu_raiz
            });
        } catch (e) {
            let retorno = '';
            console.log(e);
            if (e.errno === 'ECONNREFUSED') {
                retorno = 'Conexão recusada, tente novamente mais tarde.';
            } else {
                retorno = 'Usuário ou senha inválidos.';
            }
            return res.status(400).json({ error: retorno });
        }
    }

    async getBd(req, res) {
        return res
            .status(200)
            .json({ bd: process.env.DB_NAME, versao: process.env.VERSAO });
    }
}
export default new LoginController();
