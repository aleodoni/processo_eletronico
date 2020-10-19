import { celebrate, Joi, Segments } from 'celebrate';

export default celebrate({
    [Segments.BODY]: {
        mmu_id: Joi.optional(),
        mmu_nome: Joi.string().required().max(50).trim().messages({
            'string.base': 'Nome do modelo menu obrigatório',
            'string.required': 'Nome do modelo menu obrigatório',
            'string.empty': 'Nome do modelo menu obrigatório',
            'string.max': 'Nome do modelo menu não pode ter mais que 50 caracteres'
        })
    }
});
