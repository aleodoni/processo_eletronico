import { celebrate, Joi, Segments } from 'celebrate';

export default celebrate({
    [Segments.BODY]: {
        gen_id: Joi.optional(),
        gen_nome: Joi.string().required().max(100).trim().messages({
            'string.base': 'Nome do gênero obrigatório',
            'string.required': 'Nome do gênero obrigatório',
            'string.empty': 'Nome do gênero obrigatório',
            'string.max': 'Nome do gênero não pode ter mais que 100 caracteres'
        })
    }
});
