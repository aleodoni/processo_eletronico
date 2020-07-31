import AppError from '../../error/AppError';

class UpdateModeloMenuService {
    constructor(modeloMenuModel) {
        this.modeloMenuModel = modeloMenuModel;
    }

    async execute({ id, mmu_nome }) {
        const modeloMenu = await this.modeloMenuModel.findByPk(id, { logging: false });

        if (!modeloMenu) {
            throw new AppError('Modelo Menu não encontrado.');
        }

        const updatedmodeloMenu = await modeloMenu.update({ mmu_nome }, { logging: false });
        return updatedmodeloMenu;
    }
}

export default UpdateModeloMenuService;
