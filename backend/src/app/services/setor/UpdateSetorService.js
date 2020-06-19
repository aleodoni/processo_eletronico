import AppError from '../../error/AppError';

class UpdateSetorService {
    constructor(setorModel) {
        this.setorModel = setorModel;
    }

    async execute({ id, set_nome, set_sigla, set_id_area, set_ativo, set_tipo }) {
        const setor = await this.setorModel.findByPk(id, { logging: true });

        if (!setor) {
            throw new AppError('Setor não encontrado.');
        }

        const updatedSetor = await setor.update({ set_nome, set_sigla, set_id_area, set_ativo, set_tipo }, { logging: true });

        return updatedSetor;
    }
}

export default UpdateSetorService;
