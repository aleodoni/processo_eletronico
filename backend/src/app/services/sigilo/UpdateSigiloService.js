import AppError from '../../error/AppError';

class UpdateSigiloService {
    constructor(sigiloModel, setorModel, tipoProcessoModel) {
        this.sigiloModel = sigiloModel;
        this.setorModel = setorModel;
        this.tipoProcessoModel = tipoProcessoModel;
    }

    async execute({ sig_id, area_id, tpr_id, sig_login }) {
        const sigilo = await this.sigiloModel.findOne({ where: { sig_id: sig_id } }, { logging: false });

        if (!sigilo) {
            throw new AppError('Sigilo não encontrado.');
        }

        const updatedSigilo = await sigilo.update({ sig_id, area_id, tpr_id, sig_login }, { logging: false });

        return updatedSigilo;
    }
}

export default UpdateSigiloService;
