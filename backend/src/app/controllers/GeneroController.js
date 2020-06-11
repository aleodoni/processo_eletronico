import Genero from '../models/Genero';
import Auditoria from '../models/Auditoria';
import DataHoraAtual from '../models/DataHoraAtual';
import CreateGeneroService from '../services/genero/CreateGeneroService';
import CreateAuditoriaService from '../services/auditoria/CreateAuditoriaService';
import DeleteGeneroService from '../services/genero/DeleteGeneroService';
import UpdateGeneroService from '../services/genero/UpdateGeneroService';

class GeneroController {
    async index(req, res) {
        const generos = await Genero.findAll({
            order: ['gen_nome'],
            attributes: ['gen_id', 'gen_nome'],
            logging: false
        });
        return res.json(generos);
    }

    async store(req, res) {
        const createGenero = new CreateGeneroService(Genero);
        const createAuditoria = new CreateAuditoriaService(Auditoria, DataHoraAtual);

        const { gen_id, gen_nome } = await createGenero.execute(req.body);

        // auditoria de inserção
        const { url, headers } = req;
        await createAuditoria.execute(req.body, url, headers.usuario, headers.host, 'I', gen_id);
        //

        return res.json({
            gen_id,
            gen_nome
        });
    }

    async update(req, res) {
        const createAuditoria = new CreateAuditoriaService(Auditoria, DataHoraAtual);

        const updateGenero = new UpdateGeneroService(Genero);

        const { id } = req.params;
        const { gen_nome } = req.body;

        const updatedGenero = await updateGenero.execute({ id, gen_nome });

        // auditoria de edição
        const { url, headers } = req;
        await createAuditoria.execute(updatedGenero._previousDataValues, url, headers.usuario, headers.host, 'U', req.params.id);
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
            await createAuditoria.execute(genero._previousDataValues, url, headers.usuario, headers.host, 'D', req.params.id);
            //
        } catch (err) {
            throw new Error('Erro ao excluir gênero. O gênero possui uma ou mais ligações.');
        }

        return res.send();
    }
}
export default new GeneroController();
