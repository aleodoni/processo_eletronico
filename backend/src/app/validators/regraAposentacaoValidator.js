import { celebrate, Joi, Segments } from 'celebrate';

export default celebrate({
    [Segments.BODY]: {
        reg_id: Joi.optional(),

        reg_nome: Joi.string()
            .trim()
            .max(80).message('Nome não pode ter mais que 80 caracteres')
            .required()
            .messages({
                'string.base': 'Nome obrigatório',
                'string.empty': 'Nome obrigatório',
                'any.required': 'Nome obrigatório'
            })

    }
});
