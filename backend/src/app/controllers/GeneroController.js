import Genero from '../models/Genero';
import VGenero from '../models/VGenero';
import Auditoria from '../models/Auditoria';
import DataHoraAtual from '../models/DataHoraAtual';
import CreateGeneroService from '../services/genero/CreateGeneroService';
import CreateAuditoriaService from '../services/auditoria/CreateAuditoriaService';
import DeleteGeneroService from '../services/genero/DeleteGeneroService';
import UpdateGeneroService from '../services/genero/UpdateGeneroService';
import AppError from '../error/AppError';

class GeneroController {
    async index(req, res) {
        const generos = await Genero.findAll({
            order: ['gen_nome'],
            attributes: ['gen_id', 'gen_nome', 'gen_visivel'],
            where: {
                gen_visivel: true
            },
            logging: false
        });
        return res.json(generos);
    }

    async generoTotal(req, res) {
        const generos = await Genero.findAll({
            order: ['gen_nome'],
            attributes: ['gen_id', 'gen_nome', 'gen_visivel'],
            logging: false
        });
        return res.json(generos);
    }

    async grid(req, res) {
        const generos = await VGenero.findAll({
            order: ['gen_nome'],
            attributes: ['gen_id', 'gen_nome', 'gen_visivel', 'visivel'],
            logging: false
        });
        return res.json(generos);
    }

    async store(req, res) {
        const createGenero = new CreateGeneroService(Genero);
        const createAuditoria = new CreateAuditoriaService(Auditoria, DataHoraAtual);

        const { gen_id, gen_nome, gen_visivel } = await createGenero.execute(req.body);

        // auditoria de inserção
        const { url, headers } = req;
        const { usuario } = headers;
        const clientIP = req.headers['x-forwarded-for'] || req.connection.remoteAddress;
        await createAuditoria.execute(req.body, url, usuario, clientIP, 'I', gen_id);
        //

        return res.json({
            gen_id,
            gen_nome,
            gen_visivel
        });
    }

    async update(req, res) {
        const createAuditoria = new CreateAuditoriaService(Auditoria, DataHoraAtual);
        const updateGenero = new UpdateGeneroService(Genero);

        const { id } = req.params;
        const { gen_nome, gen_visivel } = req.body;

        const updatedGenero = await updateGenero.execute({ id, gen_nome, gen_visivel });

        // auditoria de edição
        const { url, headers } = req;
        const { usuario } = headers;
        const clientIP = req.headers['x-forwarded-for'] || req.connection.remoteAddress;

        await createAuditoria.execute(updatedGenero._previousDataValues, url, usuario, clientIP, 'U', req.params.id);
        //

        return res.json(updatedGenero);
    }

    async delete(req, res) {
        const createAuditoria = new CreateAuditoriaService(Auditoria, DataHoraAtual);
        const deleteGenero = new DeleteGeneroService(Genero);

        const { id } = req.params;

        try {
            const genero = await deleteGenero.execute({ id });

            // auditoria de deleção
            const { url, headers } = req;
            const { usuario } = headers;
            const clientIP = req.headers['x-forwarded-for'] || req.connection.remoteAddress;
            await createAuditoria.execute(genero._previousDataValues, url, usuario, clientIP, 'D', req.params.id);
            //
        } catch (err) {
            throw new AppError('Erro ao excluir gênero. O gênero possui uma ou mais ligações.');
        }

        return res.send();
    }
}
export default new GeneroController();
