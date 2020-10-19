import ModeloMenuFake from '../../app/fakes/models/ModeloMenuModel';
import DeleteModeloMenuService from '../../app/services/modelo_menu/DeleteModeloMenuService';
import AppError from '../../app/error/AppError';

let modeloMenuDelete;
let modeloMenuFake;

describe('DeleteModeloMenuService', () => {
    beforeEach(() => {
        modeloMenuFake = new ModeloMenuFake();
        modeloMenuDelete = new DeleteModeloMenuService(modeloMenuFake);
    });

    it('Deve excluir um modelo menu com sucesso', async() => {
        await modeloMenuFake.create({ mnu_id: 1, mnu_nome: 'Novo Modelo Menu', versao: 0 });

        const checkDelete = jest.spyOn(ModeloMenuFake.prototype, 'destroy');

        await modeloMenuDelete.execute({ id: 1 });

        expect(checkDelete).toHaveBeenCalledTimes(1);
    });

    it('Não deve deletar um modelo menu com id não encontrado', async() => {
        await expect(
            modeloMenuDelete.execute({
                mnu_id: 1, mnu_nome: 'Alterado'
            })
        ).rejects.toBeInstanceOf(AppError);
    });
});
