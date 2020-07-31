import AppError from '../../error/AppError';

class UpdateLotacaoService {
    constructor(lotacaoModel, setorModel) {
        this.lotacaoModel = lotacaoModel;
        this.setorModel = setorModel;
    }

    async execute({ matricula, pes_nome, set_id, pes_login }) {
        // Verifica se matrícula é válida
        const lotacao = await this.lotacaoModel.findOne({ where: { matricula: matricula } }, { logging: false });

        if (!lotacao) {
            throw new AppError('Lotação não encontrada.');
        }

        // Verifica se setor é válido
        const setorExists = await this.setorModel.findByPk(set_id);

        if (!setorExists) {
            throw new AppError('Setor não existe');
        }

        const updatedLotacao = await lotacao.update({ matricula, pes_nome, set_id, pes_login }, { logging: false });

        return updatedLotacao;
    }
}

export default UpdateLotacaoService;
