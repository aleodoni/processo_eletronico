import AppError from '../../error/AppError';

class CreateTelaService {
    constructor(telaModel) {
        this.telaModel = telaModel;
    }

    async execute({ tel_id, tel_nome }) {
        // Verifica se set_nome é nulo ou em branco
        if (!tel_nome || tel_nome.trim().length === 0) {
            throw new AppError('Nome inválido');
        }

        const tela = await this.telaModel.create({ tel_id, tel_nome }, {
            logging: false
        });

        return tela.toJSON();
    }
}

export default CreateTelaService;
