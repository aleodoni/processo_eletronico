import AppError from '../../error/AppError';

class UpdateMenuService {
    constructor(menuModel, telaModel, modeloMenuModel) {
        this.menuModel = menuModel;
        this.telaModel = telaModel;
        this.modeloMenuModel = modeloMenuModel;
    }

    async execute({ id, men_id_pai, men_nome, men_url, tel_id, mmu_id, men_ordem_pai, tela_interna }) {
        // Verifica se id existe
        const menu = await this.menuModel.findByPk(id, { logging: true });

        if (!menu) {
            throw new AppError('Menu não encontrado');
        }
        //

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

        const updatedMenu = await menu.update({ men_id_pai, men_nome, men_url, tel_id, mmu_id, men_ordem_pai, tela_interna }, {
            logging: true
        });

        return updatedMenu;
    }
}

export default UpdateMenuService;
