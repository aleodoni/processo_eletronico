class CreateAcessoFornecedorService {
    constructor(acessoFornecedorModel) {
        this.acessoFornecedorModel = acessoFornecedorModel;
    }

    async execute({ flu_id, flu_nome }) {
        const acessoFornecedor = await this.acessoFornecedorModel.create({ flu_id, flu_nome }, {
            logging: false
        });

        return acessoFornecedor.toJSON();
    }
}

export default CreateAcessoFornecedorService;
