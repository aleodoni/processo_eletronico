import AppError from '../../error/AppError';

class CreateMenuService {
    constructor(menuModel, telaModel, modeloMenuModel) {
        this.menuModel = menuModel;
        this.telaModel = telaModel;
        this.modeloMenuModel = modeloMenuModel;
    }

    async execute({ men_id, men_id_pai, men_nome, men_url, tel_id, mmu_id, men_ordem_pai, tela_interna }) {
        // Trata men_id_pai
        if (men_id_pai === '' || men_id_pai <= 0) {
            men_id_pai = null;
        }
        //

        // Verifica se men_id_pai existe
        if (men_id_pai) {
            const menuPaiExiste = await this.menuModel.findByPk(men_id_pai, { logging: false });

            if (!menuPaiExiste) {
                throw new AppError('Manu pai não existe');
            }
        }
        //

        // Verifica se tel_id existe
        const telaExiste = await this.telaModel.findByPk(tel_id, { logging: false });

        if (!telaExiste) {
            throw new AppError('Tela não existe');
        }
        //

        // Verifica se mmu_id existe
        const modeloMenuExiste = await this.modeloMenuModel.findByPk(mmu_id, { logging: false });

        if (!modeloMenuExiste) {
            throw new AppError('Modelo menu não existe');
        }
        //

        const menu = await this.menuModel.create({ men_id, men_id_pai, men_nome, men_url, tel_id, mmu_id, men_ordem_pai, tela_interna }, {
            logging: false
        });

        return menu.toJSON();
    }
}

export default CreateMenuService;
