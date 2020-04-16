/* eslint-disable consistent-return */
/* eslint-disable func-names */
/* eslint-disable camelcase */
import VDadosProcesso from '../models/VDadosProcesso';

class DadosProcessoController {
    async dadosProcesso(req, res) {
        console.log('id: ' + req.params.id);
        const dadosProcesso = await VDadosProcesso.findAll({
            attributes: [
                'pro_id',
                'pro_codigo',
                'pro_nome',
                'pro_matricula',
                'cpf',
                'cnpj',
                'pro_fone',
                'pro_celular',
                'pro_email',
                'pro_encerramento',
                'pro_assunto',
                'pro_numero',
                'pro_autuacao',
                'usu_autuador',
                'pro_ultimo_tramite',
                'usu_finalizador',
                'usu_alteracao',
                'usu_data_hora_alteracao',
                'nod_id',
                'set_id_autuador',
                'area_id',
                'set_id_finalizador',
                'pro_iniciativa',
                'pro_tipo_iniciativa',
                'area_id_iniciativa',
                'tpr_id',
                'pro_contato_pj',
                'pro_ano',
                'tpr_nome',
                'tpr_visualizacao',
                'gen_nome',
                'flu_id',
                'flu_nome',
                'area_atual_processo',
                'area_iniciativa_processo',
                'setor_autuador_processo',
                'setor_finalizador_processo',
                'visualizacao'
            ],
            logging: true,
            plain: true,
            where: {
                pro_id: req.params.id
            }
        });
        return res.json(dadosProcesso);
    }

    async processoPorCodigo(req, res) {
        const dadosProcesso = await VDadosProcesso.findAll({
            attributes: [
                'pro_id',
                'pro_codigo'
            ],
            logging: false,
            plain: true,
            where: {
                pro_codigo: req.body.proCodigo
            }
        });
        return res.json(dadosProcesso);
    }
}
export default new DadosProcessoController();
