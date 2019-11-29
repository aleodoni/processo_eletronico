/* eslint-disable consistent-return */
/* eslint-disable func-names */
/* eslint-disable camelcase */
import Genero from '../models/Genero';
import GeneroValidator from '../validators/GeneroValidator';
import AuditoriaController from './AuditoriaController';

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
        const validator = new GeneroValidator();
        if (!(await validator.validate(req))) {
            return res.status(400).json({ error: validator.errors });
        }
        const { gen_id, gen_nome } = await Genero.create(req.body, {
            logging: false
        });
        // auditoria de inserção
        AuditoriaController.audita(req.body, req, 'I', gen_id);
        //
        return res.json({
            gen_id,
            gen_nome
        });
    }

    async update(req, res) {
        const validator = new GeneroValidator();
        if (!(await validator.validate(req))) {
            return res.status(400).json({ error: validator.errors });
        }
        const genero = await Genero.findByPk(req.params.id, { logging: false });
        // auditoria de edição
        AuditoriaController.audita(
            genero._previousDataValues,
            req,
            'U',
            req.params.id
        );
        //
        if (!genero) {
            return res.status(400).json({ error: 'Gênero não encontrado' });
        }
        await genero.update(req.body, { logging: false });
        return res.json(genero);
    }

    async delete(req, res) {
        const genero = await Genero.findByPk(req.params.id, { logging: false });
        if (!genero) {
            return res.status(400).json({ error: 'Gênero não encontrado' });
        }
        await genero
            .destroy({ logging: false })
            .then(auditoria => {
                // auditoria de deleção
                AuditoriaController.audita(
                    genero._previousDataValues,
                    req,
                    'D',
                    req.params.id
                );
                //
            })
            .catch(function(err) {
                if (err.toString().includes('SequelizeForeignKeyConstraintError')) {
                    return res.status(400).json({
                        error: 'Erro ao excluir gênero. O gênero possui uma ou mais ligações.'
                    });
                }
            });
        return res.send();
    }
}
export default new GeneroController();
