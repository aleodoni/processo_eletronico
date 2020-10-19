import AppError from '../../error/AppError';

class DeleteSetorService {
    constructor(setorModel) {
        this.setorModel = setorModel;
    }

    async execute({ id }) {
        const setor = await this.setorModel.findByPk(id, { logging: false });

        if (!setor) {
            throw new AppError('Setor não encontrado');
        }

        try {
            await setor.destroy({ where: { gen_id: id } });
        } catch (err) {
            throw new AppError('Erro ao excluir setor. O setor possui uma ou mais ligações.');
        }

        return setor;
    }
}

export default DeleteSetorService;
