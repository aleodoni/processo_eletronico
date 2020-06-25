import AppError from '../../error/AppError';

class DeleteFluxoService {
    constructor(fluxoModel) {
        this.fluxoModel = fluxoModel;
    }

    async execute({ id }) {
        const fluxo = await this.fluxoModel.findByPk(id, {});

        if (!fluxo) {
            throw new AppError('Fluxo não encontrado');
        }

        await fluxo.destroy({ where: { flu_id: id } });

        return fluxo;
    }
}

export default DeleteFluxoService;
