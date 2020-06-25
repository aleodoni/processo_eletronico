import AppError from '../../error/AppError';

class DeleteLotacaoService {
    constructor(lotacaoModel) {
        this.lotacaoModel = lotacaoModel;
    }

    async execute({ matricula }) {
        // Verifica se matrícula é válida
        const lotacao = await this.lotacaoModel.findOne({ where: { matricula: matricula } }, { logging: true });

        if (!lotacao) {
            throw new AppError('Lotação não encontrada.');
        }

        await lotacao.destroy({ where: { matricula: matricula } });

        return lotacao;
    }
}

export default DeleteLotacaoService;
