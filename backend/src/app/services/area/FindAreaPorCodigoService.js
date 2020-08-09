import AppError from '../../error/AppError';

class FindAreaPorCodigoService {
    constructor(setorModel) {
        this.setorModel = setorModel;
    }

    async execute({ id }) {
        const area = await this.setorModel.findByPk(id, { logging: false });

        if (!area) {
            throw new AppError('Área não encontrada');
        }

        return area;
    }
}

export default FindAreaPorCodigoService;
