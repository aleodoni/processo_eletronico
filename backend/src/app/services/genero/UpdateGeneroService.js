import AppError from '../../error/AppError';

class UpdateGeneroService {
    constructor(generoModel) {
        this.generoModel = generoModel;
    }

    async execute({ id, gen_nome, gen_visivel }) {
        const genero = await this.generoModel.findByPk(id, { logging: false });

        if (!genero) {
            throw new AppError('Gênero não encontrado.');
        }

        const updatedGenero = await genero.update({ gen_nome, gen_visivel }, { logging: false });
        return updatedGenero;
    }
}

export default UpdateGeneroService;
