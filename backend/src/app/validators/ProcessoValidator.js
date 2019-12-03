import * as Yup from 'yup';

class ProcessoValidator {
    constructor() {
        this.init();
        this.errors = [];
    }

    init() {
        this.schema = Yup.object().shape({
            tpr_id: Yup.number().required(),
            pro_iniciativa: Yup.string().required(),
            pro_tipo_iniciativa: Yup.string().required(),
            pro_nome: Yup.string().required(),
            pro_numero: Yup.number().required(),
            pro_autuacao: Yup.date().required(),
            usu_autuador: Yup.string().required(),
            set_id_autuador: Yup.string().required(),
            usu_alteracao: Yup.string().required(),
            usu_data_hora_alteracao: Yup.date().required(),
            nod_id: Yup.number().required()
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

export default ProcessoValidator;
