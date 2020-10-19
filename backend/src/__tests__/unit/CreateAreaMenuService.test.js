import FakeAreaMenu from '../../app/fakes/models/AreaMenuModel';
import FakeSetor from '../../app/fakes/models/SetorModel';
import FakeModeloMenu from '../../app/fakes/models/ModeloMenuModel';

import CreateAreamenuService from '../../app/services/area_menu/CreateAreaMenuService';

import AppError from '../../app/error/AppError';

let fakeAreaMenu;
let fakeSetor;
let fakeModeloMenu;
let areaMenuCreate;

describe('CreateAreamenuService', () => {
    beforeEach(async() => {
        fakeAreaMenu = new FakeAreaMenu();
        fakeSetor = new FakeSetor();
        fakeModeloMenu = new FakeModeloMenu();

        areaMenuCreate = new CreateAreamenuService(fakeAreaMenu, fakeSetor, fakeModeloMenu);

        await fakeModeloMenu.create({
            mmu_id: 1,
            mmu_nome: 'Modelo Menu Criado'
        });

        await fakeSetor.create({
            set_id: 1,
            set_nome: 'Setor Criado',
            set_sigla: 'SSC',
            set_id_area: 1,
            set_ativo: true,
            set_tipo: 'N'
        });
    });

    it('Deve incluir uma nova área menu com sucesso', async() => {
        const areaMenu = await areaMenuCreate.execute({
            amu_id: null,
            set_id: 1,
            mmu_id: 1
        });

        expect(areaMenu[0]).toHaveProperty('amu_id');
    });

    it('Não deve incluir uma nova área menu com um setor inexistente', async() => {
        await expect(
            areaMenuCreate.execute({
                amu_id: null,
                set_id: 2,
                mmu_id: 1
            })
        ).rejects.toBeInstanceOf(AppError);
    });

    it('Não deve incluir uma nova área menu com um modelo menu inexistente', async() => {
        await expect(
            areaMenuCreate.execute({
                amu_id: null,
                set_id: 1,
                mmu_id: 2
            })
        ).rejects.toBeInstanceOf(AppError);
    });
});
