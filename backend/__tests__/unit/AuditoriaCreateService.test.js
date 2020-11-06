import FakeDataHoraAtual from '../../src/app/fakes/models/DataHoraAtualModel';
import FakeAuditoria from '../../src/app/fakes/models/AuditoriaModel';
import CreateAuditoriaService from '../../src/app/services/auditoria/CreateAuditoriaService';

let fakeDataHoraAtual;
let fakeAuditoria;
let auditoriaCreate;

describe('AuditoriaCreateService', () => {
    beforeEach(() => {
        fakeDataHoraAtual = new FakeDataHoraAtual();
        fakeAuditoria = new FakeAuditoria();

        auditoriaCreate = new CreateAuditoriaService(fakeAuditoria, fakeDataHoraAtual);
    });

    it('Inclusão deve criar duas entradas para a tabela auditoria', async() => {
        await fakeDataHoraAtual.create({ data_hora_atual: String(new Date()) });

        const createAudit = jest.spyOn(fakeAuditoria, 'create');

        await auditoriaCreate.execute({
            id: 1,
            nome: 'Alexandre'
        },
        '/usuario',
        1,
        '192.168.1.1',
        'I',
        'id'
        );

        expect(createAudit).toHaveBeenCalledTimes(2);
    });

    it('Alteração deve criar duas entradas para a tabela auditoria', async() => {
        await fakeDataHoraAtual.create({ data_hora_atual: String(new Date()) });

        const createAudit = jest.spyOn(fakeAuditoria, 'create');

        await auditoriaCreate.execute({
            id: 1,
            nome: 'Alexandre'
        },
        '/usuario',
        1,
        '192.168.1.1',
        'U',
        'id'
        );

        expect(createAudit).toHaveBeenCalledTimes(2);
    });

    it('Deleção deve criar duas entradas para a tabela auditoria', async() => {
        await fakeDataHoraAtual.create({ data_hora_atual: String(new Date()) });

        const createAudit = jest.spyOn(fakeAuditoria, 'create');

        await auditoriaCreate.execute({
            id: 1,
            nome: 'Alexandre'
        },
        '/usuario',
        1,
        '192.168.1.1',
        'D',
        'id'
        );

        expect(createAudit).toHaveBeenCalledTimes(2);
    });

    it('Não deve criar entrada em auditoria com tipo !== I ou U ou D', async() => {
        await fakeDataHoraAtual.create({ data_hora_atual: String(new Date()) });

        const createAudit = jest.spyOn(fakeAuditoria, 'create');

        await auditoriaCreate.execute({
            id: 1,
            nome: 'Alexandre'
        },
        '/usuario',
        1,
        '192.168.1.1',
        'Z',
        'id'
        );

        expect(createAudit).toHaveBeenCalledTimes(0);
    });
});
