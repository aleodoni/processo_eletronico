import FakeRegraAposentacaoModel from '../../app/fakes/models/RegraAposentacaoModel';
import CreateRegraAposentacaoService from '../../app/services/regra_aposentacao/CreateRegraAposentacaoService';

let fakeRegraAposentacao;
let regraAposentacaoCreate;

describe('CreateModeloMenuService', () => {
    beforeEach(() => {
        fakeRegraAposentacao = new FakeRegraAposentacaoModel();

        regraAposentacaoCreate = new CreateRegraAposentacaoService(fakeRegraAposentacao);
    });

    it('Deve incluir uma regra aposentação com sucesso', async() => {
        const modeloMenu = await regraAposentacaoCreate.execute({
            reg_id: null,
            reg_nome: 'Nova regra aposentação'
        });

        expect(modeloMenu[0]).toHaveProperty('reg_id');
    });
});
