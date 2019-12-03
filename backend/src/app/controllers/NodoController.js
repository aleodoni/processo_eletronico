/* eslint-disable camelcase */
/* eslint-disable consistent-return */
/* eslint-disable func-names */
import Nodo from '../models/Nodo';
import AuditoriaController from './AuditoriaController';

class NodoController {
    async index(req, res) {
        const nodos = await Nodo.findAll({
            order: ['nod_id'],
            attributes: ['nod_id', 'nod_inicio', 'flu_id', 'area_id', 'nod_fim'],
            logging: false
        });
        return res.json(nodos);
    }

    async store(req, res) {
        const { nod_id, nod_inicio, flu_id, area_id } = await Nodo.create(req.body, {
            logging: false
        });
        // auditoria de inserção
        AuditoriaController.audita(req.body, req, 'I', nod_id);
        //
        return res.json({
            nod_id,
            nod_inicio,
            flu_id,
            area_id
        });
    }

    async update(req, res) {
        const nodo = await Nodo.findByPk(req.params.id, { logging: false });
        // auditoria de edição
        AuditoriaController.audita(
            nodo._previousDataValues,
            req,
            'U',
            req.params.id
        );
        //
        if (!nodo) {
            return res.status(400).json({ error: 'Nodo não encontrado' });
        }
        await nodo.update(req.body, { logging: false });
        return res.json(nodo);
    }

    async delete(req, res) {
        const nodo = await Nodo.findByPk(req.params.id, { logging: false });
        if (!nodo) {
            return res.status(400).json({ error: 'Nodo não encontrado' });
        }
        await nodo
            .destroy({ logging: false })
            .then(auditoria => {
                // auditoria de deleção
                AuditoriaController.audita(
                    nodo._previousDataValues,
                    req,
                    'D',
                    req.params.id
                );
                //
            })
            .catch(function(err) {
                if (err.toString().includes('SequelizeForeignKeyConstraintError')) {
                    return res.status(400).json({
                        error: 'Erro ao excluir nó. O nó possui uma ou mais ligações.'
                    });
                }
            });
        return res.send();
    }
}
export default new NodoController();
