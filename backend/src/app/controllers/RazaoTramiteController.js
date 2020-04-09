/* eslint-disable consistent-return */
/* eslint-disable func-names */
/* eslint-disable camelcase */
import RazaoTramite from '../models/RazaoTramite';
import AuditoriaController from './AuditoriaController';

class RazaoTramiteController {
    async index(req, res) {
        const razoes = await RazaoTramite.findAll({
            order: ['raz_nome'],
            attributes: ['raz_id', 'raz_nome'],
            logging: false
        });
        return res.json(razoes);
    }

    async store(req, res) {
        const { raz_id, raz_nome } = await RazaoTramite.create(req.body, {
            logging: false
        });
        // auditoria de inserção
        AuditoriaController.audita(req.body, req, 'I', raz_id);
        //
        return res.json({
            raz_id,
            raz_nome
        });
    }

    async update(req, res) {
        const razao = await RazaoTramite.findByPk(req.params.id, { logging: false });
        // auditoria de edição
        AuditoriaController.audita(
            razao._previousDataValues,
            req,
            'U',
            req.params.id
        );
        //
        if (!razao) {
            return res.status(400).json({ error: 'Razão de trâmite não encontrado' });
        }
        await razao.update(req.body, { logging: false });
        return res.json(razao);
    }

    async delete(req, res) {
        const razao = await RazaoTramite.findByPk(req.params.id, { logging: false });
        if (!razao) {
            return res.status(400).json({ error: 'Razão de trâmite não encontrado' });
        }
        await razao
            .destroy({ logging: false })
            .then(auditoria => {
                // auditoria de deleção
                AuditoriaController.audita(
                    razao._previousDataValues,
                    req,
                    'D',
                    req.params.id
                );
                //
            })
            .catch(function(err) {
                if (err.toString().includes('SequelizeForeignKeyConstraintError')) {
                    return res.status(400).json({
                        error: 'Erro ao excluir razão de trâmite. A razão de trâmite possui uma ou mais ligações.'
                    });
                }
            });
        return res.send();
    }
}
export default new RazaoTramiteController();
