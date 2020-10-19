class CreateModeloMenuService {
    constructor(modeloMenuModel) {
        this.modeloMenuModel = modeloMenuModel;
    }

    async execute({ mmu_id, mmu_nome }) {
        const modeloMenu = await this.modeloMenuModel.create({ mmu_id, mmu_nome }, {
            logging: false
        });

        return modeloMenu.toJSON();
    }
}

export default CreateModeloMenuService;
