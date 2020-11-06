import FluxoFake from '../../src/app/fakes/models/FluxoModel';
import DeleteFluxoService from '../../src/app/services/fluxo/DeleteFluxoService';
import AppError from '../../src/app/error/AppError';

let fluxoDelete;
let fluxoFake;

describe('DeleteFluxoService', () => {
    beforeEach(() => {
        fluxoFake = new FluxoFake();
        fluxoDelete = new DeleteFluxoService(fluxoFake);
    });

    it('Deve excluir um fluxo com sucesso', async() => {
        await fluxoFake.create({ flu_id: 1, flu_nome: 'Novo Fluxo', versao: 0 });

        const checkDelete = jest.spyOn(FluxoFake.prototype, 'destroy');

        await fluxoDelete.execute({ id: 1 });

        expect(checkDelete).toHaveBeenCalledTimes(1);
    });

    it('Não deve deletar um fluxo com id não encontrado', async() => {
        await expect(
            fluxoDelete.execute({
                flu_id: 1, flu_nome: 'Alterado'
            })
        ).rejects.toBeInstanceOf(AppError);
    });
});
