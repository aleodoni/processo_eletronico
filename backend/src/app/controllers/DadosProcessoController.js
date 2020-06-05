/* eslint-disable consistent-return */
/* eslint-disable func-names */
/* eslint-disable camelcase */
import VDadosProcesso from '../models/VDadosProcesso';
import VProcessosPessoais from '../models/VProcessosPessoais';
import VProcessosArea from '../models/VProcessosArea';
import VDecisaoPessoal from '../models/VDecisaoPessoal';

class DadosProcessoController {
    async dadosProcesso(req, res) {
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
                'visualizacao',
                'nod_aval_executiva',
                'nod_fim'
            ],
            logging: true,
            where: {
                pro_id: req.params.id
            }
        });
        return res.json(dadosProcesso);
    }

    async pesquisaProcesso(req, res) {
        console.log('######### Início da pesquisa ############');
        const { Op } = require('sequelize');
        const wherePesquisa = {};
        const proMatricula = req.body.pro_matricula;
        const proNome = req.body.pro_nome;
        const proContatoPj = req.body.pro_contato_pj;
        const proCpf = req.body.pro_cpf;
        const proCnpj = req.body.pro_cnpj;
        const proDataIniAutuacao = req.body.pro_data_ini_autuacao;
        const proDataFimAutuacao = req.body.pro_data_fim_autuacao;
        const proNumero = req.body.pro_numero;
        const proAno = req.body.pro_ano;
        const tprId = req.body.tpr_id;
        const areaId = req.body.area_id;
        const areaIdIniciativa = req.body.area_id_iniciativa;

        if (proMatricula !== '') {
            wherePesquisa.pro_matricula = proMatricula;
        }
        if (proNome !== '') {
            wherePesquisa.pro_nome = { [Op.substring]: proNome };
        }
        if (proContatoPj !== '') {
            wherePesquisa.pro_contato_pj = { [Op.substring]: proContatoPj };
        }
        if (proCpf !== '' && proCpf !== undefined) {
            wherePesquisa.cpf = proCpf;
        }
        if (proCnpj !== '' && proCnpj !== undefined) {
            wherePesquisa.cnpj = proCnpj;
        }
        if (proDataIniAutuacao !== '' && proDataIniAutuacao !== undefined && (proDataFimAutuacao === '' || proDataFimAutuacao === undefined)) {
            wherePesquisa.pro_autuacao_data = { [Op.gte]: proDataIniAutuacao };
        }
        if (proDataFimAutuacao !== '' && proDataFimAutuacao !== undefined && (proDataIniAutuacao === '' || proDataIniAutuacao === undefined)) {
            wherePesquisa.pro_autuacao_data = { [Op.lte]: proDataFimAutuacao };
        }
        if ((proDataIniAutuacao !== '' && proDataIniAutuacao !== undefined) && (proDataFimAutuacao !== '' && proDataFimAutuacao !== undefined)) {
            wherePesquisa.pro_autuacao_data = { [Op.between]: [proDataIniAutuacao, proDataFimAutuacao] };
        }
        if (proNumero !== '') {
            wherePesquisa.pro_numero = parseInt(proNumero, 10);
        }
        if (proAno !== '') {
            wherePesquisa.pro_ano = parseInt(proAno, 10);
        }
        if (tprId !== '-1') {
            wherePesquisa.tpr_id = parseInt(tprId, 10);
        }
        if (areaId !== '-1') {
            wherePesquisa.area_id = areaId;
        }
        if (areaIdIniciativa !== '-1') {
            wherePesquisa.area_id_iniciativa = areaIdIniciativa;
        }

        if (Object.entries(wherePesquisa).length === 0) {
            return res.status(412).json({ error: 'Selecione pelo menos um campo para pesquisa.' });
        }

        const pesquisaProcesso = await VDadosProcesso.findAll({
            attributes: [
                'pro_id',
                'pro_codigo',
                'pro_nome',
                'pro_matricula',
                'cpf',
                'cnpj',
                'pro_numero',
                'pro_autuacao',
                'pro_autuacao_data',
                'area_id',
                'pro_iniciativa',
                'pro_tipo_iniciativa',
                'area_id_iniciativa',
                'tpr_id',
                'pro_contato_pj',
                'pro_ano',
                'tpr_nome',
                'gen_nome',
                'area_atual_processo',
                'area_iniciativa_processo',
                'setor_autuador_processo'
            ],
            logging: true,
            where: wherePesquisa
        });
        return res.json(pesquisaProcesso);
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

    async processosPessoais(req, res) {
        const dadosProcessoPessoa = await VProcessosPessoais.findAll({
            attributes: [
                'pro_id',
                'pro_codigo',
                'tpr_nome',
                'area_id',
                'usu_autuador',
                'nod_aval_executiva'
            ],
            logging: true,
            where: {
                area_id: req.params.areaId,
                usu_autuador: req.params.usuario
            }
        });
        return res.json(dadosProcessoPessoa);
    }

    async processosArea(req, res) {
        const dadosProcessoArea = await VProcessosArea.findAll({
            attributes: [
                'pro_id',
                'pro_codigo',
                'tpr_nome',
                'area_id',
                'usu_autuador',
                'nod_aval_executiva',
                'tpr_pessoal',
                'pessoal',
                'nod_fim',
                'nod_decisao',
                'nod_dias_prazo',
                'alerta'
            ],
            logging: true,
            where: {
                area_id: req.params.areaId
            }
        });
        return res.json(dadosProcessoArea);
    }

    async decisaoPessoal(req, res) {
        const decisao = await VDecisaoPessoal.findAll({
            attributes: [
                'pro_id',
                'tpr_id',
                'flu_id',
                'nod_id',
                'area_id',
                'nod_decisao',
                'man_visto_executiva',
                'tpr_prazo_recurso'
            ],
            logging: true,
            plain: true,
            where: {
                pro_id: req.params.id
            }
        });
        return res.send({ visto: decisao.dataValues.man_visto_executiva, prazo: decisao.dataValues.tpr_prazo_recurso });
    }
}
export default new DadosProcessoController();
