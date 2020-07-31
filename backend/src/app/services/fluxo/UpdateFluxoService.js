import AppError from '../../error/AppError';

class UpdateFluxoService {
    constructor(fluxoModel) {
        this.fluxoModel = fluxoModel;
    }

    async execute({ id, flu_nome }) {
        const fluxo = await this.fluxoModel.findByPk(id, { logging: false });

        if (!fluxo) {
            throw new AppError('Fluxo não encontrado.');
        }

        const updatedFluxo = await fluxo.update({ flu_nome }, { logging: false });
        return updatedFluxo;
    }
}

export default UpdateFluxoService;
