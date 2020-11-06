import FakeNodo from '../../src/app/fakes/models/NodoModel';

import DeleteNodoService from '../../src/app/services/nodo/DeleteNodoService';

import AppError from '../../src/app/error/AppError';

let fakeNodo;
let nodoDelete;

describe('DeleteNodoService', () => {
    beforeEach(async() => {
        fakeNodo = new FakeNodo();

        nodoDelete = new DeleteNodoService(fakeNodo);

        await fakeNodo.create({
            nod_id: 1,
            nod_inicio: true,
            flu_id: 1,
            area_id: '556',
            nod_fim: false,
            nod_dias_prazo: 15,
            nod_ordem: 10,
            nod_aval_executiva: false,
            nod_decisao: false,
            nod_interessado: false,
            nod_ciencia: false,
            nod_averbacao: false,
            nod_ciencia_averbacao: false,
            nod_aval_horario: false,
            nod_contagem_tempo: false,
            nod_ciencia_calculo: false
        });
    });

    it('Deve deletar um nodo com sucesso', async() => {
        const checkDelete = jest.spyOn(FakeNodo.prototype, 'destroy');

        await nodoDelete.execute({
            id: 1
        });

        expect(checkDelete).toHaveBeenCalledTimes(1);
    });

    it('Não deve deletar um nodo inexistente', async() => {
        await expect(
            nodoDelete.execute({
                id: 10
            })
        ).rejects.toBeInstanceOf(AppError);
    });
});
