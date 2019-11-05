import Area from '../models/Area';

class AreaController {
  async index(req, res) {
    const areas = await Area.findAll({
      plain: true,
      logging: false,
    });
    return res.json(areas);
  }
}

export default new AreaController();
