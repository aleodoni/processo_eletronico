import ModeloMenuFake from '../../app/fakes/models/ModeloMenuModel';
import UpdateModeloMenuService from '../../app/services/modelo_menu/UpdateModeloMenuService';
import AppError from '../../app/error/AppError';

let modeloMenuFake;
let modeloMenuUpdate;

describe('UpdateModeloMenuService', () => {
    beforeEach(() => {
        modeloMenuFake = new ModeloMenuFake();
        modeloMenuUpdate = new UpdateModeloMenuService(modeloMenuFake);
    });

    it('Deve alterar um modelo menu com sucesso', async() => {
        await modeloMenuFake.create({ mnu_id: 1, mnu_nome: 'Novo Modelo Menu', versao: 0 });

        const updatedModeloMenu = await modeloMenuUpdate.execute({ id: 1, mnu_nome: 'Alterado' });

        expect(updatedModeloMenu).toHaveProperty('mnu_nome', 'Alterado');
    });

    it('Não deve alterar um modelo menu com id não encontrado', async() => {
        await expect(
            modeloMenuUpdate.execute({
                mnu_id: 1, mnu_nome: 'Alterado'
            })
        ).rejects.toBeInstanceOf(AppError);
    });
});
