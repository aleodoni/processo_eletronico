/* eslint-disable consistent-return */
/* eslint-disable func-names */
import AreaTela from '../models/AreaTela';

class AreaTelaController {
  async index(req, res) {
    const areaTelas = await AreaTela.findAll({
      attributes: ['atl_id', 'set_id', 'tel_id'],
      logging: false,
    });
    return res.json(areaTelas);
  }

  async store(req, res) {
    const { atl_id, set_id, tel_id } = await AreaTela.create(req.body, {
      logging: false,
    });
    return res.json({
      atl_id,
      set_id,
      tel_id,
    });
  }

  async update(req, res) {
    const areaTela = await AreaTela.findByPk(req.params.id, { logging: false });
    if (!areaTela) {
      return res.status(400).json({ error: 'Área de tela não encontrado' });
    }
    await areaTela.update(req.body, { logging: false });
    return res.json(areaTela);
  }

  async delete(req, res) {
    const areaTela = await AreaTela.findByPk(req.params.id, { logging: false });
    if (!areaTela) {
      return res.status(400).json({ error: 'Área de tela não encontrado' });
    }
    await areaTela
      .destroy({ logging: false })
      .then(() => {})
      .catch(function(err) {
        if (err.toString().includes('SequelizeForeignKeyConstraintError')) {
          return res.status(400).json({
            error:
              'Erro ao excluir área de tela. A área de tela possui uma ou mais ligações.',
          });
        }
      });
    return res.send();
  }

  async telaPorArea(req, res) {
    const setor = await AreaTela.findAll(
      { where: {
          tel_id: req.params.id,
          set_id: pesId,
      },
      plain: true,
      logging: true 
    });
    if (!setor) {
      return res.status(400).json({ error: '´Telas da área não encontrada' });
    }
    return res.json(setor);
  }
}
export default new AreaTelaController();
