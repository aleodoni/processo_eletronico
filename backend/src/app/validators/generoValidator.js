import { celebrate, Joi, Segments } from 'celebrate';

export default celebrate({
    [Segments.BODY]: {
        gen_id: Joi.optional(),
        gen_nome: Joi.string().required().max(100).trim().messages({
            'string.base': 'Nome do gênero obrigatório',
            'string.required': 'Nome do gênero obrigatório',
            'string.empty': 'Nome do gênero obrigatório',
            'string.max': 'Nome do gênero não pode ter mais que 100 caracteres'
        }),
        gen_visivel: Joi.boolean()
            .required()
            .default(true)
            .messages({
                'boolean.base': 'Visibilidade obrigatória',
                'boolean.empty': 'Visibilidade obrigatória',
                'any.required': 'Visibilidade obrigatória'
            })
    }
});
