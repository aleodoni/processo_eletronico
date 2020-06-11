import GeneroFake from '../../app/fakes/models/GeneroModel';
import DeleteGeneroService from '../../app/services/genero/DeleteGeneroService';

let generoDelete;
let generoFake;

describe('DeleteGeneroService', () => {
    beforeEach(() => {
        generoFake = new GeneroFake();
        generoDelete = new DeleteGeneroService(generoFake);
    });

    it('Deve excluir um gênero com sucesso', async() => {
        await generoFake.create({ gen_id: 1, gen_nome: 'Novo Gênero', versao: 0 });

        const checkDelete = jest.spyOn(GeneroFake.prototype, 'destroy');

        await generoDelete.execute({ id: 1 });

        expect(checkDelete).toHaveBeenCalledTimes(1);
    });

    it('Não deve deletar um gênero com id não encontrado', async() => {
        await expect(
            generoDelete.execute({
                gen_id: 1, gen_nome: 'Alterado'
            })
        ).rejects.toBeInstanceOf(Error);
    });
});
