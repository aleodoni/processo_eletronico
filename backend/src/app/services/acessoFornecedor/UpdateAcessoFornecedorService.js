import AppError from '../../error/AppError';

class UpdateAcessoFornecedorService {
    constructor(acessoFornecedorModel) {
        this.acessoFornecedorModel = acessoFornecedorModel;
    }

    async execute({ id, flu_nome }) {
        const acessoFornecedor = await this.acessoFornecedorModel.findByPk(id, { logging: false });

        if (!acessoFornecedor) {
            throw new AppError('Acesso de fornecedor não encontrado.');
        }

        const updatedAcessoFornecedor = await acessoFornecedor.update({ flu_nome }, { logging: false });
        return updatedAcessoFornecedor;
    }
}

export default UpdateAcessoFornecedorService;
