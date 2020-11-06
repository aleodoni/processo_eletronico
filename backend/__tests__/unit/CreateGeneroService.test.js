import FakeGenero from '../../src/app/fakes/models/GeneroModel';
import CreateGeneroService from '../../src/app/services/genero/CreateGeneroService';
import AppError from '../../src/app/error/AppError';

let fakeGenero;
let generoCreate;

describe('CreateGeneroService', () => {
    beforeEach(() => {
        fakeGenero = new FakeGenero();

        generoCreate = new CreateGeneroService(fakeGenero);
    });

    it('Deve incluir um gênero com sucesso', async() => {
        const genero = await generoCreate.execute({
            gen_id: null,
            gen_nome: 'Novo Gênero'
        });

        expect(genero[0]).toHaveProperty('gen_id');
    });

    it('Não deve incluir um gênero nome em branco', async() => {
        await expect(
            generoCreate.execute({
                gen_id: null,
                gen_nome: ''
            })
        ).rejects.toBeInstanceOf(AppError);
    });

    it('Não deve incluir um gênero nome nulo', async() => {
        await expect(
            generoCreate.execute({
                gen_id: null,
                gen_nome: ''
            })
        ).rejects.toBeInstanceOf(AppError);
    });
});
