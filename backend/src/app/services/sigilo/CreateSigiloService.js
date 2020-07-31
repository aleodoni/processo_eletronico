
class CreateSigiloService {
    constructor(sigiloModel, setorModel, tipoProcessoModel) {
        this.sigiloModel = sigiloModel;
        this.setorModel = setorModel;
        this.tipoProcessoModel = tipoProcessoModel;
    }

    async execute({ sig_id, area_id, tpr_id, sig_login }) {
        const sigilo = await this.sigiloModel.create({ sig_id, area_id, tpr_id, sig_login }, {
            logging: false
        });

        return sigilo.toJSON();
    }
}

export default CreateSigiloService;
