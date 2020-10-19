class SetorModel {
    constructor(data) {
        this.values = [];
        if (data) {
            this.values.push(data);
        }
    }

    async findAll({ options }) {
        return this.values;
    }

    async findByPk(set_id, { options }) {
        const findSetor = this.values.find(setor => setor.set_id === set_id);

        if (findSetor) {
            return new SetorModel(findSetor);
        }
    }

    async create(data) {
        this.values.push(data);
        return new SetorModel(data);
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

export default SetorModel;
