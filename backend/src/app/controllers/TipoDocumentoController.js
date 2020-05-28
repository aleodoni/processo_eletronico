/* eslint-disable consistent-return */
/* eslint-disable func-names */
/* eslint-disable camelcase */
import TipoDocumento from '../models/TipoDocumento';
// import AuditoriaController from './AuditoriaController';

class TipoDocumentoController {
    async index(req, res) {
        const tiposDocumento = await TipoDocumento.findAll({
            order: ['tpd_nome'],
            attributes: ['tpd_id', 'tpd_nome', 'tpd_visivel'],
            logging: false
        });
        return res.json(tiposDocumento);
    }

    async store(req, res) {
        const { tpd_id, tpd_nome, tpd_visivel } = await TipoDocumento.create(req.body, {
            logging: false
        });
        // auditoria de inserção
        // AuditoriaController.audita(req.body, req, 'I', tpd_id);
        //
        return res.json({
            tpd_id,
            tpd_nome,
            tpd_visivel
        });
    }

    async update(req, res) {
        const tipoDocumento = await TipoDocumento.findByPk(req.params.id, { logging: false });
        // auditoria de edição
        // AuditoriaController.audita(
        //    tipoDocumento._previousDataValues,
        //    req,
        //    'U',
        //    req.params.id
        // );
        //
        if (!tipoDocumento) {
            return res.status(400).json({ error: 'Tipo de documento não encontrado' });
        }
        await tipoDocumento.update(req.body, { logging: false });
        return res.json(tipoDocumento);
    }

    async delete(req, res) {
        const tipoDocumento = await TipoDocumento.findByPk(req.params.id, { logging: false });
        if (!tipoDocumento) {
            return res.status(400).json({ error: 'Tipo de documento não encontrado' });
        }
        await tipoDocumento
            .destroy({ logging: false })
            .then(auditoria => {
                // auditoria de deleção
                // AuditoriaController.audita(
                //    tipoDocumento._previousDataValues,
                //    req,
                //    'D',
                //    req.params.id
                // );
                //
            })
            .catch(function(err) {
                if (err.toString().includes('SequelizeForeignKeyConstraintError')) {
                    return res.status(400).json({
                        error: 'Erro ao excluir tipo de documento. O tipo de documento possui uma ou mais ligações.'
                    });
                }
            });
        return res.send();
    }
}
export default new TipoDocumentoController();
