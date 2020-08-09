/* eslint-disable consistent-return */
/* eslint-disable func-names */
import AreaTela from '../models/AreaTela';

import ListAllAreaTelaService from '../services/area_tela/ListAllAreaTelaService';

class AreaTelaController {
    async telasPorArea(req, res) {
        const { setId } = req.params;

        const listAllAreaTela = new ListAllAreaTelaService(AreaTela);

        const setor = await listAllAreaTela.execute({ setId });
        // const setor = await AreaTela.findAll(
        //     {
        //         where: {
        //             set_id: parseInt(req.params.setId, 10)
        //         },
        //         logging: false
        //     });
        // if (!setor) {
        //     return res.status(400).json({ error: '´Telas da área não encontrada' });
        // }
        return res.json(setor);
    }
}
export default new AreaTelaController();
