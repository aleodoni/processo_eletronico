import AppError from '../../error/AppError';

class DeleteAcessoFornecedorService {
    constructor(acessoFornecedorModel) {
        this.acessoFornecedorModel = acessoFornecedorModel;
    }

    async execute({ id }) {
        const acessoFornecedor = await this.acessoFornecedorModel.findByPk(id, {});

        if (!acessoFornecedor) {
            throw new AppError('Acesso de fornecedor não encontrado');
        }

        await acessoFornecedor.destroy({ where: { acf_id: id } });

        return acessoFornecedor;
    }
}

export default DeleteAcessoFornecedorService;
