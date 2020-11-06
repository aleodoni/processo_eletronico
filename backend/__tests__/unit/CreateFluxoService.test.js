import FakeFluxo from '../../src/app/fakes/models/FluxoModel';
import CreateFluxoService from '../../src/app/services/fluxo/CreateFluxoService';

let fakeFluxo;
let fluxoCreate;

describe('CreateFluxoService', () => {
    beforeEach(() => {
        fakeFluxo = new FakeFluxo();

        fluxoCreate = new CreateFluxoService(fakeFluxo);
    });

    it('Deve incluir um fluxo com sucesso', async() => {
        const fluxo = await fluxoCreate.execute({
            flu_id: null,
            flu_nome: 'Novo Fluxo'
        });

        expect(fluxo[0]).toHaveProperty('flu_id');
    });
});
