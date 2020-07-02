class ModeloMenuModel {
    constructor(data) {
        this.values = [];
        if (data) {
            this.values.push(data);
        }
    }

    async findAll({ options }) {
        return this.values;
    }

    async findByPk(mmu_id, { options }) {
        const findModeloMenu = this.values.find(modeloMenu => modeloMenu.mmu_id === mmu_id);

        if (findModeloMenu) {
            return new ModeloMenuModel(findModeloMenu);
        }
    }

    async create(data) {
        this.values.push(data);
        return new ModeloMenuModel(data);
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

export default ModeloMenuModel;
