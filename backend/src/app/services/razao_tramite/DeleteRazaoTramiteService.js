import AppError from '../../error/AppError';

class DeleteRazaoTramiteService {
    constructor(razaoTramiteModel) {
        this.razaoTramiteModel = razaoTramiteModel;
    }

    async execute({ id }) {
        const razaoTramite = await this.razaoTramiteModel.findByPk(id, {});

        if (!razaoTramite) {
            throw new AppError('Razão trâmite não encontrada');
        }

        await razaoTramite.destroy({ where: { reg_id: id } });

        return razaoTramite;
    }
}

export default DeleteRazaoTramiteService;
