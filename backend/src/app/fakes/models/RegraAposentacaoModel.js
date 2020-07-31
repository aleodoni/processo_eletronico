class RegraAposentacaoModel {
    constructor(data) {
        this.values = [];
        if (data) {
            this.values.push(data);
        }
    }

    async findAll({ options }) {
        return this.values;
    }

    async findByPk(reg_id, { options }) {
        const findRegraAposentacao = this.values.find(regraAposentacao => regraAposentacao.reg_id === reg_id);

        if (findRegraAposentacao) {
            return new RegraAposentacaoModel(findRegraAposentacao);
        }
    }

    async create(data) {
        this.values.push(data);
        return new RegraAposentacaoModel(data);
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

export default RegraAposentacaoModel;
