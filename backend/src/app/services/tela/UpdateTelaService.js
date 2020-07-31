import AppError from '../../error/AppError';

class UpdateTelaService {
    constructor(telaModel) {
        this.telaModel = telaModel;
    }

    async execute({ id, tel_nome }) {
        const tela = await this.telaModel.findByPk(id, { logging: false });

        if (!tela) {
            throw new AppError('Tela não encontrada.');
        }

        const updatedtela = await tela.update({ tel_nome }, { logging: false });

        return updatedtela;
    }
}

export default UpdateTelaService;
