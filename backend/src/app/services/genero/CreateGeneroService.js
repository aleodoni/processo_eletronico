import AppError from '../error/AppError';

class CreateGeneroService {
    constructor(generoModel) {
        this.generoModel = generoModel;
    }

    async execute({ gen_id, gen_nome }) {
        // Verifica se gen_nome é nulo ou em branco
        if (!gen_nome || gen_nome.trim().length === 0) {
            throw new AppError('Nome inválido');
        }

        const genero = await this.generoModel.create({ gen_id, gen_nome }, {
            logging: false
        });

        return genero.toJSON();
    }
}

export default CreateGeneroService;
