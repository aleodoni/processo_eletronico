import FakeMenu from '../../app/fakes/models/MenuModel';
import FakeTela from '../../app/fakes/models/TelaModel';
import FakeModeloMenu from '../../app/fakes/models/ModeloMenuModel';
import UpdateMenuService from '../../app/services/menu/UpdateMenuService';

import AppError from '../../app/error/AppError';

let fakeMenu;
let fakeTela;
let fakeModeloMenu;
let menuUpdate;

describe('UpdateMenuService', () => {
    beforeEach(async() => {
        fakeMenu = new FakeMenu();
        fakeTela = new FakeTela();
        fakeModeloMenu = new FakeModeloMenu();

        menuUpdate = new UpdateMenuService(fakeMenu, fakeTela, fakeModeloMenu);

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

    it('Deve alterar um menu com sucesso', async() => {
        const menu = await menuUpdate.execute({
            id: 1,
            men_id_pai: null,
            men_nome: 'Menu alterado',
            men_url: 'http://spa2/teste',
            tel_id: 1,
            mmu_id: 1,
            men_ordem_pai: 1,
            tel_interna: false
        });

        expect(menu).toHaveProperty('men_nome', 'Menu alterado');
    });

    it('Não deve alterar um menu inexistente', async() => {
        await expect(
            menuUpdate.execute({
                id: 10,
                men_id_pai: 1,
                men_nome: 'Novo menu',
                men_url: 'http://spa2/teste',
                tel_id: 1,
                mmu_id: 1,
                men_ordem_pai: 1,
                tel_interna: false
            })
        ).rejects.toBeInstanceOf(AppError);
    });

    it('Não deve alterar um menu com menu pai inexistente', async() => {
        await expect(
            menuUpdate.execute({
                id: 1,
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

    it('Não deve alterar um menu com tela inexistente', async() => {
        await expect(
            menuUpdate.execute({
                id: 1,
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
            menuUpdate.execute({
                id: 1,
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
