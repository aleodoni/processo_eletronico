/* eslint-disable consistent-return */
/* eslint-disable func-names */
import TipoIniciativa from '../models/TipoIniciativa';
import VTipoIniciativa from '../models/VTipoIniciativa';
import TipoIniciativaValidator from '../validators/TipoIniciativaValidator';
import AuditoriaController from './AuditoriaController';

class TipoIniciativaController {
  async index(req, res) {
    const tiposIniciativa = await TipoIniciativa.findAll({
      order: ['tin_nome'],
      attributes: ['tin_id', 'tin_nome', 'tin_tipo'],
      logging: false,
    });
    return res.json(tiposIniciativa);
  }

  async listaTiposIniciativa(req, res) {
    const vTiposIniciativa = await VTipoIniciativa.findAll({
      order: ['tin_nome'],
      attributes: ['tin_id', 'tin_nome', 'tin_tipo', 'tipo'],
      logging: false,
    });
    return res.json(vTiposIniciativa);
  }

  async store(req, res) {
    
    const validator = new TipoIniciativaValidator();
    if (!(await validator.validate(req))) {
      return res.status(400).json({ error: validator.errors });
    }
    const { tin_id, tin_nome, tin_tipo } = await TipoIniciativa.create(req.body, {
      logging: false,
    });
    //auditoria de inserção
    AuditoriaController.audita(req.body, req, 'I', tin_id);
    //
    return res.json({
      tin_id, 
      tin_nome, 
      tin_tipo,
    });
  }

  async update(req, res) {
    const validator = new TipoIniciativaValidator();
    if (!(await validator.validate(req))) {
      return res.status(400).json({ error: validator.errors });
    }
    const tipoIniciativa = await TipoIniciativa.findByPk(req.params.id, { logging: false });
    //auditoria de edição
    AuditoriaController.audita(
      tipoIniciativa._previousDataValues,
      req,
      'U',
      req.params.id
    );
    //
    if (!tipoIniciativa) {
      return res.status(400).json({ error: 'Tipo de iniciativa não encontrada' });
    }
    await tipoIniciativa.update(req.body, { logging: false });
    return res.json(tipoIniciativa);
  }

  async delete(req, res) {
    const tipoIniciativa = await TipoIniciativa.findByPk(req.params.id, { logging: false });
    if (!tipoIniciativa) {
      return res.status(400).json({ error: 'Tipo de iniciativa não encontrada' });
    }
    await tipoIniciativa
      .destroy({ logging: false })
      .then(auditoria => {
        //auditoria de deleção
        AuditoriaController.audita(
          tipoIniciativa._previousDataValues,
          req,
          'D',
          req.params.id
        );
        //
      })
      .catch(function(err) {
        if (err.toString().includes('SequelizeForeignKeyConstraintError')) {
          return res.status(400).json({
            error: 'Erro ao excluir tipo de iniciativa. O tipo de iniciativa possui uma ou mais ligações.',
          });
        }
      });
    return res.send();
  }
}
export default new TipoIniciativaController();
