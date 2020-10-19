import { celebrate, Joi, Segments } from 'celebrate';

export default celebrate({
    [Segments.BODY]: {
        raz_id: Joi.optional(),

        raz_nome: Joi.string()
            .trim()
            .max(100).message('Nome não pode ter mais que 100 caracteres')
            .required()
            .messages({
                'string.base': 'Nome obrigatório',
                'string.empty': 'Nome obrigatório',
                'any.required': 'Nome obrigatório'
            })

    }
});
