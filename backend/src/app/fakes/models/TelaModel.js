class TelaModel {
    constructor(data) {
        this.values = [];
        if (data) {
            this.values.push(data);
        }
    }

    async findAll({ options }) {
        return this.values;
    }

    async findByPk(tel_id, { options }) {
        const findTela = this.values.find(tela => tela.tel_id === tel_id);

        if (findTela) {
            return new TelaModel(findTela);
        }
    }

    async create(data) {
        this.values.push(data);
        return new TelaModel(data);
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

export default TelaModel;
