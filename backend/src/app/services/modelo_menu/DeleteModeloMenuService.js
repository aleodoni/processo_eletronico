import AppError from '../../error/AppError';

class DeleteModeloMenuService {
    constructor(modeloMenuModel) {
        this.modeloMenuModel = modeloMenuModel;
    }

    async execute({ id }) {
        const modeloMenu = await this.modeloMenuModel.findByPk(id, {});

        if (!modeloMenu) {
            throw new AppError('Modelo Menu não encontrado');
        }

        await modeloMenu.destroy({ where: { mmu_id: id } });

        return modeloMenu;
    }
}

export default DeleteModeloMenuService;
