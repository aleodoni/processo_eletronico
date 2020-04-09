/* eslint-disable consistent-return */
/* eslint-disable func-names */
/* eslint-disable camelcase */
import TipoManifestacao from '../models/TipoManifestacao';
// import AuditoriaController from './AuditoriaController';

class TipoManifestacaoController {
    async index(req, res) {
        const tiposManifestacao = await TipoManifestacao.findAll({
            order: ['tmn_nome'],
            attributes: ['tmn_id', 'tmn_nome'],
            logging: false
        });
        return res.json(tiposManifestacao);
    }

    async store(req, res) {
        const { tmn_id, tmn_nome } = await TipoManifestacao.create(req.body, {
            logging: false
        });
        // auditoria de inserção
        // AuditoriaController.audita(req.body, req, 'I', tmn_id);
        //
        return res.json({
            tmn_id,
            tmn_nome
        });
    }

    async update(req, res) {
        const tipoManifestacao = await TipoManifestacao.findByPk(req.params.id, { logging: false });
        // auditoria de edição
        // AuditoriaController.audita(
        //    tipoManifestacao._previousDataValues,
        //    req,
        //    'U',
        //    req.params.id
        // );
        //
        if (!tipoManifestacao) {
            return res.status(400).json({ error: 'Tipo de manifestação não encontrada' });
        }
        await tipoManifestacao.update(req.body, { logging: false });
        return res.json(tipoManifestacao);
    }

    async delete(req, res) {
        const tipoManifestacao = await TipoManifestacao.findByPk(req.params.id, { logging: false });
        if (!tipoManifestacao) {
            return res.status(400).json({ error: 'Tipo de manifestação não encontrada' });
        }
        await tipoManifestacao
            .destroy({ logging: false })
            .then(auditoria => {
                // auditoria de deleção
                // AuditoriaController.audita(
                //    tipoManifestacao._previousDataValues,
                //    req,
                //    'D',
                //    req.params.id
                // );
                //
            })
            .catch(function(err) {
                if (err.toString().includes('SequelizeForeignKeyConstraintError')) {
                    return res.status(400).json({
                        error: 'Erro ao excluir tipo de manifestação. O tipo de manifestação possui uma ou mais ligações.'
                    });
                }
            });
        return res.send();
    }
}
export default new TipoManifestacaoController();
