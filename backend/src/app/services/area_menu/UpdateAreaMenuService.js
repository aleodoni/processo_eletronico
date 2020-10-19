import AppError from '../../error/AppError';

class UpdateAreaMenuService {
    constructor(areaMenuModel, setorModel, modeloMenuModel) {
        this.areaMenuModel = areaMenuModel;
        this.setorModel = setorModel;
        this.modeloMenuModel = modeloMenuModel;
    }

    async execute({ id, set_id, mmu_id }) {
        const areaMenu = await this.areaMenuModel.findByPk(id, { logging: false });

        if (!areaMenu) {
            throw new AppError('Área Menu não encontrado.');
        }

        // Verifica se o setor existe
        const setorExiste = await this.setorModel.findByPk(set_id, { logging: false });

        if (!setorExiste) {
            throw new AppError('Setor não existe');
        }
        //

        // Verifica se o modelo menu existe
        const modeloMenuExiste = await this.modeloMenuModel.findByPk(mmu_id, { logging: false });

        if (!modeloMenuExiste) {
            throw new AppError('Modelo Menu não existe');
        }
        //

        const updatedAreaMenu = await areaMenu.update({ set_id, mmu_id }, { logging: false });

        return updatedAreaMenu;
    }
}

export default UpdateAreaMenuService;
