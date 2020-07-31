
class CreateMembroComissaoService {
    constructor(membroComissaoModel, setorModel) {
        this.membroComissaoModel = membroComissaoModel;
        this.setorModel = setorModel;
    }

    async execute({ mco_id, area_id, mco_matricula, mco_nome, mco_area_id_membro, mco_ativo, mco_login }) {
        const membroComissao = await this.membroComissaoModel.create({ mco_id, area_id, mco_matricula, mco_nome, mco_area_id_membro, mco_ativo, mco_login }, {
            logging: false
        });

        return membroComissao.toJSON();
    }
}

export default CreateMembroComissaoService;
