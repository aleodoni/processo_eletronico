import FakeTela from '../../app/fakes/models/TelaModel';
import CreateTelaService from '../../app/services/tela/CreateTelaService';
import AppError from '../../app/error/AppError';

let fakeTela;
let telaCreate;

describe('CreateTelaService', () => {
    beforeEach(() => {
        fakeTela = new FakeTela();

        telaCreate = new CreateTelaService(fakeTela);
    });

    it('Deve incluir uma tela com sucesso', async() => {
        const tela = await telaCreate.execute({
            tel_id: null,
            tel_nome: 'Nova Tela'
        });

        expect(tela[0]).toHaveProperty('tel_id');
    });

    it('Não deve incluir uma tela com nome em branco', async() => {
        await expect(
            telaCreate.execute({
                tel_id: null,
                tel_nome: ''
            })
        ).rejects.toBeInstanceOf(AppError);
    });

    it('Não deve incluir uma tela com nome nulo', async() => {
        await expect(
            telaCreate.execute({
                tel_id: null,
                tel_nome: null
            })
        ).rejects.toBeInstanceOf(AppError);
    });
});
