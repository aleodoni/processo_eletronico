/* eslint-disable consistent-return */
/* eslint-disable func-names */
/* eslint-disable camelcase */
import TipoProcesso from '../models/TipoProcesso';
import VTipoProcesso from '../models/VTipoProcesso';
// import AuditoriaController from './AuditoriaController';

class TipoProcessoController {
    async index(req, res) {
        const tiposProcesso = await TipoProcesso.findAll({
            order: ['tpr_nome'],
            attributes: ['tpr_id', 'tpr_nome', 'tpr_visualizacao', 'gen_id', 'flu_id', 'tpr_pessoal', 'tpr_prazo_recurso'],
            logging: false
        });
        return res.json(tiposProcesso);
    }

    async carregaPorGenero(req, res) {
        const tiposProcesso = await TipoProcesso.findAll({
            where: {
                gen_id: req.params.genId
            },
            order: ['tpr_nome'],
            attributes: ['tpr_id', 'tpr_nome', 'tpr_visualizacao', 'gen_id', 'flu_id', 'tpr_pessoal'],
            logging: false
        });
        return res.json(tiposProcesso);
    }

    async listaTiposProcesso(req, res) {
        const vTiposProcesso = await VTipoProcesso.findAll({
            order: ['tpr_nome'],
            attributes: ['tpr_id', 'tpr_nome', 'tpr_visualizacao', 'gen_id', 'visualizacao', 'gen_nome', 'flu_id', 'flu_nome', 'tpr_pessoal', 'pessoal', 'tpr_prazo_recurso'],
            logging: false
        });
        return res.json(vTiposProcesso);
    }

    async store(req, res) {
        const { tpr_id, tpr_nome, tpr_visualizacao, gen_id, flu_id, tpr_pessoal, tpr_prazo_recurso } = await TipoProcesso.create(req.body, {
            logging: false
        });
        // auditoria de inserção
        // AuditoriaController.audita(req.body, req, 'I', tpr_id);
        //
        return res.json({
            tpr_id,
            tpr_nome,
            tpr_visualizacao,
            gen_id,
            flu_id,
            tpr_pessoal,
            tpr_prazo_recurso
        });
    }

    async update(req, res) {
        const tipoProcesso = await TipoProcesso.findByPk(req.params.id, { logging: false });
        // auditoria de edição
        // AuditoriaController.audita(
        //    tipoProcesso._previousDataValues,
        //    req,
        //    'U',
        //    req.params.id
        // );
        //
        if (!tipoProcesso) {
            return res.status(400).json({ error: 'Tipo de processo não encontrado' });
        }
        await tipoProcesso.update(req.body, { logging: false });
        return res.json(tipoProcesso);
    }

    async delete(req, res) {
        const tipoProcesso = await TipoProcesso.findByPk(req.params.id, { logging: false });
        if (!tipoProcesso) {
            return res.status(400).json({ error: 'Tipo de processo não encontrado' });
        }
        await tipoProcesso
            .destroy({ logging: false })
            .then(auditoria => {
                // auditoria de deleção
                // AuditoriaController.audita(
                //    tipoProcesso._previousDataValues,
                //    req,
                //    'D',
                //    req.params.id
                // );
                //
            })
            .catch(function(err) {
                if (err.toString().includes('SequelizeForeignKeyConstraintError')) {
                    return res.status(400).json({
                        error: 'Erro ao excluir tipo de processo. O tipo de processo possui uma ou mais ligações.'
                    });
                }
            });
        return res.send();
    }
}
export default new TipoProcessoController();
