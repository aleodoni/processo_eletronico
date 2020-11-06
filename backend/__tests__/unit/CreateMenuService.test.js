import FakeMenu from '../../src/app/fakes/models/MenuModel';
import FakeTela from '../../src/app/fakes/models/TelaModel';
import FakeModeloMenu from '../../src/app/fakes/models/ModeloMenuModel';
import CreateMenuService from '../../src/app/services/menu/CreateMenuService';

import AppError from '../../src/app/error/AppError';

let fakeMenu;
let fakeTela;
let fakeModeloMenu;
let menuCreate;

describe('CreateMenuService', () => {
    beforeEach(async() => {
        fakeMenu = new FakeMenu();
        fakeTela = new FakeTela();
        fakeModeloMenu = new FakeModeloMenu();

        menuCreate = new CreateMenuService(fakeMenu, fakeTela, fakeModeloMenu);

        await fakeTela.create({
            tel_id: 1,
            tel_nome: 'Tela para teste'
        });

        await fakeModeloMenu.create({
            mmu_id: 1,
            mmu_nome: 'Modelo menu para teste'
        });
    });

    it('Deve incluir um menu com sucesso', async() => {
        const menu = await menuCreate.execute({
            men_id: null,
            men_id_pai: null,
            men_nome: 'Novo menu',
            men_url: 'http://spa2/teste',
            tel_id: 1,
            mmu_id: 1,
            men_ordem_pai: 1,
            tel_interna: false
        });

        expect(menu[0]).toHaveProperty('men_id');
    });

    it('Não deve incluir um menu com menu pai inexistente', async() => {
        await expect(
            menuCreate.execute({
                men_id: null,
                men_id_pai: 10,
                men_nome: 'Novo menu',
                men_url: 'http://spa2/teste',
                tel_id: 1,
                mmu_id: 1,
                men_ordem_pai: 1,
                tel_interna: false
            })
        ).rejects.toBeInstanceOf(AppError);
    });

    it('Não deve incluir um menu com tela inexistente', async() => {
        await expect(
            menuCreate.execute({
                men_id: null,
                men_id_pai: null,
                men_nome: 'Novo menu',
                men_url: 'http://spa2/teste',
                tel_id: 10,
                mmu_id: 1,
                men_ordem_pai: 1,
                tel_interna: false
            })
        ).rejects.toBeInstanceOf(AppError);
    });

    it('Não deve incluir um menu com modelo menu inexistente', async() => {
        await expect(
            menuCreate.execute({
                men_id: null,
                men_id_pai: null,
                men_nome: 'Novo menu',
                men_url: 'http://spa2/teste',
                tel_id: 1,
                mmu_id: 10,
                men_ordem_pai: 1,
                tel_interna: false
            })
        ).rejects.toBeInstanceOf(AppError);
    });
});
