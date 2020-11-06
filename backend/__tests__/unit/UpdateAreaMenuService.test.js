import FakeAreaMenu from '../../src/app/fakes/models/AreaMenuModel';
import FakeSetor from '../../src/app/fakes/models/SetorModel';
import FakeModeloMenu from '../../src/app/fakes/models/ModeloMenuModel';

import UpdateAreaMenuService from '../../src/app/services/area_menu/UpdateAreaMenuService';

import AppError from '../../src/app/error/AppError';

let fakeAreaMenu;
let fakeSetor;
let fakeModeloMenu;
let areaMenuUpdate;

describe('UpdateAreaMenuService', () => {
    beforeEach(async() => {
        fakeAreaMenu = new FakeAreaMenu();
        fakeSetor = new FakeSetor();
        fakeModeloMenu = new FakeModeloMenu();

        areaMenuUpdate = new UpdateAreaMenuService(fakeAreaMenu, fakeSetor, fakeModeloMenu);

        await fakeModeloMenu.create({
            mmu_id: 1,
            mmu_nome: 'Modelo Menu 1 Criado'
        });

        await fakeModeloMenu.create({
            mmu_id: 2,
            mmu_nome: 'Modelo Menu 2 Criado'
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

    it('Deve alterar uma nova área menu com sucesso', async() => {
        const areaMenu = await areaMenuUpdate.execute({
            id: 1,
            set_id: 1,
            mmu_id: 2
        });

        expect(areaMenu).toHaveProperty('mmu_id', 2);
    });

    it('Não deve alterar uma área menu com um setor inexistente', async() => {
        await expect(
            areaMenuUpdate.execute({
                id: 1,
                set_id: 2,
                mmu_id: 1
            })
        ).rejects.toBeInstanceOf(AppError);
    });

    it('Não deve alterar uma área menu com um modelo menu inexistente', async() => {
        await expect(
            areaMenuUpdate.execute({
                id: 1,
                set_id: 1,
                mmu_id: 3
            })
        ).rejects.toBeInstanceOf(AppError);
    });
});
