import FakeSetor from '../../src/app/fakes/models/SetorModel';
import FakeModeloMenu from '../../src/app/fakes/models/ModeloMenuModel';
import FakeAreaMenu from '../../src/app/fakes/models/AreaMenuModel';

import DeleteAreaMenuService from '../../src/app/services/area_menu/DeleteAreaMenuService';

import AppError from '../../src/app/error/AppError';

let fakeAreaMenu;
let fakeSetor;
let fakeModeloMenu;
let areaMenuDelete;

describe('DeleteAreaMenuService', () => {
    beforeEach(async() => {
        fakeAreaMenu = new FakeAreaMenu();
        fakeSetor = new FakeSetor();
        fakeModeloMenu = new FakeModeloMenu();

        areaMenuDelete = new DeleteAreaMenuService(fakeAreaMenu);

        await fakeModeloMenu.create({
            mmu_id: 1,
            mmu_nome: 'Modelo Menu 1 Criado'
        });

        await fakeSetor.create({
            set_id: 1,
            set_nome: 'Setor Criado',
            set_sigla: 'SSC',
            set_id_area: 1,
            set_ativo: true,
            set_tipo: 'N'
        });

        await fakeAreaMenu.create({
            amu_id: 1,
            set_id: 1,
            mmu_id: 1
        });
    });

    it('Deve deletar uma área menu com sucesso', async() => {
        const checkDelete = jest.spyOn(FakeAreaMenu.prototype, 'destroy');

        await areaMenuDelete.execute({
            id: 1
        });

        expect(checkDelete).toHaveBeenCalledTimes(1);
    });

    it('Não deve deletar uma área menu inexistente', async() => {
        await expect(
            areaMenuDelete.execute({
                id: 10
            })
        ).rejects.toBeInstanceOf(AppError);
    });
});
