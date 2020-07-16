import AppError from '../../error/AppError';

class CreateMenuService {
    constructor(menuModel, telaModel, modeloMenuModel) {
        this.menuModel = menuModel;
        this.telaModel = telaModel;
        this.modeloMenuModel = modeloMenuModel;
    }

    async execute({ men_id, men_id_pai, men_nome, men_url, tel_id, mmu_id, men_ordem_pai, tela_interna }) {
        // Verifica se men_id_pai existe
        if (men_id_pai) {
            const menuPaiExiste = await this.menuModel.findByPk(men_id_pai, { logging: true });

            if (!menuPaiExiste) {
                throw new AppError('Manu pai não existe');
            }
        }
        //

        // Verifica se tel_id existe
        const telaExiste = await this.telaModel.findByPk(tel_id, { logging: true });

        if (!telaExiste) {
            throw new AppError('Tela não existe');
        }
        //

        // Verifica se mmu_id existe
        const modeloMenuExiste = await this.modeloMenuModel.findByPk(mmu_id, { logging: true });

        if (!modeloMenuExiste) {
            throw new AppError('Modelo menu não existe');
        }
        //

        const menu = await this.menuModel.create({ men_id, men_id_pai, men_nome, men_url, tel_id, mmu_id, men_ordem_pai, tela_interna }, {
            logging: true
        });

        return menu.toJSON();
    }
}

export default CreateMenuService;
