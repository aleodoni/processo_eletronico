import RegraAposentacaoFake from '../../app/fakes/models/RegraAposentacaoModel';
import UpdateRegraAposentacaoService from '../../app/services/regra_aposentacao/UpdateRegraAposentacaoService';
import AppError from '../../app/error/AppError';

let regraAposentacaoFake;
let regraAposentacaoUpdate;

describe('Update Regra Aposentacao Service', () => {
    beforeEach(() => {
        regraAposentacaoFake = new RegraAposentacaoFake();
        regraAposentacaoUpdate = new UpdateRegraAposentacaoService(regraAposentacaoFake);
    });

    it('Deve alterar uma regra aposentação com sucesso', async() => {
        await regraAposentacaoFake.create({ reg_id: 1, reg_nome: 'Nova Regra' });

        const updatedRegra = await regraAposentacaoUpdate.execute({ id: 1, reg_nome: 'Alterado' });

        expect(updatedRegra).toHaveProperty('reg_nome', 'Alterado');
    });

    it('Não deve alterar uma regra aposentação com id não encontrado', async() => {
        await expect(
            regraAposentacaoUpdate.execute({
                reg_id: 1, reg_nome: 'Alterado'
            })
        ).rejects.toBeInstanceOf(AppError);
    });
});
