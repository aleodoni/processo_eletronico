class AreaTela {
    constructor(data) {
        this.values = [];
        if (data) {
            this.values.push(data);
        }
    }

    async findAll({ where, logging }) {
        const filtered = this.values.filter(item => item.set_id === where.set_id);
        return filtered;
    }

    async create(data) {
        this.values.push(data);
        return new AreaTela(data);
    }

    toJSON(data) {
        return this.values;
    }
}

export default AreaTela;
