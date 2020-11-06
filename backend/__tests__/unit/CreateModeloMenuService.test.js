import FakeModeloMenu from '../../src/app/fakes/models/ModeloMenuModel';
import CreateModeloMenuService from '../../src/app/services/modelo_menu/CreateModeloMenuService';

let fakeModeloMenu;
let modeloMenuCreate;

describe('CreateModeloMenuService', () => {
    beforeEach(() => {
        fakeModeloMenu = new FakeModeloMenu();

        modeloMenuCreate = new CreateModeloMenuService(fakeModeloMenu);
    });

    it('Deve incluir um modelo menu com sucesso', async() => {
        const modeloMenu = await modeloMenuCreate.execute({
            mmu_id: null,
            mmu_nome: 'Novo Modelo Menu'
        });

        expect(modeloMenu[0]).toHaveProperty('mmu_id');
    });
});
