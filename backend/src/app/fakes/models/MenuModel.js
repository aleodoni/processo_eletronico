class MenuModel {
    constructor(data) {
        this.values = [];
        if (data) {
            this.values.push(data);
        }
    }

    async findAll({ options }) {
        return this.values;
    }

    async findByPk(men_id, { options }) {
        const findMenu = this.values.find(menu => menu.men_id === men_id);

        if (findMenu) {
            return new MenuModel(findMenu);
        }
    }

    async create(data) {
        this.values.push(data);
        return new MenuModel(data);
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

export default MenuModel;
