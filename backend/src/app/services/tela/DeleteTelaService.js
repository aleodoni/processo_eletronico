import AppError from '../../error/AppError';

class DeleteTelaService {
    constructor(telaModel) {
        this.telaModel = telaModel;
    }

    async execute({ id }) {
        const tela = await this.telaModel.findByPk(id, { logging: false });

        if (!tela) {
            throw new AppError('Tela não encontrada');
        }

        try {
            await tela.destroy({ where: { tel_id: id } });
        } catch (err) {
            throw new AppError('Erro ao excluir Tela. A tela possui uma ou mais ligações.');
        }

        return tela;
    }
}

export default DeleteTelaService;
