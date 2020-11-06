import FakeSetor from '../../src/app/fakes/models/SetorModel';

import FindAreaPorCodigoService from '../../src/app/services/area/FindAreaPorCodigoService';
import AppError from '../../src/app/error/AppError';

let fakeSetor;
let findAreaPorCodigo;

describe('FindAreaPorCodigoService', () => {
    beforeEach(async() => {
        fakeSetor = new FakeSetor();

        findAreaPorCodigo = new FindAreaPorCodigoService(fakeSetor);

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
        const area = await findAreaPorCodigo.execute({ id: 1 });

        expect(area.values[0]).toHaveProperty('set_nome', 'Setor Criado');
    });

    it('Não deve retornar um setor com id inexistente', async() => {
        await expect(
            findAreaPorCodigo.execute({ id: null })
        ).rejects.toBeInstanceOf(AppError);
    });
});
