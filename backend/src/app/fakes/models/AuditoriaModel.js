class AuditoriaModel {
    constructor() {
        this.values = [];
    }

    async findAll({ options }) {
        return this.values[0];
    }

    async create(data) {
        this.values.push({ dataValues: data });
    }
}

export default AuditoriaModel;
