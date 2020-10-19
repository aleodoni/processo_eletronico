import { celebrate, Joi, Segments } from 'celebrate';

export default celebrate({
    [Segments.BODY]: {
        men_id: Joi.optional(),

        men_id_pai: [Joi.number().optional, Joi.allow(null)],

        men_nome: Joi.string()
            .trim()
            .max(60).message('Nome menu não pode ter mais que 60 caracteres')
            .required()
            .messages({
                'string.base': 'Nome menu obrigatório',
                'string.empty': 'Nome menu obrigatório',
                'any.required': 'Nome menu obrigatório'
            }),

        men_url: Joi.string()
            .trim()
            .max(200).message('Url menu não pode ter mais que 200 caracteres')
            .required()
            .messages({
                'string.base': 'Url menu obrigatório',
                'string.empty': 'Url menu obrigatório',
                'any.required': 'Url menu obrigatório'
            }),

        tel_id: Joi.number()
            .required()
            .messages({
                'number.base': 'Tela id obrigatório',
                'number.empty': 'Tela id obrigatório',
                'any.required': 'Tela id obrigatório'
            }),

        mmu_id: Joi.number()
            .required()
            .messages({
                'number.base': 'Modelo menu id obrigatório',
                'number.empty': 'Modelo menu id obrigatório',
                'any.required': 'Modelo menu id obrigatório'
            }),

        men_ordem_pai: Joi.number(),

        tel_interna: Joi.boolean()
            .default(false)
    }
});
