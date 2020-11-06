import ModeloMenuFake from '../../src/app/fakes/models/ModeloMenuModel';
import DeleteModeloMenuService from '../../src/app/services/modelo_menu/DeleteModeloMenuService';
import AppError from '../../src/app/error/AppError';

let modeloMenuDelete;
let modeloMenuFake;

describe('DeleteModeloMenuService', () => {
    beforeEach(() => {
        modeloMenuFake = new ModeloMenuFake();
        modeloMenuDelete = new DeleteModeloMenuService(modeloMenuFake);
    });

    it('Deve excluir um modelo menu com sucesso', async() => {
        await modeloMenuFake.create({ mmu_id: 1, mmu_nome: 'Novo Modelo Menu', versao: 0 });

        const checkDelete = jest.spyOn(ModeloMenuFake.prototype, 'destroy');

        await modeloMenuDelete.execute({ id: 1 });

        expect(checkDelete).toHaveBeenCalledTimes(1);
    });

    it('Não deve deletar um modelo menu com id não encontrado', async() => {
        await expect(
            modeloMenuDelete.execute({
                mmu_id: 1, mmu_nome: 'Alterado'
            })
        ).rejects.toBeInstanceOf(AppError);
    });
});
