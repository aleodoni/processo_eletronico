/* eslint-disable consistent-return */
/* eslint-disable func-names */
import Fluxo from '../models/Fluxo';
import FluxoValidator from '../validators/FluxoValidator';
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
        const validator = new FluxoValidator();
        if (!(await validator.validate(req))) {
            return res.status(400).json({ error: validator.errors });
        }
        const { fluId, fluNome } = await Fluxo.create(req.body, {
            logging: false
        });
        // auditoria de inserção
        AuditoriaController.audita(req.body, req, 'I', fluId);
        //
        return res.json({
            fluId,
            fluNome
        });
    }

    async update(req, res) {
        const validator = new FluxoValidator();
        if (!(await validator.validate(req))) {
            return res.status(400).json({ error: validator.errors });
        }
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
