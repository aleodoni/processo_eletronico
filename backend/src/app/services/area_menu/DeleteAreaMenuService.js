import AppError from '../../error/AppError';

class DeleteAreaMenuService {
    constructor(areaMenuModel) {
        this.areaMenuModel = areaMenuModel;
    }

    async execute({ id }) {
        const modeloMenu = await this.areaMenuModel.findByPk(id, {});

        if (!modeloMenu) {
            throw new AppError('Área Menu não encontrado');
        }

        await modeloMenu.destroy({ where: { mmu_id: id } });

        return modeloMenu;
    }
}

export default DeleteAreaMenuService;
