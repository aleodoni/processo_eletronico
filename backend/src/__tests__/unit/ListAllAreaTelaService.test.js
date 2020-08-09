import FakeAreaTela from '../../app/fakes/models/AreaTela';

import ListAllAreaTelaService from '../../app/services/area_tela/ListAllAreaTelaService';
import AppError from '../../app/error/AppError';

let fakeAreaTela;
let listAllAreaTela;

describe('ListAllAreaTelaService', () => {
    beforeEach(async() => {
        fakeAreaTela = new FakeAreaTela();

        listAllAreaTela = new ListAllAreaTelaService(fakeAreaTela);

        await fakeAreaTela.create({
            set_id: 1,
            tel_id: 1,
            tel_nome: 'Tela 1'
        });

        await fakeAreaTela.create({
            set_id: 1,
            tel_id: 2,
            tel_nome: 'Tela 2'
        });

        await fakeAreaTela.create({
            set_id: 1,
            tel_id: 3,
            tel_nome: 'Tela 3'
        });
    });

    it('Deve retornar uma lista de telas com sucesso', async() => {
        const area = await listAllAreaTela.execute({ setId: 1 });

        expect(area)
            .toEqual(expect.arrayContaining([
                expect.objectContaining({
                    set_id: 1,
                    tel_nome: 'Tela 1'
                })
            ]));
    });

    it('Não deve retornar uma lista de telas com id inexistente', async() => {
        await expect(
            listAllAreaTela.execute({ setId: null })
        ).rejects.toBeInstanceOf(AppError);
    });
});
