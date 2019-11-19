/* eslint-disable consistent-return */
/* eslint-disable func-names */
import AreaTela from '../models/AreaTela';

class AreaTelaController {
  async telasPorArea(req, res) {
    const setor = await AreaTela.findAll(
      { where: {
          set_id: req.params.setId,
      },
      logging: false 
    });
    if (!setor) {
      return res.status(400).json({ error: '´Telas da área não encontrada' });
    }
    return res.json(setor);
  }
}
export default new AreaTelaController();
