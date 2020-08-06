import AppError from '../../error/AppError';

class FindSetorPorCodigoService {
    constructor(setorModel) {
        this.setorModel = setorModel;
    }

    async execute({ id }) {
        const setor = await this.setorModel.findByPk(id, { logging: false });

        if (!setor) {
            throw new AppError('Setor não encontrado');
        }

        return setor;
    }
}

export default FindSetorPorCodigoService;
