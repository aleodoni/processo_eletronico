import VFornecedores from '../models/VFornecedores';
import VAutorizacaoFornecimento from '../models/VAutorizacaoFornecimento';
import VTipoDocumento from '../models/VTipoDocumento';
import Sequelize from 'sequelize';

class SolicitacaoController {
    mascaraCnpj(valor) {
        return valor.replace(/(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})/g, '$1.$2.$3/$4-$5');
    }

    async gridSolicitacao(req, res) {
        const { cnpj } = req.params;
        const novoCnpj = cnpj.replace(/^(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})/, '$1.$2.$3/$4-$5');
        console.log(novoCnpj);
        const fornecedor = await VFornecedores.findOne({
            where: {
                for_cnpj: novoCnpj
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
                    'afo_requisicao',
                    'afo_numero_nad',
                    'afo_empenho',
                    'afo_data',
                    'afo_valor_global',
                    'afo_tipo_requisicao'
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

    async listaTipoDocumentos(req, res) {
        let tipoDocumento = null;
        if (Number(req.params.tipo) === 1) {
            const Op = Sequelize.Op;
            tipoDocumento = await VTipoDocumento.findAll({
                where: {
                    tpd_solicitacao_pgto: true,
                    tpd_id: { [Op.notIn]: [46, 47] }
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
}
export default new SolicitacaoController();
