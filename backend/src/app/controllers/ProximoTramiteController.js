/* eslint-disable camelcase */
/* eslint-disable consistent-return */
/* eslint-disable func-names */
import ProximoTramite from '../models/ProximoTramite';
import VNodoFluxo from '../models/VNodoFluxo';
import VProximoTramite from '../models/VProximoTramite';
import { renderDot } from 'render-dot';
// import AuditoriaController from './AuditoriaController';
import ConnectionHelper from '../helpers/ConnectionHelper';

class ProximoTramiteController {
    async index(req, res) {
        const proximosTramites = await ProximoTramite.findAll({
            order: ['prx_id'],
            attributes: ['prx_id', 'prx_prioridade', 'nod_id', 'nod_id_proximo', 'raz_id', 'flu_id'],
            logging: false
        });
        return res.json(proximosTramites);
    }

    async comboNodo(req, res) {
        const nodoFluxos = await VNodoFluxo.findAll({
            where: {
                flu_id: req.params.id
            },
            attributes: ['nod_id', 'flu_id', 'set_nome'],
            logging: false
        });
        return res.json(nodoFluxos);
    }

    async gridProximoTramite(req, res) {
        const gridProximoTramite = await VProximoTramite.findAll({
            where: {
                flu_id: req.params.id
            },
            attributes: ['prx_id', 'flu_id', 'nod_id', 'nod_id_proximo', 'raz_id', 'nodo', 'nodo_proximo', 'raz_nome', 'prx_prioridade'],
            logging: false
        });
        return res.json(gridProximoTramite);
    }

    async selecionaProximoTramite(req, res) {
        const proximoTramite = await ProximoTramite.findByPk(req.params.id, { logging: false });
        if (!proximoTramite) {
            return res.status(400).json({ error: 'Próximo trâmite não encontrado' });
        }
        return res.json(proximoTramite);
    }

    async criaGrafo(req, res) {
        const connection = ConnectionHelper.getConnection();

        // monta o grafo do fluxo passado por parâmetro
        const sql = 'select spa2.grafo_fluxo(' + req.params.id + ')';

        const montaGrafo = await connection.query(sql,
            {
                logging: false,
                plain: true,
                raw: true
            }
        );
        const imagem = await renderDot({
            input: montaGrafo.grafo_fluxo,
            format: 'png'
        });
        const img = Buffer.from(imagem, 'binary');
        return res.send(img);
    }

    async store(req, res) {
        const { prx_id, prx_prioridade, nod_id, nod_id_proximo, raz_id, flu_id } = await ProximoTramite.create(req.body, {
            logging: false
        });
        // auditoria de inserção
        // AuditoriaController.audita(req.body, req, 'I', nod_id);
        //
        return res.json({
            prx_id,
            prx_prioridade,
            nod_id,
            nod_id_proximo,
            raz_id,
            flu_id
        });
    }

    async update(req, res) {
        const proximoTramite = await ProximoTramite.findByPk(req.params.id, { logging: false });
        // auditoria de edição
        // AuditoriaController.audita(
        //    nodo._previousDataValues,
        //    req,
        //    'U',
        //    req.params.id
        // );
        //
        if (!proximoTramite) {
            return res.status(400).json({ error: 'Próximo trâmite não encontrado' });
        }
        await proximoTramite.update(req.body, { logging: false });
        return res.json(proximoTramite);
    }

    async delete(req, res) {
        const proximoTramite = await ProximoTramite.findByPk(req.params.id, { logging: false });
        if (!proximoTramite) {
            return res.status(400).json({ error: 'Próximo trâmite não encontrado' });
        }
        await proximoTramite
            .destroy({ logging: false })
            .then(auditoria => {
                // auditoria de deleção
                // AuditoriaController.audita(
                //    nodo._previousDataValues,
                //    req,
                //    'D',
                //    req.params.id
                // );
                //
            })
            .catch(function(err) {
                if (err.toString().includes('SequelizeForeignKeyConstraintError')) {
                    return res.status(400).json({
                        error: 'Erro ao excluir próximo trâmite. O próximo trâmite possui uma ou mais ligações.'
                    });
                }
            });
        return res.send();
    }
}
export default new ProximoTramiteController();
