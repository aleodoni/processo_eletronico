import FakeSetor from '../../app/fakes/models/SetorModel';
import CreateSetorService from '../../app/services/setor/CreateSetorService';
import AppError from '../../app/error/AppError';

let fakeSetor;
let setorCreate;

describe('CreateSetorService', () => {
    beforeEach(() => {
        fakeSetor = new FakeSetor();

        setorCreate = new CreateSetorService(fakeSetor);
    });

    it('Deve incluir um setor com sucesso', async() => {
        const setor = await setorCreate.execute({
            set_id: null,
            set_nome: 'Novo setor',
            set_sigla: 'NSE',
            set_id_area: 1,
            set_ativo: true,
            set_tipo: 'N'

        });

        expect(setor[0]).toHaveProperty('set_id');
    });

    it('Não deve incluir um setor com nome em branco', async() => {
        await expect(
            setorCreate.execute({
                set_id: null,
                set_nome: '',
                set_sigla: 'NSE',
                set_id_area: 1,
                set_ativo: true,
                set_tipo: 'N'
            })
        ).rejects.toBeInstanceOf(AppError);
    });

    it('Não deve incluir um setor com nome nulo', async() => {
        await expect(
            setorCreate.execute({
                set_id: null,
                set_nome: null,
                set_sigla: 'NSE',
                set_id_area: 1,
                set_ativo: true,
                set_tipo: 'N'
            })
        ).rejects.toBeInstanceOf(AppError);
    });

    it('Não deve incluir um setor com sigla em branco', async() => {
        await expect(
            setorCreate.execute({
                set_id: null,
                set_nome: 'Novo Setor',
                set_sigla: '',
                set_id_area: 1,
                set_ativo: true,
                set_tipo: 'N'
            })
        ).rejects.toBeInstanceOf(AppError);
    });

    it('Não deve incluir um setor com sigla nulo', async() => {
        await expect(
            setorCreate.execute({
                set_id: null,
                set_nome: 'Novo setor',
                set_sigla: null,
                set_id_area: 1,
                set_ativo: true,
                set_tipo: 'N'
            })
        ).rejects.toBeInstanceOf(AppError);
    });

    it('Não deve incluir um setor com área nula', async() => {
        await expect(
            setorCreate.execute({
                set_id: null,
                set_nome: 'Novo setor',
                set_sigla: 'NSE',
                set_id_area: null,
                set_ativo: true,
                set_tipo: 'N'
            })
        ).rejects.toBeInstanceOf(AppError);
    });
});
