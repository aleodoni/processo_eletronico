class CreateRazaoTramiteService {
    constructor(razaoTramiteModel) {
        this.razaoTramiteModel = razaoTramiteModel;
    }

    async execute({ raz_id, raz_nome }) {
        const razaoTramite = await this.razaoTramiteModel.create({ raz_id, raz_nome }, {
            logging: true
        });

        return razaoTramite.toJSON();
    }
}

export default CreateRazaoTramiteService;
