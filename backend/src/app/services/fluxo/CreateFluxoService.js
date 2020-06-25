class CreateFluxoService {
    constructor(fluxoModel) {
        this.fluxoModel = fluxoModel;
    }

    async execute({ flu_id, flu_nome }) {
        const fluxo = await this.fluxoModel.create({ flu_id, flu_nome }, {
            logging: false
        });

        return fluxo.toJSON();
    }
}

export default CreateFluxoService;
