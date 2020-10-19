/* eslint-disable consistent-return */
/* eslint-disable func-names */
/* eslint-disable camelcase */
import Sigilo from '../models/Sigilo';
import Setor from '../models/Setor';
import TipoProcesso from '../models/TipoProcesso';
import VSigilo from '../models/VSigilo';
import Auditoria from '../models/Auditoria';
import DataHoraAtual from '../models/DataHoraAtual';
import CreateSigiloService from '../services/sigilo/CreateSigiloService';
import UpdateSigiloService from '../services/sigilo/UpdateSigiloService';
import DeleteSigiloService from '../services/sigilo/DeleteSigiloService';
import CreateAuditoriaService from '../services/auditoria/CreateAuditoriaService';
import AppError from '../error/AppError';

class SigiloController {
    async index(req, res) {
        const sigilo = await Sigilo.findAll({
            order: ['sig_login'],
            attributes: ['sig_id', 'area_id', 'tpr_id', 'sig_login'],
            logging: false
        });
        return res.json(sigilo);
    }

    async area(req, res) {
        const area = await Setor.findAll({
            order: ['set_nome'],
            attributes: ['set_id_area', 'set_nome', 'set_tipo'],
            logging: false
        });
        return res.json(area);
    }

    async tipoProcesso(req, res) {
        const tipoProcesso = await TipoProcesso.findAll({
            order: ['tpr_nome'],
            attributes: ['tpr_id', 'tpr_nome', 'tpr_visualizacao'],
            where: {
                tpr_visualizacao: 2
            },
            logging: false
        });
        return res.json(tipoProcesso);
    }

    async gridSigilo(req, res) {
        try {
            const sigilo = await VSigilo.findAll({
                order: ['set_nome'],
                attributes: ['sig_id',
                    'area_id',
                    'tpr_id',
                    'tpr_nome',
                    'set_nome',
                    'sig_login'],
                logging: false
            });
            return res.json(sigilo);
        } catch (e) {
            console.log(e);
            return null;
        }
    }

    async store(req, res) {
        const createSigilo = new CreateSigiloService(Sigilo, Setor, TipoProcesso);
        const createAuditoria = new CreateAuditoriaService(Auditoria, DataHoraAtual);

        const sigilo = await createSigilo.execute(req.body);

        // auditoria de inserção
        const { url, headers } = req;
        const { usuario } = headers;
        const clientIP = req.headers['x-forwarded-for'] || req.connection.remoteAddress;
        await createAuditoria.execute(req.body, url, usuario, clientIP, 'I', Sigilo.sig_id);
        //

        return res.json(sigilo);
    }

    async update(req, res) {
        const createAuditoria = new CreateAuditoriaService(Auditoria, DataHoraAtual);

        const updateSigilo = new UpdateSigiloService(Sigilo, Setor, TipoProcesso);

        const { id } = req.params;
        req.body.sig_id = id;
        const { sig_id, area_id, tpr_id, sig_login } = req.body;

        const updatedSigilo = await updateSigilo.execute({ sig_id, area_id, tpr_id, sig_login });

        // auditoria de edição
        const { url, headers } = req;
        const { usuario } = headers;
        const clientIP = req.headers['x-forwarded-for'] || req.connection.remoteAddress;

        await createAuditoria.execute(updatedSigilo._previousDataValues, url, usuario, clientIP, 'U', id);
        //

        return res.json(updatedSigilo);
    }

    async delete(req, res) {
        const createAuditoria = new CreateAuditoriaService(Auditoria, DataHoraAtual);
        const deleteSigilo = new DeleteSigiloService(Sigilo);

        const { id } = req.params;

        try {
            const sigilo = await deleteSigilo.execute({ sig_id: id });

            // auditoria de deleção
            const { url, headers } = req;
            const { usuario } = headers;
            const clientIP = req.headers['x-forwarded-for'] || req.connection.remoteAddress;
            await createAuditoria.execute(sigilo._previousDataValues, url, usuario, clientIP, 'D', id);
            //
        } catch (err) {
            throw new AppError('Erro ao excluir o sigilo. O sigilo possui uma ou mais ligações.');
        }

        return res.send();
    }
}
export default new SigiloController();
