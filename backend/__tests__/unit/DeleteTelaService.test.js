import TelaFake from '../../src/app/fakes/models/TelaModel';
import DeleteTelaService from '../../src/app/services/tela/DeleteTelaService';
import AppError from '../../src/app/error/AppError';

let telaDelete;
let telaFake;

describe('DeleteTelaService', () => {
    beforeEach(() => {
        telaFake = new TelaFake();
        telaDelete = new DeleteTelaService(telaFake);
    });

    it('Deve excluir uma tela com sucesso', async() => {
        await telaFake.create({ tel_id: 1, tel_nome: 'Nova Tela', versao: 0 });

        const checkDelete = jest.spyOn(TelaFake.prototype, 'destroy');

        await telaDelete.execute({ id: 1 });

        expect(checkDelete).toHaveBeenCalledTimes(1);
    });

    it('Não deve deletar uma tela com id não encontrado', async() => {
        await expect(
            telaDelete.execute({
                tel_id: 1, tel_nome: 'Alterado'
            })
        ).rejects.toBeInstanceOf(AppError);
    });
});
