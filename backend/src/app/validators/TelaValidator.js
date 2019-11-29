import * as Yup from 'yup';

class TelaValidator {
    constructor() {
        this.init();
        this.errors = [];
    }

    init() {
        this.schema = Yup.object().shape({
            tel_nome: Yup.string().required()
        });
    }

    async validate(req) {
        try {
            await this.schema.validate(req.body, { abortEarly: false });
        } catch (e) {
            this.errors = e.errors;
            return false;
        }
        return true;
    }
}

export default TelaValidator;
