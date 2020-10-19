import AppError from '../../error/AppError';

class UpdateMembroComissaoService {
    constructor(membroComissaoModel, setorModel) {
        this.membroComissaoModel = membroComissaoModel;
        this.setorModel = setorModel;
    }

    async execute({ mco_id, area_id, mco_matricula, mco_nome, mco_area_id_membro, mco_ativo, mco_login }) {
        const membroComissao = await this.membroComissaoModel.findOne({ where: { mco_id: mco_id } }, { logging: false });

        if (!membroComissao) {
            throw new AppError('Membro não encontrado.');
        }

        const updatedMembroComissao = await membroComissao.update({ mco_id, area_id, mco_matricula, mco_nome, mco_area_id_membro, mco_ativo, mco_login }, { logging: false });

        return updatedMembroComissao;
    }
}

export default UpdateMembroComissaoService;
