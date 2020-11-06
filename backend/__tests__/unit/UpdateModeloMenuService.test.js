import ModeloMenuFake from '../../src/app/fakes/models/ModeloMenuModel';
import UpdateModeloMenuService from '../../src/app/services/modelo_menu/UpdateModeloMenuService';
import AppError from '../../src/app/error/AppError';

let modeloMenuFake;
let modeloMenuUpdate;

describe('UpdateModeloMenuService', () => {
    beforeEach(() => {
        modeloMenuFake = new ModeloMenuFake();
        modeloMenuUpdate = new UpdateModeloMenuService(modeloMenuFake);
    });

    it('Deve alterar um modelo menu com sucesso', async() => {
        await modeloMenuFake.create({ mmu_id: 1, mmu_nome: 'Novo Modelo Menu', versao: 0 });

        const updatedModeloMenu = await modeloMenuUpdate.execute({ id: 1, mmu_nome: 'Alterado' });

        expect(updatedModeloMenu).toHaveProperty('mmu_nome', 'Alterado');
    });

    it('Não deve alterar um modelo menu com id não encontrado', async() => {
        await expect(
            modeloMenuUpdate.execute({
                mmu_id: 1, mmu_nome: 'Alterado'
            })
        ).rejects.toBeInstanceOf(AppError);
    });
});
