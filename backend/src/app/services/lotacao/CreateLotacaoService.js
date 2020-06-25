import AppError from '../../error/AppError';

class CreateLotacaoService {
    constructor(lotacaoModel, setorModel) {
        this.lotacaoModel = lotacaoModel;
        this.setorModel = setorModel;
    }

    async execute({ matricula, pes_nome, set_id, pes_login }) {
        // Verifica se setor é válido
        const setorExists = await this.setorModel.findByPk(set_id);

        if (!setorExists) {
            throw new AppError('Setor não existe');
        }

        const lotacao = await this.lotacaoModel.create({ matricula, pes_nome, set_id, pes_login }, {
            logging: false
        });

        return lotacao.toJSON();
    }
}

export default CreateLotacaoService;
