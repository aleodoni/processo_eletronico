import SetorFake from '../../app/fakes/models/SetorModel';
import UpdateSetorService from '../../app/services/setor/UpdateSetorService';
import AppError from '../../app/error/AppError';

let setorFake;
let setorUpdate;

describe('UpdateSetorService', () => {
    beforeEach(() => {
        setorFake = new SetorFake();
        setorUpdate = new UpdateSetorService(setorFake);
    });

    it('Deve alterar um setor com sucesso', async() => {
        await setorFake.create({
            set_id: 1,
            set_nome: 'Novo setor',
            set_sigla: 'NSE',
            set_id_area: 1,
            set_ativo: true,
            set_tipo: 'N',
            versao: 0
        });

        const updatedSetor = await setorUpdate.execute({
            id: 1,
            set_nome: 'Alterado',
            set_sigla: 'NSE',
            set_id_area: 1,
            set_ativo: true,
            set_tipo: 'N',
            versao: 0
        });

        expect(updatedSetor).toHaveProperty('set_nome', 'Alterado');
    });

    it('Não deve alterar um setor com id não encontrado', async() => {
        await expect(
            setorUpdate.execute({
                set_id: 1, set_nome: 'Alterado'
            })
        ).rejects.toBeInstanceOf(AppError);
    });
});
