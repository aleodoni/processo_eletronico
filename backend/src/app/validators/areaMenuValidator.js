import { celebrate, Joi, Segments } from 'celebrate';

export default celebrate({
    [Segments.BODY]: {
        amu_id: Joi.optional(),
        set_id: Joi.string().required().max(4).trim().regex(/^[0-9]+$/).messages({
            'string.base': 'Código do setor obrigatório',
            'string.required': 'Código do setor obrigatório',
            'string.empty': 'Código do setor obrigatório',
            'string.max': 'Código do setor não pode ter mais que 4 caracteres'
        }),
        mmu_id: Joi.number().required().messages({
            'number.base': 'Modelo Menu obrigatório',
            'any.required': 'Modelo Menu obrigatório'
        })
    }
});
