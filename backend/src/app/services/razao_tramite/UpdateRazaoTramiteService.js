import AppError from '../../error/AppError';

class UpdateRazaoTramiteService {
    constructor(razaoTramiteModel) {
        this.razaoTramiteModel = razaoTramiteModel;
    }

    async execute({ id, raz_nome }) {
        const razaoTramite = await this.razaoTramiteModel.findByPk(id, { logging: true });

        if (!razaoTramite) {
            throw new AppError('Razão trâmite não encontrado.');
        }

        const updateRazaoTramite = await razaoTramite.update({ raz_nome }, { logging: true });
        return updateRazaoTramite;
    }
}

export default UpdateRazaoTramiteService;
