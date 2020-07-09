class NodoModel {
    constructor(data) {
        this.values = [];
        if (data) {
            this.values.push(data);
        }
    }

    async findAll({ options }) {
        return this.values;
    }

    async findByPk(nod_id, { options }) {
        const findNodo = this.values.find(nodo => nodo.nod_id === nod_id);

        if (findNodo) {
            return new NodoModel(findNodo);
        }
    }

    async create(data) {
        this.values.push(data);
        return new NodoModel(data);
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

export default NodoModel;
