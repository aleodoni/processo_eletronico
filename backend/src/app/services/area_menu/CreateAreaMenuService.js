import AppError from '../../error/AppError';

class CreateAreaMenuService {
    constructor(areaMenuModel, setorModel, modeloMenuModel) {
        this.areaMenuModel = areaMenuModel;
        this.setorModel = setorModel;
        this.modeloMenuModel = modeloMenuModel;
    }

    async execute({ amu_id, set_id, mmu_id }) {
        // Verifica se o setor existe
        const setorExiste = await this.setorModel.findByPk(set_id, { logging: true });

        if (!setorExiste) {
            throw new AppError('Setor não existe');
        }
        //

        // Verifica se o modelo menu existe
        const modeloMenuExiste = await this.modeloMenuModel.findByPk(mmu_id, { logging: true });

        if (!modeloMenuExiste) {
            throw new AppError('Model Menu não existe');
        }
        //

        const areaMenu = await this.areaMenuModel.create({ amu_id, set_id, mmu_id }, {
            logging: true
        });

        return areaMenu.toJSON();
    }
}

export default CreateAreaMenuService;
