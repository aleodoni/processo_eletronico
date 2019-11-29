/* eslint-disable consistent-return */
/* eslint-disable func-names */
/* eslint-disable camelcase */
import VDadosPessoa from '../models/VDadosPessoa';
import Processo from '../models/Processo';
import ProcessoValidator from '../validators/ProcessoValidator';
import AuditoriaController from './AuditoriaController';

class CriaProcessoController {
    async dadosPessoa(req, res) {
        const dadosPessoas = await VDadosPessoa.findAll({
            attributes: ['pes_id', 'pes_celular', 'pes_cpf', 'pes_email', 'fone', 'pes_matricula', 'pes_nome'],
            logging: false,
            plain: true,
            where: {
                pes_matricula: req.params.matricula
            }
        });
        return res.json(dadosPessoas);
    }

    async store(req, res) {
        const validator = new ProcessoValidator();
        if (!(await validator.validate(req))) {
            return res.status(400).json({ error: validator.errors });
        }
        const { pro_id, pro_codigo, tpr_id, tin_id, ini_nome, ini_matricula, ini_cpf, ini_cnpj, ini_fone, ini_celular, ini_email, pro_encerramento, pro_assunto, pro_numero, pro_autuacao, usu_autuador, set_id_autuador, area_id, pro_ultimo_tramite, usu_finalizador, set_id_finalizador, usu_alteracao, usu_data_hora_alteracao, nod_id } = await Processo.create(req.body, {
            logging: false
        });
        // auditoria de inserção
        AuditoriaController.audita(req.body, req, 'I', pro_id);
        //
        return res.json({
            pro_id,
            pro_codigo,
            tpr_id,
            tin_id,
            ini_nome,
            ini_matricula,
            ini_cpf,
            ini_cnpj,
            ini_fone,
            ini_celular,
            ini_email,
            pro_encerramento,
            pro_assunto,
            pro_numero,
            pro_autuacao,
            usu_autuador,
            set_id_autuador,
            area_id,
            pro_ultimo_tramite,
            usu_finalizador,
            set_id_finalizador,
            usu_alteracao,
            usu_data_hora_alteracao,
            nod_id
        });
    }
}
export default new CriaProcessoController();
