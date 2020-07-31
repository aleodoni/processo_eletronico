import AppError from '../../error/AppError';

class DeleteRegraAposentacaoService {
    constructor(regraAposentacaoModel) {
        this.regraAposentacaoModel = regraAposentacaoModel;
    }

    async execute({ id }) {
        const regraAposentacao = await this.regraAposentacaoModel.findByPk(id, {});

        if (!regraAposentacao) {
            throw new AppError('Regra aposentação não encontrada');
        }

        await regraAposentacao.destroy({ where: { reg_id: id } });

        return regraAposentacao;
    }
}

export default DeleteRegraAposentacaoService;
