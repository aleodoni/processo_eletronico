class RazaoTramiteModel {
    constructor(data) {
        this.values = [];
        if (data) {
            this.values.push(data);
        }
    }

    async findAll({ options }) {
        return this.values;
    }

    async findByPk(raz_id, { options }) {
        const findRazaoTramite = this.values.find(razaoTramite => razaoTramite.raz_id === raz_id);

        if (findRazaoTramite) {
            return new RazaoTramiteModel(findRazaoTramite);
        }
    }

    async create(data) {
        this.values.push(data);
        return new RazaoTramiteModel(data);
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

export default RazaoTramiteModel;
