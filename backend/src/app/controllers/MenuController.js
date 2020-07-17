/* eslint-disable consistent-return */
/* eslint-disable func-names */
/* eslint-disable camelcase */
// import Sequelize from 'sequelize';
import Menu from '../models/Menu';
import Tela from '../models/Tela';
import ModeloMenu from '../models/ModeloMenu';
import VTelaMenu from '../models/VTelaMenu';
import VMenuPai from '../models/VMenuPai';

import CreateAuditoriaService from '../services/auditoria/CreateAuditoriaService';
import Auditoria from '../models/Auditoria';
import DataHoraAtual from '../models/DataHoraAtual';

import ConnectionHelper from '../helpers/ConnectionHelper';

import CreateMenuService from '../services/menu/CreateMenuService';
import DeleteMenuService from '../services/menu/DeleteMenuService';
import UpdateMenuService from '../services/menu/UpdateMenuService';

import AppError from '../error/AppError';

require('dotenv/config');

class MenuController {
    async index(req, res) {
        const menus = await Menu.findAll({
            order: ['men_nome'],
            attributes: [
                'men_id',
                'men_id_pai',
                'men_nome',
                'men_url',
                'tel_id',
                'mmu_id',
                'men_ordem_pai',
                'tel_interna'
            ],
            logging: false
        });
        return res.json(menus);
    }

    async telaMenu(req, res) {
        const telaMenus = await VTelaMenu.findAll({
            order: ['mmu_nome', 'men_ordem_pai'],
            attributes: [
                'men_id',
                'men_id_pai',
                'nome_pai',
                'mmu_id',
                'mmu_nome',
                'men_nome',
                'men_url',
                'tel_id',
                'tel_nome',
                'men_ordem_pai',
                'tel_interna'
            ],
            logging: false
        });
        return res.json(telaMenus);
    }

    async telaPai(req, res) {
        const telaPai = await VMenuPai.findAll({
            attributes: [
                'men_id',
                'nome_pai'
            ],
            logging: false
        });
        return res.json(telaPai);
    }

    async store(req, res) {
        const createMenu = new CreateMenuService(Menu, Tela, ModeloMenu);
        const createAuditoria = new CreateAuditoriaService(Auditoria, DataHoraAtual);

        const menu = await createMenu.execute(req.body, { logging: true });

        // auditoria de inserção
        const { url, headers } = req;
        const { usuario } = headers;
        const clientIP = req.headers['x-forwarded-for'] || req.connection.remoteAddress;
        await createAuditoria.execute(req.body, url, usuario, clientIP, 'I', menu.men_id);
        //

        return res.json(menu);
    }

    async update(req, res) {
        const updateMenu = new UpdateMenuService(Menu, Tela, ModeloMenu);
        const createAuditoria = new CreateAuditoriaService(Auditoria, DataHoraAtual);

        const { id } = req.params;

        const {
            men_id_pai,
            men_nome,
            men_url,
            tel_id,
            mmu_id,
            men_ordem_pai,
            tela_interna
        } = req.body;

        const updatedMenu = await updateMenu.execute({
            id,
            men_id_pai,
            men_nome,
            men_url,
            tel_id,
            mmu_id,
            men_ordem_pai,
            tela_interna
        });

        // auditoria de edição
        const { url, headers } = req;
        const { usuario } = headers;
        const clientIP = req.headers['x-forwarded-for'] || req.connection.remoteAddress;

        await createAuditoria.execute(updatedMenu._previousDataValues, url, usuario, clientIP, 'U', id);
        //

        return res.json(updatedMenu);
    }

    async delete(req, res) {
        const createAuditoria = new CreateAuditoriaService(Auditoria, DataHoraAtual);
        const deleteMenu = new DeleteMenuService(Menu);

        const { id } = req.params;

        try {
            const menu = await deleteMenu.execute({ id });

            // auditoria de deleção
            const { url, headers } = req;
            const { usuario } = headers;
            const clientIP = req.headers['x-forwarded-for'] || req.connection.remoteAddress;
            await createAuditoria.execute(menu._previousDataValues, url, usuario, clientIP, 'D', id);
            //
        } catch (err) {
            throw new AppError('Erro ao excluir menu. O menu menu possui uma ou mais ligações.');
        }

        return res.send();
    }

    async dataAtual(req, res) {
        const dataAtual = await DataHoraAtual.findAll({
            attributes: ['data_hora_atual'],
            logging: false
        });
        return res.json(dataAtual);
    }

    async montaMenu(req, res) {
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

        const connection = ConnectionHelper.getConnection();
        const area = req.params.area;

        const sql = "select spa2.monta_menu_raiz('" + area + "')";
        connection.query(sql, {
            logging: false,
            plain: true,
            raw: true
        }).then(retorno => {
            return res.json(retorno.monta_menu_raiz);
        });
    }
}
export default new MenuController();
