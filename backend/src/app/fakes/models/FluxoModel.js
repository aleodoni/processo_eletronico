class FluxoModel {
    constructor(data) {
        this.values = [];
        if (data) {
            this.values.push(data);
        }
    }

    async findAll({ options }) {
        return this.values;
    }

    async findByPk(flu_id, { options }) {
        const findFluxo = this.values.find(fluxo => fluxo.flu_id === flu_id);

        if (findFluxo) {
            return new FluxoModel(findFluxo);
        }
    }

    async create(data) {
        this.values.push(data);
        return new FluxoModel(data);
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

export default FluxoModel;
