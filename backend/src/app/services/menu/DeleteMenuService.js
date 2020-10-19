import AppError from '../../error/AppError';

class DeleteMenuService {
    constructor(menuModel) {
        this.menuModel = menuModel;
    }

    async execute({ id }) {
        // Verifica se id existe
        const menu = await this.menuModel.findByPk(id, { logging: false });

        if (!menu) {
            throw new AppError('Menu não encontrado');
        }
        //

        await menu.destroy({ where: { men_id: id } }, {
            logging: false
        });

        return menu;
    }
}

export default DeleteMenuService;
