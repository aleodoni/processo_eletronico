import AppError from '../../error/AppError';

class UpdateTelaService {
    constructor(telaModel) {
        this.telaModel = telaModel;
    }

    async execute({ id, tel_nome }) {
        const tela = await this.telaModel.findByPk(id, { logging: true });

        if (!tela) {
            throw new AppError('Tela não encontrada.');
        }

        const updatedtela = await tela.update({ tel_nome }, { logging: true });

        return updatedtela;
    }
}

export default UpdateTelaService;
