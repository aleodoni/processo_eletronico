class DeleteGeneroService {
    constructor(generoModel) {
        this.generoModel = generoModel;
    }

    async execute({ id }) {
        const genero = await this.generoModel.findByPk(id, {});

        if (!genero) {
            throw new Error('Gênero não encontrado');
        }

        await genero.destroy({ where: { gen_id: id } });

        return genero;
    }
}

export default DeleteGeneroService;
