/* eslint-disable consistent-return */
/* eslint-disable func-names */
/* eslint-disable camelcase */
import Tramite from '../models/Tramite';
import VProcessoEnvia from '../models/VProcessoEnvia';
// import AuditoriaController from './AuditoriaController';

class TramiteController {
    async index(req, res) {
        const tramites = await Tramite.findAll({
            order: ['tra_id'],
            attributes: ['pro_id',
                'pro_codigo',
                'area_id',
                'tpr_nome',
                'raz_id',
                'login_envia',
                'login_recebe',
                'area_id_envia',
                'area_id_recebe',
                'nod_id_envia',
                'nod_id_recebe',
                'tra_observacao',
                'tra_inicial'],
            logging: false
        });
        return res.json(tramites);
    }

    async processosEnvio(req, res) {
        const processos = await VProcessoEnvia.findAll({
            attributes: ['pro_id',
                'pro_codigo',
                'area_id',
                'tpr_nome'],
            where: {
                area_id: req.params.id
            },
            logging: false
        });
        return res.json(processos);
    }

    async store(req, res) {
        const {
            tra_id,
            tra_envio,
            tra_recebimento,
            pro_id,
            raz_id,
            login_envia,
            login_recebe,
            area_id_envia,
            area_id_recebe,
            nod_id_envia,
            nod_id_recebe,
            tra_observacao,
            tra_inicial
        } = await Tramite.create(req.body, {
            logging: false
        });
        // auditoria de inserção
        // AuditoriaController.audita(req.body, req, 'I', tra_id);
        //
        return res.json({
            tra_id,
            tra_envio,
            tra_recebimento,
            pro_id,
            raz_id,
            login_envia,
            login_recebe,
            area_id_envia,
            area_id_recebe,
            nod_id_envia,
            nod_id_recebe,
            tra_observacao,
            tra_inicial
        });
    }

    async update(req, res) {
        const tramite = await Tramite.findByPk(req.params.id, { logging: false });
        // auditoria de edição
        // AuditoriaController.audita(
        //    tramite._previousDataValues,
        //    req,
        //    'U',
        //    req.params.id
        // );
        //
        if (!tramite) {
            return res.status(400).json({ error: 'Trâmite não encontrado' });
        }
        await tramite.update(req.body, { logging: false });
        return res.json(tramite);
    }

    async delete(req, res) {
        const tramite = await Tramite.findByPk(req.params.id, { logging: false });
        if (!tramite) {
            return res.status(400).json({ error: 'Trâmite não encontrado' });
        }
        await tramite
            .destroy({ logging: false })
            .then(auditoria => {
                // auditoria de deleção
                // AuditoriaController.audita(
                //    tramite._previousDataValues,
                //    req,
                //    'D',
                //    req.params.id
                // );
                //
            })
            .catch(function(err) {
                if (err.toString().includes('SequelizeForeignKeyConstraintError')) {
                    return res.status(400).json({
                        error: 'Erro ao excluir trâmite. O trâmite possui uma ou mais ligações.'
                    });
                }
            });
        return res.send();
    }
}
export default new TramiteController();
