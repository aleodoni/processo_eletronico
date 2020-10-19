/* eslint-disable consistent-return */
/* eslint-disable func-names */
/* eslint-disable camelcase */
import Lotacao from '../models/Lotacao';
import Setor from '../models/Setor';
import Auditoria from '../models/Auditoria';
import DataHoraAtual from '../models/DataHoraAtual';
import CreateLotacaoService from '../services/lotacao/CreateLotacaoService';
import UpdateLotacaoService from '../services/lotacao/UpdateLotacaoService';
import DeleteLotacaoService from '../services/lotacao/DeleteLotacaoService';
import CreateAuditoriaService from '../services/auditoria/CreateAuditoriaService';
import AppError from '../error/AppError';

class LotacaoController {
    async index(req, res) {
        const lotacoes = await Lotacao.findAll({
            order: ['pes_nome'],
            attributes: ['matricula', 'set_id', 'pes_nome', 'pes_login'],
            logging: false
        });
        return res.json(lotacoes);
    }

    async store(req, res) {
        const createLotacao = new CreateLotacaoService(Lotacao, Setor);
        const createAuditoria = new CreateAuditoriaService(Auditoria, DataHoraAtual);

        const lotacao = await createLotacao.execute(req.body);

        // auditoria de inserção
        const { url, headers } = req;
        const { usuario } = headers;
        const clientIP = req.headers['x-forwarded-for'] || req.connection.remoteAddress;
        await createAuditoria.execute(req.body, url, usuario, clientIP, 'I', lotacao.matricula);
        //

        return res.json(lotacao);
    }

    async update(req, res) {
        const createAuditoria = new CreateAuditoriaService(Auditoria, DataHoraAtual);

        const updateLotacao = new UpdateLotacaoService(Lotacao, Setor);

        const { id } = req.params;
        const { matricula, pes_nome, set_id, pes_login } = req.body;

        const updatedLotacao = await updateLotacao.execute({ matricula, pes_nome, set_id, pes_login });

        // auditoria de edição
        const { url, headers } = req;
        const { usuario } = headers;
        const clientIP = req.headers['x-forwarded-for'] || req.connection.remoteAddress;

        await createAuditoria.execute(updatedLotacao._previousDataValues, url, usuario, clientIP, 'U', id);
        //

        return res.json(updatedLotacao);
    }

    async delete(req, res) {
        const createAuditoria = new CreateAuditoriaService(Auditoria, DataHoraAtual);
        const deleteLotacao = new DeleteLotacaoService(Lotacao);

        const { id } = req.params;

        try {
            const lotacao = await deleteLotacao.execute({ matricula: id });

            // auditoria de deleção
            const { url, headers } = req;
            const { usuario } = headers;
            const clientIP = req.headers['x-forwarded-for'] || req.connection.remoteAddress;
            await createAuditoria.execute(lotacao._previousDataValues, url, usuario, clientIP, 'D', id);
            //
        } catch (err) {
            throw new AppError('Erro ao excluir lotação. A Lotação possui uma ou mais ligações.');
        }

        return res.send();
    }
}
export default new LotacaoController();
