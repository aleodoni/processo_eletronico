/* eslint-disable consistent-return */
/* eslint-disable func-names */
/* eslint-disable camelcase */
import Setor from '../models/Setor';
// import Auditoria from '../models/Auditoria';
// import DataHoraAtual from '../models/DataHoraAtual';
import CreateSetorService from '../services/setor/CreateSetorService';
import UpdateSetorService from '../services/setor/UpdateSetorService';
import DeleteSetorService from '../services/setor/DeleteSetorService';
// import CreateAuditoriaService from '../services/auditoria/CreateAuditoriaService';

// import AuditoriaController from './AuditoriaController';

class SetorController {
    async index(req, res) {
        const setores = await Setor.findAll({
            order: ['set_nome'],
            attributes: ['set_id', 'set_id_area', 'set_nome', 'set_sigla', 'set_ativo', 'set_tipo'],
            logging: false
        });
        return res.json(setores);
    }

    async store(req, res) {
        const createSetor = new CreateSetorService(Setor);
        // const createAuditoria = new CreateAuditoriaService(Auditoria, DataHoraAtual);

        const { set_id, set_nome, set_sigla, set_id_area, set_ativo, set_tipo } = await createSetor.execute(req.body, {
            logging: false
        });

        // auditoria de inserção
        // const { url, headers } = req;
        // const { usuario } = headers;
        // const clientIP = req.headers['x-forwarded-for'] || req.connection.remoteAddress;
        // await createAuditoria.execute(req.body, url, usuario, clientIP, 'I', set_id);
        //

        return res.json({
            set_id, set_id_area, set_nome, set_sigla, set_ativo, set_tipo
        });
    }

    async update(req, res) {
        const updateSetor = new UpdateSetorService(Setor);
        // const createAuditoria = new CreateAuditoriaService(Auditoria, DataHoraAtual);

        const { id } = req.params;
        const { set_nome, set_sigla, set_id_area, set_ativo, set_tipo } = req.body;

        const updatedSetor = await updateSetor.execute({ id, set_nome, set_sigla, set_id_area, set_ativo, set_tipo });

        // auditoria de edição
        // const { url, headers } = req;
        // const { usuario } = headers;
        // const clientIP = req.headers['x-forwarded-for'] || req.connection.remoteAddress;

        // await createAuditoria.execute(updatedSetor._previousDataValues, url, usuario, clientIP, 'U', id);
        //

        return res.json(updatedSetor);
    }

    async delete(req, res) {
        // const createAuditoria = new CreateAuditoriaService(Auditoria, DataHoraAtual);
        const deleteSetor = new DeleteSetorService(Setor);

        const { id } = req.params;

        // const setor = await deleteSetor.execute({ id });
        await deleteSetor.execute({ id });

        // auditoria de deleção
        // const { url, headers } = req;
        // const { usuario } = headers;
        // const clientIP = req.headers['x-forwarded-for'] || req.connection.remoteAddress;
        // await createAuditoria.execute(setor._previousDataValues, url, usuario, clientIP, 'D', id);
        //

        return res.send();
    }
}
export default new SetorController();
