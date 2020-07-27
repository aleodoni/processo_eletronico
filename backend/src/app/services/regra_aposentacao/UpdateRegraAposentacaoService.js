import AppError from '../../error/AppError';

class UpdateRegraAposentacaoService {
    constructor(regraAposentacaoModel) {
        this.regraAposentacaoModel = regraAposentacaoModel;
    }

    async execute({ id, reg_nome }) {
        const regraAposentacao = await this.regraAposentacaoModel.findByPk(id, { logging: true });

        if (!regraAposentacao) {
            throw new AppError('Regra aposentação não encontrada.');
        }

        const updateRegraAposentacao = await regraAposentacao.update({ reg_nome }, { logging: true });
        return updateRegraAposentacao;
    }
}

export default UpdateRegraAposentacaoService;
