import AppError from '../../error/AppError';

class DeleteMembroComissaoService {
    constructor(membroComissaoModel) {
        this.membroComissaoModel = membroComissaoModel;
    }

    async execute({ mco_id }) {
        const membroComissao = await this.membroComissaoModel.findOne({ where: { mco_id: mco_id } }, { logging: false });

        if (!membroComissao) {
            throw new AppError('Membro não encontrada.');
        }

        await membroComissao.destroy({ where: { mco_id: mco_id } });

        return membroComissao;
    }
}

export default DeleteMembroComissaoService;
