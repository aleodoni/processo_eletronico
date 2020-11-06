import FakeNodo from '../../src/app/fakes/models/NodoModel';
import FakeFluxo from '../../src/app/fakes/models/FluxoModel';

import CreateNodoService from '../../src/app/services/nodo/CreateNodoService';

import AppError from '../../src/app/error/AppError';

let fakeNodo;
let fakeFluxo;
let nodoCreate;

describe('CreateNodoService', () => {
    beforeEach(async() => {
        fakeNodo = new FakeNodo();
        fakeFluxo = new FakeFluxo();

        nodoCreate = new CreateNodoService(fakeNodo, fakeFluxo);

        await fakeFluxo.create({
            flu_id: 1,
            flu_nome: 'Novo Fluxo'
        });
    });

    it('Deve incluir um novo nodo com sucesso', async() => {
        const nodo = await nodoCreate.execute({
            nod_id: null,
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

        expect(nodo[0]).toHaveProperty('nod_id');
    });

    it('Não deve incluir um novo nodo com fluxo inexistente', async() => {
        await expect(
            nodoCreate.execute({
                nod_id: null,
                nod_inicio: true,
                flu_id: 999,
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
            })
        ).rejects.toBeInstanceOf(AppError);
    });
});
