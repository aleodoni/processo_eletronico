import Processo from '../models/Processo';
import ProcessoEmpenho from '../models/ProcessoEmpenho';
import ConnectionHelper from '../../helpers/ConnectionHelper';

class EditaProcessoController {
    async update(req, res) {
        try {
            const processo = await Processo.findByPk(req.params.id, { logging: false });
            if (!processo) {
                return res.status(400).json({ error: 'Processo não encontrado' });
            }
            const transaction = await ConnectionHelper.getTransaction();
            await processo.update({
                pro_nome: req.body.proNome,
                pro_processo_pai: req.body.proProcessoPai
            }, { logging: false }, { transaction: transaction });

            // apaga todos os empenhos vinculados ao processo para inserir novamente
            await ProcessoEmpenho.destroy({ where: { pro_id_pai: req.params.id } }, { logging: false }, { transaction: transaction });
            // insere novamente os empenhos vinculados ao processo

            await transaction.commit();
            return res.json(processo);
        } catch (error) {
            console.log(error);
        }
    }
}
export default new EditaProcessoController();
