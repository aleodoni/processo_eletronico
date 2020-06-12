class UpdateGeneroService {
    constructor(generoModel) {
        this.generoModel = generoModel;
    }

    async execute({ id, gen_nome }) {
        const genero = await this.generoModel.findByPk(id, { logging: true });

        if (!genero) {
            throw new Error('Gênero não encontrado.');
        }

        const updatedGenero = await genero.update({ gen_nome }, { logging: true });
        return updatedGenero;
    }
}

export default UpdateGeneroService;
