class AreaCombo {
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
            return new AreaCombo(findSetor);
        }
    }

    async create(data) {
        this.values.push(data);
        return new AreaCombo(data);
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

export default AreaCombo;
