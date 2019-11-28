/* eslint-disable consistent-return */
/* eslint-disable func-names */
import VDadosPessoa from '../models/VDadosPessoa';

class CriaProcessoController {

  async dadosPessoa(req, res) {
    const dadosPessoas = await VDadosPessoa.findAll({
      attributes: ['pes_id', 'pes_celular', 'pes_cpf', 'pes_email', 'fone', 'pes_matricula', 'pes_nome'],
      logging: false,
      plain: true,
      where: {
        pes_matricula: req.params.matricula,
      },
    });
    return res.json(dadosPessoas);
  }

  
}
export default new CriaProcessoController();
