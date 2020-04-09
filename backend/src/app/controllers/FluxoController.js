/* eslint-disable consistent-return */
/* eslint-disable func-names */
/* eslint-disable camelcase */
import Fluxo from '../models/Fluxo';
import AuditoriaController from './AuditoriaController';

class FluxoController {
    async index(req, res) {
        const fluxos = await Fluxo.findAll({
            order: ['flu_nome'],
            attributes: ['flu_id', 'flu_nome'],
            logging: false
        });
        return res.json(fluxos);
    }

    async store(req, res) {
        const { flu_id, flu_nome } = await Fluxo.create(req.body, {
            logging: false
        });
        // auditoria de inserção
        AuditoriaController.audita(req.body, req, 'I', flu_id);
        //
        return res.json({
            flu_id,
            flu_nome
        });
    }

    async update(req, res) {
        const fluxo = await Fluxo.findByPk(req.params.id, { logging: false });
        // auditoria de edição
        AuditoriaController.audita(
            fluxo._previousDataValues,
            req,
            'U',
            req.params.id
        );
        //
        if (!fluxo) {
            return res.status(400).json({ error: 'Fluxo não encontrado' });
        }
        await fluxo.update(req.body, { logging: false });
        return res.json(fluxo);
    }

    async delete(req, res) {
        const fluxo = await Fluxo.findByPk(req.params.id, { logging: false });
        if (!fluxo) {
            return res.status(400).json({ error: 'Fluxo não encontrado' });
        }
        await fluxo
            .destroy({ logging: false })
            .then(auditoria => {
                // auditoria de deleção
                AuditoriaController.audita(
                    fluxo._previousDataValues,
                    req,
                    'D',
                    req.params.id
                );
                //
            })
            .catch(function(err) {
                if (err.toString().includes('SequelizeForeignKeyConstraintError')) {
                    return res.status(400).json({
                        error: 'Erro ao excluir fluxo. O fluxo possui uma ou mais ligações.'
                    });
                }
            });
        return res.send();
    }
}
export default new FluxoController();
