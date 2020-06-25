import { celebrate, Joi, Segments } from 'celebrate';

export default celebrate({
    [Segments.BODY]: {
        matricula: Joi.string()
            .trim()
            .max(5).message('Matrícula não pode ter mais que 5 caracteres')
            .required()
            .messages({
                'string.base': 'Matrícula obrigatória',
                'string.empty': 'Matrícula obrigatória',
                'any.required': 'Matrícula obrigatória'
            }),

        pes_nome: Joi.string()
            .trim()
            .max(200).message('Nome não pode ter mais que 200 caracteres')
            .empty('')
            .required()
            .messages({
                'string.base': 'Nome obrigatório',
                'string.empty': 'Nome obrigatório',
                'any.required': 'Nome obrigatório'
            }),

        set_id: Joi.number()
            .required(),

        pes_login: Joi.string()
            .trim()
            .required()
            .max(100).message('Login não pode ter mais que 100 caracteres')
            .messages({
                'string.base': 'Login obrigatório',
                'string.empty': 'Login obrigatório',
                'any.required': 'Login obrigatório'
            })

    }
});
