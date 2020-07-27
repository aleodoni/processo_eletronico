import RazaoTramiteModel from '../../app/fakes/models/RazaoTramiteModel';
import DeleteRegraAposentacaoService from '../../app/services/razao_tramite/DeleteRazaoTramiteService';
import AppError from '../../app/error/AppError';

let rezaoTramiteDelete;
let razaoTramiteFake;

describe('Delete razao tramite service', () => {
    beforeEach(() => {
        razaoTramiteFake = new RazaoTramiteModel();
        rezaoTramiteDelete = new DeleteRegraAposentacaoService(razaoTramiteFake);
    });

    it('Deve excluir uma regra aposentação com sucesso', async() => {
        await razaoTramiteFake.create({ raz_id: 1, raz_nome: 'Nova Razão' });

        const checkDelete = jest.spyOn(RazaoTramiteModel.prototype, 'destroy');

        await rezaoTramiteDelete.execute({ id: 1 });

        expect(checkDelete).toHaveBeenCalledTimes(1);
    });

    it('Não deve deletar uma regra aposentação com id não encontrado', async() => {
        await expect(
            rezaoTramiteDelete.execute({
                raz_id: 1, raz_nome: 'Alterado'
            })
        ).rejects.toBeInstanceOf(AppError);
    });
});
