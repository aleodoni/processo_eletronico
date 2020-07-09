/* eslint-disable camelcase */
/* eslint-disable consistent-return */
/* eslint-disable func-names */
import Nodo from '../models/Nodo';
import VNodo from '../models/VNodo';
import Fluxo from '../models/Fluxo';
// import AuditoriaController from './AuditoriaController';
import CreateAuditoriaService from '../services/auditoria/CreateAuditoriaService';
import Auditoria from '../models/Auditoria';
import DataHoraAtual from '../models/DataHoraAtual';

import CreateNodoService from '../services/nodo/CreateNodoService';
import DeleteNodoService from '../services/nodo/DeleteNodoService';
import UpdateNodoService from '../services/nodo/UpdateNodoService';

import AppError from '../error/AppError';

class NodoController {
    async index(req, res) {
        const nodos = await Nodo.findAll({
            order: ['nod_id'],
            attributes: [
                'nod_id',
                'nod_inicio',
                'flu_id',
                'area_id',
                'nod_fim',
                'nod_dias_prazo',
                'nod_ordem',
                'nod_aval_executiva',
                'nod_decisao',
                'nod_interessado',
                'nod_ciencia',
                'nod_averbacao',
                'nod_ciencia_averbacao',
                'nod_aval_horario',
                'nod_contagem_tempo',
                'nod_ciencia_calculo'
            ],
            logging: false
        });
        return res.json(nodos);
    }

    async findOne(req, res) {
        const nodo = await Nodo.findByPk(req.params.id, { logging: false });
        if (!nodo) {
            return res.status(400).json({ error: 'Nodo não encontrado' });
        }
        return res.json(nodo);
    }

    async gridNodo(req, res) {
        const gridNodos = await VNodo.findAll({
            where: {
                flu_id: req.params.fluId
            },
            order: ['nod_ordem'],
            attributes: [
                'nod_id',
                'nod_inicio',
                'flu_id',
                'area_id',
                'nod_fim',
                'fluxo',
                'area',
                'inicio',
                'fim',
                'nod_dias_prazo',
                'nod_ordem',
                'nod_aval_executiva',
                'aval_executiva',
                'nod_decisao',
                'decisao',
                'nod_interessado',
                'interessado',
                'nod_ciencia',
                'ciencia',
                'nod_averbacao',
                'averbacao',
                'nod_ciencia_averbacao',
                'ciencia_averbacao',
                'nod_aval_horario',
                'aval_horario',
                'nod_contagem_tempo',
                'contagem_tempo',
                'nod_ciencia_calculo',
                'ciencia_calculo'
            ],
            logging: false
        });
        return res.json(gridNodos);
    }

    async store(req, res) {
        const createNodo = new CreateNodoService(Nodo, Fluxo);
        const createAuditoria = new CreateAuditoriaService(Auditoria, DataHoraAtual);

        const nodo = await createNodo.execute(req.body, {
            logging: true
        });

        // auditoria de inserção
        const { url, headers } = req;
        const { usuario } = headers;
        const clientIP = req.headers['x-forwarded-for'] || req.connection.remoteAddress;
        await createAuditoria.execute(req.body, url, usuario, clientIP, 'I', nodo.nod_id);
        //

        return res.json(nodo);
    }

    async update(req, res) {
        const createAuditoria = new CreateAuditoriaService(Auditoria, DataHoraAtual);

        const updateNodo = new UpdateNodoService(Nodo, Fluxo);

        const { id } = req.params;

        const {
            nod_inicio,
            nod_fim,
            flu_id,
            area_id,
            nod_dias_prazo,
            nod_ordem,
            nod_aval_executiva,
            nod_decisao,
            nod_interessado,
            nod_ciencia,
            nod_averbacao,
            nod_ciencia_averbacao,
            nod_aval_horario,
            nod_contagem_tempo,
            nod_ciencia_calculo
        } = req.body;

        const updatedNodo = await updateNodo.execute({
            id,
            nod_inicio,
            nod_fim,
            flu_id,
            area_id,
            nod_dias_prazo,
            nod_ordem,
            nod_aval_executiva,
            nod_decisao,
            nod_interessado,
            nod_ciencia,
            nod_averbacao,
            nod_ciencia_averbacao,
            nod_aval_horario,
            nod_contagem_tempo,
            nod_ciencia_calculo
        });

        // auditoria de edição
        const { url, headers } = req;
        const { usuario } = headers;
        const clientIP = req.headers['x-forwarded-for'] || req.connection.remoteAddress;

        await createAuditoria.execute(updatedNodo._previousDataValues, url, usuario, clientIP, 'U', id);
        //

        return res.json(updatedNodo);
    }

    async delete(req, res) {
        const createAuditoria = new CreateAuditoriaService(Auditoria, DataHoraAtual);
        const deleteModeloMenu = new DeleteNodoService(Nodo);

        const { id } = req.params;

        try {
            const nodo = await deleteModeloMenu.execute({ id });

            // auditoria de deleção
            const { url, headers } = req;
            const { usuario } = headers;
            const clientIP = req.headers['x-forwarded-for'] || req.connection.remoteAddress;
            await createAuditoria.execute(nodo._previousDataValues, url, usuario, clientIP, 'D', id);
            //
        } catch (err) {
            throw new AppError('Erro ao excluir nodo. O nodo menu possui uma ou mais ligações.');
        }

        return res.send();
    }
}
export default new NodoController();
