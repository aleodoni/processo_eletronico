/* eslint-disable consistent-return */
/* eslint-disable func-names */
/* eslint-disable camelcase */
import MembroComissao from '../models/MembroComissao';
import Setor from '../models/Setor';
import VMembrosComissao from '../models/VMembrosComissao';
import Auditoria from '../models/Auditoria';
import DataHoraAtual from '../models/DataHoraAtual';
import CreateMembroComissaoService from '../services/membroComissao/CreateMembroComissaoService';
import UpdateMembroComissaoService from '../services/membroComissao/UpdateMembroComissaoService';
import DeleteMembroComissaoService from '../services/membroComissao/DeleteMembroComissaoService';
import CreateAuditoriaService from '../services/auditoria/CreateAuditoriaService';
import AppError from '../error/AppError';

class MembroComissaoController {
    async index(req, res) {
        const membrosComissao = await MembroComissao.findAll({
            order: ['mco_nome'],
            attributes: ['mco_id', 'area_id', 'mco_matricula', 'mco_nome', 'mco_area_id_membro', 'mco_ativo', 'mco_login'],
            logging: false
        });
        return res.json(membrosComissao);
    }

    async comissao(req, res) {
        const comissao = await Setor.findAll({
            order: ['set_nome'],
            where: {
                set_tipo: 'C'
            },
            attributes: ['set_id_area', 'set_nome', 'set_tipo'],
            logging: false
        });
        return res.json(comissao);
    }

    async gridMembrosComissao(req, res) {
        const membrosComissao = await VMembrosComissao.findAll({
            order: ['set_nome'],
            where: {
                area_id: req.params.id
            },
            attributes: ['mco_id',
                'area_id',
                'mco_matricula',
                'mco_area_id_membro',
                'mco_nome',
                'mco_login',
                'set_nome',
                'mco_ativo',
                'ativo'],
            logging: false
        });
        return res.json(membrosComissao);
    }

    async store(req, res) {
        const createMembroComissao = new CreateMembroComissaoService(MembroComissao, Setor);
        const createAuditoria = new CreateAuditoriaService(Auditoria, DataHoraAtual);

        const membroComissao = await createMembroComissao.execute(req.body);

        // auditoria de inserção
        const { url, headers } = req;
        const { usuario } = headers;
        const clientIP = req.headers['x-forwarded-for'] || req.connection.remoteAddress;
        await createAuditoria.execute(req.body, url, usuario, clientIP, 'I', MembroComissao.mco_id);
        //

        return res.json(membroComissao);
    }

    async update(req, res) {
        const createAuditoria = new CreateAuditoriaService(Auditoria, DataHoraAtual);

        const updateMembroComissao = new UpdateMembroComissaoService(MembroComissao, Setor);

        const { id } = req.params;
        req.body.mco_id = id;
        const { mco_id, area_id, mco_matricula, mco_nome, mco_area_id_membro, mco_ativo, mco_login } = req.body;

        const updatedMembroComissao = await updateMembroComissao.execute({ mco_id, area_id, mco_matricula, mco_nome, mco_area_id_membro, mco_ativo, mco_login });

        // auditoria de edição
        const { url, headers } = req;
        const { usuario } = headers;
        const clientIP = req.headers['x-forwarded-for'] || req.connection.remoteAddress;

        await createAuditoria.execute(updatedMembroComissao._previousDataValues, url, usuario, clientIP, 'U', id);
        //

        return res.json(updatedMembroComissao);
    }

    async delete(req, res) {
        const createAuditoria = new CreateAuditoriaService(Auditoria, DataHoraAtual);
        const deleteMembroComissao = new DeleteMembroComissaoService(MembroComissao);

        const { id } = req.params;

        try {
            const membroComissao = await deleteMembroComissao.execute({ mco_id: id });

            // auditoria de deleção
            const { url, headers } = req;
            const { usuario } = headers;
            const clientIP = req.headers['x-forwarded-for'] || req.connection.remoteAddress;
            await createAuditoria.execute(membroComissao._previousDataValues, url, usuario, clientIP, 'D', id);
            //
        } catch (err) {
            throw new AppError('Erro ao excluir o membro de comissão. O membro possui uma ou mais ligações.');
        }

        return res.send();
    }
}
export default new MembroComissaoController();
