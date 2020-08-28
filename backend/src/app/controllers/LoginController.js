/* eslint-disable func-names */
/* eslint-disable no-console */

import nJwt from 'njwt';
import VDadosLogin from '../models/VDadosLogin';
import VFornecedores from '../models/VFornecedores';
// import Sequelize from 'sequelize';
import AreaTela from '../models/AreaTela';

import LdapClient from 'ldapjs-client';

import ConnectionHelper from '../helpers/ConnectionHelper';

class LoginController {
    async index(req, res) {
        const { login, senha, timeout } = req.body;

        let emailLdap;

        const connection = ConnectionHelper.getConnection();

        // const sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASS, {
        //     host: process.env.DB_HOST,
        //     dialect: 'postgres',
        //     define: {
        //         timestamps: false,
        //         underscoredAll: true
        //     },
        //     pool: {
        //         max: 7,
        //         min: 0,
        //         acquire: 30000,
        //         idle: 10000
        //     }
        // });

        const loginToken = new LoginController();
        // procura o usuario no ldap, se existir ok, senão retorna erro
        try {
            if (process.env.NODE_ENV !== 'development') {
                console.log('ldap');
                const client = new LdapClient({ url: process.env.LDAP_URL });
                await client.bind(`uid=${login},${process.env.LDAP_USERS_OU}`, senha);

                const options = {
                    filter: (process.env.LDAP_USER_FILTER !== '')
                        ? `(&(uid=${login})(${process.env.LDAP_USER_FILTER}))`
                        : `(&(uid=${login}))`,
                    scope: 'sub',
                    attributes: ['uid', 'cn', 'mail']
                };

                // O LDAP atual não deixa pesquisar com o usuário normal, só admin ou authproxy
                // await client.bind('cn=admin,dc=cmc,dc=pr,dc=gov,dc=br', 'admin');

                await client.bind(process.env.LDAP_BIND_USER, process.env.LDAP_BIND_PASS);

                const entries = await client.search(
                    process.env.LDAP_USERS_OU,
                    options
                );

                entries.map(b => {
                    emailLdap = b.mail;
                });

                // limpa a sessão no ldap
                await client.unbind();
                await client.destroy();
            }
            // procura o usuário na v_dados_login
            const dadosLogin = await VDadosLogin.findOne({
                where: {
                    login: login
                },
                logging: false,
                plain: true
            });

            if (dadosLogin !== null) {
                let idArea = dadosLogin.dataValues.set_id_area.toString();
                let idSetor = dadosLogin.dataValues.set_id.toString();
                const nomeArea = dadosLogin.dataValues.nome_area;
                const nomeSetor = dadosLogin.dataValues.nome_setor;
                const nome = dadosLogin.dataValues.nome;
                const matricula = dadosLogin.dataValues.matricula;
                if (idArea.length === 1) {
                    idArea = `00${idArea}`;
                }

                if (idArea.length === 2) {
                    idArea = `0${idArea}`;
                }
                if (idSetor.length === 1) {
                    idSetor = `00${idSetor}`;
                }

                if (idSetor.length === 2) {
                    idSetor = `0${idSetor}`;
                }

                // monta o menu baseado na área do usuário
                const sql = "select spa2.monta_menu_raiz('" + idArea + "')";

                const montaMenu = await connection.query(sql,
                    {
                        logging: false,
                        plain: true,
                        raw: true
                    }
                );

                if (process.env.NODE_ENV !== 'test') {
                    console.log(`Usuário: ${login} logado com sucesso no sistema SPA2.`);
                }

                // monta o array de permissões de tela
                const permissoes = await AreaTela.findAll(
                    {
                        where: {
                            set_id: dadosLogin.dataValues.set_id_area
                        },
                        logging: false
                    });
                if (!permissoes) {
                    return res.status(400).json({ error: '´Telas da área não encontrada' });
                }
                const listaPermissoes = [];
                console.log('*** Telas permitidas ***');
                for (let i = 0; i < permissoes.length; i++) {
                    const nome = permissoes[i].tel_nome;
                    console.log(nome);
                    listaPermissoes.push(nome);
                }
                console.log('************************');
                //

                const meuToken = loginToken.geraToken(login, nome, matricula, timeout);

                return res.status(201).json({
                    token: meuToken,
                    usuario: login,
                    email: emailLdap,
                    nomeUsuario: nome,
                    setorUsuario: idSetor,
                    areaUsuario: idArea,
                    nomeSetorUsuario: nomeSetor,
                    nomeAreaUsuario: nomeArea,
                    menu: montaMenu.monta_menu_raiz,
                    permissoes: listaPermissoes
                });
            } else {
                return res.status(400).json({ error: 'Usuário não cadastrado no sistema.' });
            }
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

    async indexExterno(req, res) {
        const { login, senha, timeout } = req.body;

        let emailLdap;

        const loginToken = new LoginController();
        // procura o usuario no ldap, se existir ok, senão retorna erro
        try {
            if (process.env.NODE_ENV !== 'development') {
                const client = new LdapClient({ url: process.env.LDAP_URL });
                await client.bind(`uid=${login},${process.env.LDAP_USERS_OU}`, senha);

                const options = {
                    filter: (process.env.LDAP_USER_FILTER !== '')
                        ? `(&(uid=${login})(${process.env.LDAP_USER_FILTER}))`
                        : `(&(uid=${login}))`,
                    scope: 'sub',
                    attributes: ['uid', 'cn', 'mail']
                };

                // O LDAP atual não deixa pesquisar com o usuário normal, só admin ou authproxy
                // await client.bind('cn=admin,dc=cmc,dc=pr,dc=gov,dc=br', 'admin');

                await client.bind(process.env.LDAP_BIND_USER, process.env.LDAP_BIND_PASS);

                const entries = await client.search(
                    process.env.LDAP_USERS_OU,
                    options
                );

                entries.map(b => {
                    emailLdap = b.mail;
                });

                // limpa a sessão no ldap
                await client.unbind();
                await client.destroy();
            }
            // procura o usuário na v_dados_login
            const dadosLogin = await VDadosLogin.findOne({
                where: {
                    login: login
                },
                logging: false,
                plain: true
            });

            if (dadosLogin !== null) {
                let idArea = dadosLogin.dataValues.set_id_area.toString();
                let idSetor = dadosLogin.dataValues.set_id.toString();
                const nomeArea = dadosLogin.dataValues.nome_area;
                const nomeSetor = dadosLogin.dataValues.nome_setor;
                const nome = dadosLogin.dataValues.nome;
                const matricula = dadosLogin.dataValues.matricula;
                if (idArea.length === 1) {
                    idArea = `00${idArea}`;
                }

                if (idArea.length === 2) {
                    idArea = `0${idArea}`;
                }
                if (idSetor.length === 1) {
                    idSetor = `00${idSetor}`;
                }

                if (idSetor.length === 2) {
                    idSetor = `0${idSetor}`;
                }

                if (process.env.NODE_ENV !== 'test') {
                    console.log(`Usuário: ${login} logado com sucesso no sistema SPA2.`);
                }

                // monta o array de permissões de tela
                const permissoes = await AreaTela.findAll(
                    {
                        where: {
                            set_id: dadosLogin.dataValues.set_id_area
                        },
                        logging: false
                    });
                if (!permissoes) {
                    return res.status(400).json({ error: '´Telas da área não encontrada' });
                }
                const listaPermissoes = [];
                console.log('*** Telas permitidas ***');
                for (let i = 0; i < permissoes.length; i++) {
                    const nome = permissoes[i].tel_nome;
                    console.log(nome);
                    listaPermissoes.push(nome);
                }
                console.log('************************');
                //

                const meuToken = loginToken.geraToken(login, nome, matricula, timeout);

                return res.status(201).json({
                    token: meuToken,
                    usuario: login,
                    email: emailLdap,
                    nomeUsuario: nome,
                    setorUsuario: idSetor,
                    areaUsuario: idArea,
                    nomeSetorUsuario: nomeSetor,
                    nomeAreaUsuario: nomeArea,
                    orgao: 'IPMC',
                    permissoes: listaPermissoes
                });
            } else {
                return res.status(400).json({ error: 'Usuário não cadastrado no sistema.' });
            }
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

    async indexExtContab(req, res) {
        const { login, senha, timeout } = req.body;
        const loginToken = new LoginController();
        console.log(senha);

        try {
            const cnpj = login.replace(/^(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})/, '$1.$2.$3/$4-$5');
            // procura o fornecedor na v_fornecedores
            const dadosFornecedor = await VFornecedores.findOne({
                where: {
                    for_cnpj: cnpj.trim()
                },
                logging: true,
                plain: true
            });

            if (dadosFornecedor !== null) {
                const nomeFornecedor = dadosFornecedor.dataValues.for_nome;

                if (process.env.NODE_ENV !== 'test') {
                    console.log(`Fornecedor: ${nomeFornecedor} logado com sucesso no sistema SPA2.`);
                }

                const meuToken = loginToken.geraTokenFornecedor(login, nomeFornecedor, timeout);

                const meuIp = req.headers['x-forwarded-for'] || req.connection.remoteAddress;

                return res.status(201).json({
                    token: meuToken,
                    cnpj: login,
                    fornecedor: nomeFornecedor,
                    ip: meuIp
                });
            } else {
                return res.status(400).json({ error: 'Fornecedor não cadastrado no sistema.' });
            }
        } catch (e) {
            let retorno = '';
            console.log(e);
            if (e.errno === 'ECONNREFUSED') {
                retorno = 'Conexão recusada, tente novamente mais tarde.';
            } else {
                retorno = 'CPF/CNPJ ou senha inválidos.';
            }

            return res.status(400).json({ error: retorno });
        }
    }

    async getBd(req, res) {
        return res
            .status(200)
            .json({ bd: process.env.DB_NAME, versao: process.env.VERSAO });
    }

    geraToken(login, nomeUsuario, matricula, timeout) {
        const adicionaMinutos = function(dt, minutos) {
            return new Date(dt.getTime() + minutos * 60000);
        };
        const claims = {
            sub: login, // login do usuario
            nomeUsuarioLdap: nomeUsuario, // nome do usuario no BD
            matricula: matricula, // matricula no BD
            iat: new Date().getTime(), // data e hora de criação do token
            exp: adicionaMinutos(new Date(), timeout) // data e hora de expiração do token
        };
        const jwt = nJwt.create(
            claims,
            process.env.CHAVE,
            'HS512'
        );
        const token = jwt.compact();
        return token;
    }

    geraTokenFornecedor(cnpj, nomeFornecedor, timeout) {
        const adicionaMinutos = function(dt, minutos) {
            return new Date(dt.getTime() + minutos * 60000);
        };
        const claims = {
            sub: cnpj, // cnpj do fornecedor
            nomeFornecedor: nomeFornecedor, // nome do fornecedor
            iat: new Date().getTime(), // data e hora de criação do token
            exp: adicionaMinutos(new Date(), timeout) // data e hora de expiração do token
        };
        const jwt = nJwt.create(
            claims,
            process.env.CHAVE,
            'HS512'
        );
        const token = jwt.compact();
        return token;
    }
}
export default new LoginController();
