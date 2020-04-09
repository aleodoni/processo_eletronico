/* eslint-disable camelcase */
/* eslint-disable consistent-return */
/* eslint-disable func-names */
import Tela from '../models/Tela';
import AuditoriaController from './AuditoriaController';

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
        const { tel_id, tel_nome } = await Tela.create(req.body, {
            logging: false
        });
        // auditoria de inserção
        AuditoriaController.audita(req.body, req, 'I', tel_id);
        //
        return res.json({
            tel_id,
            tel_nome
        });
    }

    async update(req, res) {
        const tela = await Tela.findByPk(req.params.id, { logging: false });
        // auditoria de edição
        AuditoriaController.audita(
            tela._previousDataValues,
            req,
            'U',
            req.params.id
        );
        //
        if (!tela) {
            return res.status(400).json({ error: 'Tela não encontrada' });
        }
        await tela.update(req.body, { logging: false });
        return res.json(tela);
    }

    async delete(req, res) {
        const tela = await Tela.findByPk(req.params.id, { logging: false });
        if (!tela) {
            return res.status(400).json({ error: 'Tela não encontrada' });
        }
        await tela
            .destroy({ logging: false })
            .then(auditoria => {
                // auditoria de deleção
                AuditoriaController.audita(
                    tela._previousDataValues,
                    req,
                    'D',
                    req.params.id
                );
                //
            })
            .catch(function(err) {
                if (err.toString().includes('SequelizeForeignKeyConstraintError')) {
                    return res.status(400).json({
                        error: 'Erro ao excluir tela. A tela possui uma ou mais ligações.'
                    });
                }
            });
        return res.send();
    }
}
export default new TelaController();
