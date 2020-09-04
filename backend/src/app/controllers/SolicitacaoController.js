import VFornecedores from '../models/VFornecedores';
import AcessoFornecedores from '../models/AcessoFornecedores';
import VAutorizacaoFornecimento from '../models/VAutorizacaoFornecimento';
import VEmpenhoFornecedor from '../models/VEmpenhoFornecedor';
import VTipoDocumento from '../models/VTipoDocumento';
import Sequelize from 'sequelize';

class SolicitacaoController {
    async gridSolicitacao(req, res) {
        const { cnpj } = req.params;
        const fornecedor = await VFornecedores.findOne({
            where: {
                for_cnpj_cpf: cnpj
            },
            logging: true,
            plain: true
        });
        if (fornecedor !== null) {
            const idFornecedor = fornecedor.dataValues.for_id;
            const solicitacoes = await VAutorizacaoFornecimento.findAll({
                order: ['afo_data'],
                attributes: [
                    'afo_id',
                    'for_id',
                    'afo_autorizacao',
                    'afo_numero_nad',
                    [Sequelize.fn('to_char', Sequelize.col('afo_data'), 'DD/MM/YYYY'), 'afo_data'],
                    [Sequelize.fn('to_char', Sequelize.col('afo_valor_global'), '99990D99'), 'afo_valor_global'],
                    [Sequelize.fn('to_char', Sequelize.col('afo_data_liquidacao'), 'DD/MM/YYYY'), 'afo_data_liquidacao'],
                    'afo_data_liquidacao'
                ],
                where: {
                    for_id: idFornecedor
                },
                logging: true
            });
            return res.json(solicitacoes);
        } else {
            return res.status(400).json({ erro: 'Fornecedor não encontrado' });
        }
    }

    async gridEmpenhoFornecedor(req, res) {
        const { cnpj } = req.params;
        const fornecedor = await VFornecedores.findOne({
            where: {
                for_cnpj_cpf: cnpj
            },
            logging: true,
            plain: true
        });
        if (fornecedor !== null) {
            const idFornecedor = fornecedor.dataValues.for_id;
            const empenhos = await VEmpenhoFornecedor.findAll({
                order: ['emf_data_emissao'],
                attributes: [
                    'emf_id',
                    'emf_numero_empenho',
                    'emf_ano_empenho',
                    'for_id',
                    [Sequelize.fn('to_char', Sequelize.col('emf_valor_global'), '999999990D99'), 'emf_valor_global'],
                    [Sequelize.fn('to_char', Sequelize.col('emf_data_emissao'), 'DD/MM/YYYY'), 'emf_data_emissao']
                ],
                where: {
                    for_id: idFornecedor
                },
                logging: true
            });
            return res.json(empenhos);
        } else {
            return res.status(400).json({ erro: 'Fornecedor não encontrado' });
        }
    }

    async listaTipoDocumentos(req, res) {
        let tipoDocumento = null;
        if (Number(req.params.tipo) === 1) {
            const Op = Sequelize.Op;
            tipoDocumento = await VTipoDocumento.findAll({
                where: {
                    tpd_solicitacao_pgto: true,
                    tpd_id: { [Op.notIn]: [50, 51] }
                },
                logging: true
            });
        } else {
            tipoDocumento = await VTipoDocumento.findAll({
                where: {
                    tpd_solicitacao_pgto: true
                },
                logging: true
            });
        }

        if (tipoDocumento !== null) {
            return res.json(tipoDocumento);
        } else {
            return res.status(400).json({ erro: 'Tipo de documento não encontrado' });
        }
    }

    async verificaFornecedor(req, res) {
        const { cnpj } = req.params;
        const acessoFornecedor = await AcessoFornecedores.findOne({
            where: {
                acf_cpf_cnpj: cnpj
            },
            logging: true,
            plain: true
        });
        if (acessoFornecedor !== null) {
            return res.json({ primeiro: false });
        } else {
            return res.json({ primeiro: true });
        }
    }
}
export default new SolicitacaoController();
