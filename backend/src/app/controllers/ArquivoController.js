/* eslint-disable consistent-return */
/* eslint-disable func-names */
/* eslint-disable camelcase */
import Arquivo from '../models/Arquivo';
import AuditoriaController from './AuditoriaController';

class ArquivoController {
    async index(req, res) {
        const arquivos = await Arquivo.findAll({
            order: ['arq_id'],
            attributes: ['arq_id', 'arq_nome', 'pro_id'],
            logging: false,
            where: {
                pro_id: req.params.proId
            }
        });
        return res.json(arquivos);
    }

    async store(req, res) {
        const { arq_id, arq_nome, pro_id, man_id, arq_tipo, arq_doc_id, arq_doc_tipo } = await Arquivo.create(req.body, {
            logging: false
        });
        // auditoria de inserção
        AuditoriaController.audita(req.body, req, 'I', arq_id);
        //
        return res.json({
            arq_id,
            arq_nome,
            pro_id,
            man_id,
            arq_tipo,
            arq_doc_id,
            arq_doc_tipo
        });
    }

    async update(req, res) {
        const arquivo = await Arquivo.findByPk(req.params.id, { logging: false });
        // auditoria de edição
        AuditoriaController.audita(
            arquivo._previousDataValues,
            req,
            'U',
            req.params.id
        );
        //
        if (!arquivo) {
            return res.status(400).json({ error: 'Arquivo não encontrado' });
        }
        await arquivo.update(req.body, { logging: false });
        return res.json(arquivo);
    }

    async delete(req, res) {
        const arquivo = await Arquivo.findByPk(req.params.id, { logging: false });
        if (!arquivo) {
            return res.status(400).json({ error: 'Arquivo não encontrado' });
        }
        await arquivo
            .destroy({ logging: false })
            .then(() => {
                // auditoria de deleção
                AuditoriaController.audita(
                    arquivo._previousDataValues,
                    req,
                    'D',
                    req.params.id
                );
                //
            })
            .catch(function() {
                return res.status(400).json({
                    error: 'Erro ao apagar arquivo.'
                });
            });
        return res.send();
    }
}
export default new ArquivoController();
