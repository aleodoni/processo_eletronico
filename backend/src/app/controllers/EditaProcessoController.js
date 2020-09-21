import Processo from '../models/Processo';
import Arquivo from '../models/Arquivo';
import ArquivoProcessoPgto from '../models/ArquivoProcessoPgto';
import ProcessoEmpenho from '../models/ProcessoEmpenho';
import ProcessoNotaFiscal from '../models/ProcessoNotaFiscal';
import ProcessoNAD from '../models/ProcessoNAD';
import ConnectionHelper from '../helpers/ConnectionHelper';
import Sequelize from 'sequelize';

class EditaProcessoController {
    async update(req, res) {
        const transaction = await ConnectionHelper.getTransaction();
        try {
            const processo = await Processo.findByPk(req.params.id, { logging: false });
            if (!processo) {
                return res.status(400).json({ error: 'Processo não encontrado' });
            }

            await processo.update({
                pro_nome: req.body.proNome,
                pro_processo_pai: req.body.proProcessoPai
            }, { logging: false }, { transaction: transaction });

            // apaga todos os empenhos vinculados ao processo para inserir novamente
            await ProcessoEmpenho.destroy({ where: { pro_id_pai: req.params.id } }, { logging: false }, { transaction: transaction });
            // insere novamente os empenhos vinculados ao processo
            const vEmpenhos = req.body.vEmpenhos;

            for (let i = 0; i < vEmpenhos.length; i++) {
                await ProcessoEmpenho.create({
                    pen_id: null,
                    pro_id_pai: vEmpenhos[i].pro_id_pai,
                    pen_empenho: vEmpenhos[i].pen_empenho
                }, {
                    logging: false
                }, { transaction: transaction });
            }

            // apaga todos as notas fiscais vinculadas ao processo para inserir novamente
            await ProcessoNotaFiscal.destroy({ where: { pro_id_pai: req.params.id } }, { logging: false }, { transaction: transaction });
            // insere novamente as notas fiscais vinculados ao processo
            const vNotasFiscais = req.body.vNotasFiscais;

            for (let j = 0; j < vNotasFiscais.length; j++) {
                await ProcessoNotaFiscal.create({
                    pnf_id: null,
                    pro_id_pai: vNotasFiscais[j].pro_id_pai,
                    pnf_nota_fiscal: vNotasFiscais[j].pnf_nota_fiscal
                }, {
                    logging: false
                }, { transaction: transaction });
            }

            // apaga todos as NADs vinculadas ao processo para inserir novamente
            await ProcessoNAD.destroy({ where: { pro_id_pai: req.params.id } }, { logging: false }, { transaction: transaction });
            // insere novamente as NADs vinculados ao processo
            const vNADs = req.body.vNADs;

            for (let k = 0; k < vNADs.length; k++) {
                await ProcessoNAD.create({
                    pna_id: null,
                    pro_id_pai: vNADs[k].pro_id_pai,
                    pna_nad: vNADs[k].pna_nad
                }, {
                    logging: false
                }, { transaction: transaction });
            }

            await transaction.commit();
            return res.json(processo);
        } catch (error) {
            await transaction.rollback();
            console.log(error);
        }
    }

    async listaArquivos(req, res) {
        const arquivos = await ArquivoProcessoPgto.findAll({
            attributes: [
                'arq_id',
                'arq_nome',
                'arq_nome_visivel',
                'pro_id',
                'pro_ano',
                'arq_tipo',
                'arq_doc_id',
                [Sequelize.fn('to_char', Sequelize.col('arq_data'), 'DD/MM/YYYY - HH24:MI'), 'arq_data'],
                'arq_login',
                'arq_hash',
                'arq_cancelado',
                'tpd_id',
                'tpd_nome'
            ],
            logging: true,
            where: {
                pro_id: req.params.proId

            },
            order: ['arq_id']
        });
        return res.json(arquivos);
    }

    async cancelaArquivo(req, res) {
        const arquivo = await Arquivo.findByPk(req.params.id, { logging: false });
        if (!arquivo) {
            return res.status(400).json({ error: 'Arquivo não encontrado' });
        }
        await arquivo.update({ arq_cancelado: true }, { logging: false });
        return res.json(arquivo);
    }

    async insereEmpenho(req, res) {
        const processoEmpenho = await ProcessoEmpenho.create({
            pen_id: null,
            pro_id_pai: req.body.pro_id_pai,
            pen_empenho: req.body.pen_empenho
        }, {
            logging: false
        });
        return res.json(processoEmpenho);
    }

    async insereNotaFiscal(req, res) {
        const processoNotaFiscal = await ProcessoNotaFiscal.create({
            pnf_id: null,
            pro_id_pai: req.body.pro_id_pai,
            pnf_nota_fiscal: req.body.pnf_nota_fiscal
        }, {
            logging: false
        });
        return res.json(processoNotaFiscal);
    }

    async insereNAD(req, res) {
        const processoNAD = await ProcessoNAD.create({
            pna_id: null,
            pro_id_pai: req.body.pro_id_pai,
            pna_nad: req.body.pna_nad
        }, {
            logging: false
        });
        return res.json(processoNAD);
    }

    async apagaEmpenho(req, res) {
        await ProcessoEmpenho.destroy({ where: { pro_id_pai: req.params.id, pen_empenho: req.body.pen_empenho } }, { logging: false });
        return res.send();
    }

    async apagaNotaFiscal(req, res) {
        await ProcessoNotaFiscal.destroy({ where: { pro_id_pai: req.params.id, pnf_nota_fiscal: req.body.pnf_nota_fiscal } }, { logging: false });
        return res.send();
    }

    async apagaNAD(req, res) {
        await ProcessoNAD.destroy({ where: { pro_id_pai: req.params.id, pna_nad: req.body.pna_nad } }, { logging: false });
        return res.send();
    }
}
export default new EditaProcessoController();
