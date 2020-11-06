import FakeSetor from '../../src/app/fakes/models/SetorModel';

import FindSetorPorCodigoService from '../../src/app/services/area/FindSetorPorCodigoService';
import AppError from '../../src/app/error/AppError';

let fakeSetor;
let findSetorPorCodigo;

describe('FindSetorPorCodigoService', () => {
    beforeEach(async() => {
        fakeSetor = new FakeSetor();

        findSetorPorCodigo = new FindSetorPorCodigoService(fakeSetor);

        await fakeSetor.create({
            set_id: 1,
            set_nome: 'Setor Criado',
            set_sigla: 'SSC',
            set_id_area: 1,
            set_ativo: true,
            set_tipo: 'N'
        });
    });

    it('Deve retornar um setor com sucesso', async() => {
        const area = await findSetorPorCodigo.execute({ id: 1 });

        expect(area.values[0]).toHaveProperty('set_nome', 'Setor Criado');
    });

    it('Não deve retornar um setor com id inexistente', async() => {
        await expect(
            findSetorPorCodigo.execute({ id: null })
        ).rejects.toBeInstanceOf(AppError);
    });
});
