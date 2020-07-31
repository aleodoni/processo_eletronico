class CreateRegraAposentacaoService {
    constructor(regraAposentacaoModel) {
        this.regraAposentacaoModel = regraAposentacaoModel;
    }

    async execute({ reg_id, reg_nome }) {
        const regraAposentacao = await this.regraAposentacaoModel.create({ reg_id, reg_nome }, {
            logging: true
        });

        return regraAposentacao.toJSON();
    }
}

export default CreateRegraAposentacaoService;
