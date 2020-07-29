import AppError from '../../error/AppError';

class DeleteSigiloService {
    constructor(sigiloModel) {
        this.sigiloModel = sigiloModel;
    }

    async execute({ sig_id }) {
        const sigilo = await this.sigiloModel.findOne({ where: { sig_id: sig_id } }, { logging: true });

        if (!sigilo) {
            throw new AppError('Sigilo não encontrada.');
        }

        await sigilo.destroy({ where: { sig_id: sig_id } });

        return sigilo;
    }
}

export default DeleteSigiloService;
