import RegraAposentacaoModel from '../../src/app/fakes/models/RegraAposentacaoModel';
import DeleteRegraAposentacaoService from '../../src/app/services/regra_aposentacao/DeleteRegraAposentacaoService';
import AppError from '../../src/app/error/AppError';

let regraAposentacaoDelete;
let regraAposentacaoFake;

describe('Delete regra aposentacao service', () => {
    beforeEach(() => {
        regraAposentacaoFake = new RegraAposentacaoModel();
        regraAposentacaoDelete = new DeleteRegraAposentacaoService(regraAposentacaoFake);
    });

    it('Deve excluir uma regra aposentação com sucesso', async() => {
        await regraAposentacaoFake.create({ reg_id: 1, reg_nome: 'Nova Regra' });

        const checkDelete = jest.spyOn(RegraAposentacaoModel.prototype, 'destroy');

        await regraAposentacaoDelete.execute({ id: 1 });

        expect(checkDelete).toHaveBeenCalledTimes(1);
    });

    it('Não deve deletar uma regra aposentação com id não encontrado', async() => {
        await expect(
            regraAposentacaoDelete.execute({
                reg_id: 1, reg_nome: 'Alterado'
            })
        ).rejects.toBeInstanceOf(AppError);
    });
});
