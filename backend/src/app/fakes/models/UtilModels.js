class UtilModels {
    constructor(value) {
        this.value = value;
    }

    update(data, options) {
        this.value = data;
        return data;
    }

    destroy(options) {
        return null;
    }
}

export default UtilModels;
