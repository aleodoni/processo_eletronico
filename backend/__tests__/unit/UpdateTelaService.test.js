import TelaFake from '../../src/app/fakes/models/TelaModel';
import UpdateTelaService from '../../src/app/services/tela/UpdateTelaService';
import AppError from '../../src/app/error/AppError';

let telaFake;
let telaUpdate;

describe('UpdateTelaService', () => {
    beforeEach(() => {
        telaFake = new TelaFake();
        telaUpdate = new UpdateTelaService(telaFake);
    });

    it('Deve alterar uma tela com sucesso', async() => {
        await telaFake.create({ tel_id: 1, tel_nome: 'Nova Tela', versao: 0 });

        const updatedTela = await telaUpdate.execute({ id: 1, tel_nome: 'Alterado' });

        expect(updatedTela).toHaveProperty('tel_nome', 'Alterado');
    });

    it('Não deve alterar uma tela com id não encontrado', async() => {
        await expect(
            telaUpdate.execute({
                tel_id: 1, tel_nome: 'Alterado'
            })
        ).rejects.toBeInstanceOf(AppError);
    });
});
