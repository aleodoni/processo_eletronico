import RazaoTramiteModel from '../../src/app/fakes/models/RazaoTramiteModel';
import UpdateRazaoTramiteService from '../../src/app/services/razao_tramite/UpdateRazaoTramiteService';
import AppError from '../../src/app/error/AppError';

let razaoTramiteFake;
let razaoTramiteUpdate;

describe('Update Razão Trâmite Service', () => {
    beforeEach(() => {
        razaoTramiteFake = new RazaoTramiteModel();
        razaoTramiteUpdate = new UpdateRazaoTramiteService(razaoTramiteFake);
    });

    it('Deve alterar uma regra aposentação com sucesso', async() => {
        await razaoTramiteFake.create({ raz_id: 1, raz_nome: 'Nova Regra' });

        const updatedRegra = await razaoTramiteUpdate.execute({ id: 1, raz_nome: 'Alterado' });

        expect(updatedRegra).toHaveProperty('raz_nome', 'Alterado');
    });

    it('Não deve alterar uma regra aposentação com id não encontrado', async() => {
        await expect(
            razaoTramiteUpdate.execute({
                raz_id: 1, raz_nome: 'Alterado'
            })
        ).rejects.toBeInstanceOf(AppError);
    });
});
