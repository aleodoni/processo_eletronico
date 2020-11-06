import SetorFake from '../../src/app/fakes/models/SetorModel';
import DeleteSetorService from '../../src/app/services/setor/DeleteSetorService';
import AppError from '../../src/app/error/AppError';

let setorDelete;
let setorFake;

describe('DeleteSetorService', () => {
    beforeEach(() => {
        setorFake = new SetorFake();
        setorDelete = new DeleteSetorService(setorFake);
    });

    it('Deve excluir um setor com sucesso', async() => {
        await setorFake.create({
            set_id: 1,
            set_nome: 'Novo setor',
            set_sigla: 'NSE',
            set_id_area: 1,
            set_ativo: true,
            set_tipo: 'N',
            versao: 0
        });

        const checkDelete = jest.spyOn(SetorFake.prototype, 'destroy');

        await setorDelete.execute({ id: 1 });

        expect(checkDelete).toHaveBeenCalledTimes(1);
    });

    it('Não deve deletar um setor com id não encontrado', async() => {
        await expect(
            setorDelete.execute({
                set_id: 1, set_nome: 'Setor inexistente'
            })
        ).rejects.toBeInstanceOf(AppError);
    });
});
