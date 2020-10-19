class AreaMenuModel {
    constructor(data) {
        this.values = [];
        if (data) {
            this.values.push(data);
        }
    }

    async findAll({ options }) {
        return this.values;
    }

    async findByPk(amu_id, { options }) {
        const findAreaMenu = this.values.find(areamenu => areamenu.amu_id === amu_id);

        if (findAreaMenu) {
            return new AreaMenuModel(findAreaMenu);
        }
    }

    async create(data) {
        this.values.push(data);
        return new AreaMenuModel(data);
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

export default AreaMenuModel;
