import FluxoFake from '../../src/app/fakes/models/FluxoModel';
import UpdateFluxoService from '../../src/app/services/fluxo/UpdateFluxoService';
import AppError from '../../src/app/error/AppError';

let fluxoFake;
let fluxoUpdate;

describe('UpdateFluxoService', () => {
    beforeEach(() => {
        fluxoFake = new FluxoFake();
        fluxoUpdate = new UpdateFluxoService(fluxoFake);
    });

    it('Deve alterar um fluxo com sucesso', async() => {
        await fluxoFake.create({ flu_id: 1, flu_nome: 'Novo Fluxo', versao: 0 });

        const updatedFluxo = await fluxoUpdate.execute({ id: 1, flu_nome: 'Alterado' });

        expect(updatedFluxo).toHaveProperty('flu_nome', 'Alterado');
    });

    it('Não deve alterar um fluxo com id não encontrado', async() => {
        await expect(
            fluxoUpdate.execute({
                flu_id: 1, flu_nome: 'Alterado'
            })
        ).rejects.toBeInstanceOf(AppError);
    });
});
