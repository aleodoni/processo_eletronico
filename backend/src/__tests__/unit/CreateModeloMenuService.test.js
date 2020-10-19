import FakeModeloMenu from '../../app/fakes/models/ModeloMenuModel';
import CreateModeloMenuService from '../../app/services/modelo_menu/CreateModeloMenuService';

let fakeModeloMenu;
let modeloMenuCreate;

describe('CreateModeloMenuService', () => {
    beforeEach(() => {
        fakeModeloMenu = new FakeModeloMenu();

        modeloMenuCreate = new CreateModeloMenuService(fakeModeloMenu);
    });

    it('Deve incluir um modelo menu com sucesso', async() => {
        const modeloMenu = await modeloMenuCreate.execute({
            mnu_id: null,
            mnu_nome: 'Novo Modelo Menu'
        });

        expect(modeloMenu[0]).toHaveProperty('mnu_id');
    });
});
