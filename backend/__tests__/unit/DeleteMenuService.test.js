import FakeMenu from '../../src/app/fakes/models/MenuModel';
import FakeTela from '../../src/app/fakes/models/TelaModel';
import FakeModeloMenu from '../../src/app/fakes/models/ModeloMenuModel';
import DeleteMenuService from '../../src/app/services/menu/DeleteMenuService';

import AppError from '../../src/app/error/AppError';

let fakeMenu;
let fakeTela;
let fakeModeloMenu;
let menuDelete;

describe('DeleteMenuService', () => {
    beforeEach(async() => {
        fakeMenu = new FakeMenu();
        fakeTela = new FakeTela();
        fakeModeloMenu = new FakeModeloMenu();

        menuDelete = new DeleteMenuService(fakeMenu);

        await fakeTela.create({
            tel_id: 1,
            tel_nome: 'Tela para teste'
        });

        await fakeModeloMenu.create({
            mmu_id: 1,
            mmu_nome: 'Modelo menu para teste'
        });

        await fakeMenu.create({
            men_id: 1,
            men_id_pai: null,
            men_nome: 'Novo menu',
            men_url: 'http://spa2/teste',
            tel_id: 1,
            mmu_id: 1,
            men_ordem_pai: 1,
            tel_interna: false
        });
    });

    it('Deve deletar um menu com sucesso', async() => {
        const checkDelete = jest.spyOn(FakeMenu.prototype, 'destroy');

        await menuDelete.execute({ id: 1 });

        expect(checkDelete).toHaveBeenCalledTimes(1);
    });

    it('Não deve deletar um menu inexistente', async() => {
        await expect(
            menuDelete.execute({
                id: 10
            })
        ).rejects.toBeInstanceOf(AppError);
    });
});
