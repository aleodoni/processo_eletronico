import Processo from '../models/Processo';
import ProcessoEmpenho from '../models/ProcessoEmpenho';
import ProcessoNotaFiscal from '../models/ProcessoNotaFiscal';
import ProcessoNAD from '../models/ProcessoNAD';
import ConnectionHelper from '../helpers/ConnectionHelper';

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
}
export default new EditaProcessoController();
