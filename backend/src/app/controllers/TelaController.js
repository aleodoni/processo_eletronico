/* eslint-disable camelcase */
/* eslint-disable consistent-return */
/* eslint-disable func-names */
import Tela from '../models/Tela';
// import Auditoria from '../models/Auditoria';
// import DataHoraAtual from '../models/DataHoraAtual';
import CreateTelaService from '../services/tela/CreateTelaService';
import UpdateTelaService from '../services/tela/UpdateTelaService';
import DeleteTelaService from '../services/tela/DeleteTelaService';
// import CreateAuditoriaService from '../services/auditoria/CreateAuditoriaService';

class TelaController {
    async index(req, res) {
        const telas = await Tela.findAll({
            order: ['tel_nome'],
            attributes: ['tel_id', 'tel_nome'],
            logging: false
        });
        return res.json(telas);
    }

    async store(req, res) {
        const createTela = new CreateTelaService(Tela);
        // const createAuditoria = new CreateAuditoriaService(Auditoria, DataHoraAtual);

        const { tel_id, tel_nome } = await createTela.execute(req.body, {
            logging: false
        });

        // auditoria de inserção
        // const { url, headers } = req;
        // const { usuario } = headers;
        // const clientIP = req.headers['x-forwarded-for'] || req.connection.remoteAddress;
        // await createAuditoria.execute(req.body, url, usuario, clientIP, 'I', tel_id);
        //

        return res.json({
            tel_id,
            tel_nome
        });
    }

    async update(req, res) {
        const updateTela = new UpdateTelaService(Tela);
        // const createAuditoria = new CreateAuditoriaService(Auditoria, DataHoraAtual);

        const { id } = req.params;
        const { tel_nome } = req.body;

        const updatedTela = await updateTela.execute({ id, tel_nome });

        // auditoria de edição
        // const { url, headers } = req;
        // const { usuario } = headers;
        // const clientIP = req.headers['x-forwarded-for'] || req.connection.remoteAddress;

        // await createAuditoria.execute(updatedTela._previousDataValues, url, usuario, clientIP, 'U', id);
        //

        return res.json(updatedTela);
    }

    async delete(req, res) {
        // const createAuditoria = new CreateAuditoriaService(Auditoria, DataHoraAtual);
        const deleteTela = new DeleteTelaService(Tela);

        const { id } = req.params;

        // const tela = await deleteTela.execute({ id });
        await deleteTela.execute({ id });

        // auditoria de deleção
        // const { url, headers } = req;
        // const { usuario } = headers;
        // const clientIP = req.headers['x-forwarded-for'] || req.connection.remoteAddress;
        // await createAuditoria.execute(tela._previousDataValues, url, usuario, clientIP, 'D', id);
        //

        return res.send();
    }
}
export default new TelaController();
