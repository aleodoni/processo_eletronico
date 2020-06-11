class GeneroModel {
    constructor(data) {
        this.values = [];
        if (data) {
            this.values.push(data);
        }
    }

    async findAll({ options }) {
        return this.values;
    }

    async findByPk(gen_id, { options }) {
        const findGenero = this.values.find(genero => genero.gen_id === gen_id);

        if (findGenero) {
            return new GeneroModel(findGenero);
        }
    }

    async create(data) {
        this.values.push(data);
        return new GeneroModel(data);
    }

    async update(data) {
        return data;
    }

    async destroy(options) {
        return null;
    }

    toJSON(data) {
        return this.values;
    }
}

export default GeneroModel;
