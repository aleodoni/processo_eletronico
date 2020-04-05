/* eslint-disable consistent-return */
/* eslint-disable func-names */
/* eslint-disable camelcase */
import Setor from '../models/Setor';
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
        console.log('ativo: ' + JSON.stringify(req.body));
        const { set_id, set_nome, set_sigla, set_id_area, set_ativo, set_tipo } = await Setor.create(req.body, {
            logging: false
        });
        // auditoria de inserção
        // AuditoriaController.audita(req.body, req, 'I', set_id);
        //
        return res.json({
            set_id, set_id_area, set_nome, set_sigla, set_ativo, set_tipo
        });
    }

    async update(req, res) {
        const setor = await Setor.findByPk(req.params.id, { logging: true });
        // auditoria de edição
        // AuditoriaController.audita(
        //    setor._previousDataValues,
        //    req,
        //    'U',
        //    req.params.id
        // );
        //
        if (!setor) {
            return res.status(400).json({ error: 'Setor não encontrado' });
        }
        await setor.update(req.body, { logging: false });
        return res.json(setor);
    }

    async delete(req, res) {
        const setor = await Setor.findByPk(req.params.id, { logging: true });
        if (!setor) {
            return res.status(400).json({ error: 'Setor não encontrado' });
        }
        await setor
            .destroy({ logging: false })
            .then(auditoria => {
                // auditoria de deleção
                // AuditoriaController.audita(
                //    setor._previousDataValues,
                //    req,
                //    'D',
                //    req.params.id
                // );
                //
            })
            .catch(function(err) {
                if (err.toString().includes('SequelizeForeignKeyConstraintError')) {
                    return res.status(400).json({
                        error: 'Erro ao excluir setor. O setor possui uma ou mais ligações.'
                    });
                }
            });
        return res.send();
    }
}
export default new SetorController();
