import FakeNodo from '../../app/fakes/models/NodoModel';
import FakeFluxo from '../../app/fakes/models/FluxoModel';

import UpdateNodoService from '../../app/services/nodo/UpdateNodoService';

import AppError from '../../app/error/AppError';

let fakeNodo;
let fakeFluxo;
let nodoUpdate;

describe('UpdateNodoService', () => {
    beforeEach(async() => {
        fakeNodo = new FakeNodo();
        fakeFluxo = new FakeFluxo();

        nodoUpdate = new UpdateNodoService(fakeNodo, fakeFluxo);

        await fakeFluxo.create({
            flu_id: 1,
            flu_nome: 'Novo Fluxo'
        });

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

    it('Deve alterar uma um novo nodo com sucesso', async() => {
        const nodo = await nodoUpdate.execute({
            id: 1,
            nod_inicio: false,
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

        expect(nodo).toHaveProperty('nod_inicio', false);
    });

    it('Não deve alterar um nodo com fluxo inexistente', async() => {
        await expect(
            nodoUpdate.execute({
                id: 1,
                nod_inicio: false,
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

    it('Não deve alterar um nodo inexistente', async() => {
        await expect(
            nodoUpdate.execute({
                id: 999,
                nod_inicio: false,
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
            })
        ).rejects.toBeInstanceOf(AppError);
    });
});
