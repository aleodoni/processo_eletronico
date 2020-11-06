import FakeRazaoTramiteModel from '../../src/app/fakes/models/RazaoTramiteModel';
import CreateRazaoTramiteService from '../../src/app/services/razao_tramite/CreateRazaoTramiteService';

let fakeRazaoTramite;
let razaoTramiteCreate;

describe('CreateModeloMenuService', () => {
    beforeEach(() => {
        fakeRazaoTramite = new FakeRazaoTramiteModel();

        razaoTramiteCreate = new CreateRazaoTramiteService(fakeRazaoTramite);
    });

    it('Deve incluir uma razão trâmite com sucesso', async() => {
        const modeloMenu = await razaoTramiteCreate.execute({
            raz_id: null,
            raz_nome: 'Nova razão trãmite'
        });

        expect(modeloMenu[0]).toHaveProperty('raz_id');
    });
});
