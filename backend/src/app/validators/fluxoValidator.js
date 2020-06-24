import { celebrate, Joi, Segments } from 'celebrate';

export default celebrate({
    [Segments.BODY]: {
        flu_id: Joi.optional(),
        flu_nome: Joi.string().required().max(100).trim().messages({
            'string.base': 'Nome do fluxo obrigatório',
            'string.required': 'Nome do fluxo obrigatório',
            'string.empty': 'Nome do fluxo obrigatório',
            'string.max': 'Nome do fluxo não pode ter mais que 100 caracteres'
        })
    }
});
