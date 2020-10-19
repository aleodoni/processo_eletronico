import GeneroFake from '../../app/fakes/models/GeneroModel';
import UpdateGeneroService from '../../app/services/genero/UpdateGeneroService';

let generoFake;
let generoUpdate;

describe('UpdateGeneroService', () => {
    beforeEach(() => {
        generoFake = new GeneroFake();
        generoUpdate = new UpdateGeneroService(generoFake);
    });

    it('Deve alterar um gênero com sucesso', async() => {
        await generoFake.create({ gen_id: 1, gen_nome: 'Novo Gênero', versao: 0 });

        const updatedGenero = await generoUpdate.execute({ id: 1, gen_nome: 'Alterado' });

        expect(updatedGenero).toHaveProperty('gen_nome', 'Alterado');
    });

    it('Não deve alterar um gênero com id não encontrado', async() => {
        await expect(
            generoUpdate.execute({
                gen_id: 1, gen_nome: 'Alterado'
            })
        ).rejects.toBeInstanceOf(Error);
    });
});
