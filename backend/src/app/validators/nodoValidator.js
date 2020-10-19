import { celebrate, Joi, Segments } from 'celebrate';

export default celebrate({
    [Segments.BODY]: {
        nod_id: Joi.optional(),

        nod_inicio: Joi.boolean()
            .required()
            .default(false)
            .messages({
                'boolean.base': 'Início obrigatório',
                'boolean.empty': 'Início obrigatório',
                'any.required': 'Início obrigatório'
            }),

        flu_id: Joi.number()
            .required()
            .messages({
                'number.base': 'Fluxo obrigatório',
                'number.empty': 'Fluxo obrigatório',
                'any.required': 'Fluxo obrigatório'
            }),

        area_id: Joi.string()
            .trim()
            .max(4).message('Área não pode ter mais que 4 caracteres')
            .required()
            .messages({
                'string.base': 'Área obrigatória',
                'string.empty': 'Área obrigatória',
                'any.required': 'Área obrigatória'
            }),

        nod_fim: Joi.boolean()
            .required()
            .default(false)
            .messages({
                'boolean.base': 'Fim nodo obrigatório',
                'boolean.empty': 'Fim nodo obrigatório',
                'any.required': 'Fim nodo obrigatório'
            }),

        nod_dias_prazo: Joi.number()
            .required()
            .default(0)
            .messages({
                'number.base': 'Dias prazo obrigatório',
                'number.empty': 'Dias prazo obrigatório',
                'any.required': 'Dias prazo obrigatório'
            }),

        nod_ordem: Joi.number()
            .required()
            .default(0)
            .messages({
                'number.base': 'Ordem obrigatória',
                'any.required': 'Ordem obrigatória'
            }),

        nod_aval_executiva: Joi.boolean()
            .required()
            .default(false)
            .messages({
                'boolean.base': 'Aval executiva obrigatória',
                'boolean.empty': 'Aval executiva obrigatória',
                'any.required': 'Aval executiva obrigatória'
            }),

        nod_decisao: Joi.boolean()
            .required()
            .default(false)
            .messages({
                'boolean.base': 'Decisão obrigatório',
                'boolean.empty': 'Decisão obrigatório',
                'any.required': 'Decisão obrigatório'
            }),

        nod_interessado: Joi.boolean()
            .required()
            .default(false)
            .messages({
                'boolean.base': 'Interessado obrigatório',
                'boolean.empty': 'Interessado obrigatório',
                'any.required': 'Interessado obrigatório'
            }),

        nod_ciencia: Joi.boolean()
            .required()
            .default(false)
            .messages({
                'boolean.base': 'Ciência obrigatório',
                'boolean.empty': 'Ciência obrigatório',
                'any.required': 'Ciência obrigatório'
            }),

        nod_averbacao: Joi.boolean()
            .required()
            .default(false)
            .messages({
                'boolean.base': 'Averbação obrigatório',
                'boolean.empty': 'Averbação obrigatório',
                'any.required': 'Averbação obrigatório'
            }),

        nod_ciencia_averbacao: Joi.boolean()
            .required()
            .default(false)
            .messages({
                'boolean.base': 'Ciência averbação obrigatório',
                'boolean.empty': 'Ciência averbação obrigatório',
                'any.required': 'Ciência averbação obrigatório'
            }),

        nod_aval_horario: Joi.boolean()
            .required()
            .default(false)
            .messages({
                'boolean.base': 'Aval horário obrigatório',
                'boolean.empty': 'Aval horário obrigatório',
                'any.required': 'Aval horário obrigatório'
            }),

        nod_contagem_tempo: Joi.boolean()
            .required()
            .default(false)
            .messages({
                'boolean.base': 'Contagem tempo obrigatório',
                'boolean.empty': 'Contagem tempo obrigatório',
                'any.required': 'Contagem tempo obrigatório'
            }),

        nod_ciencia_calculo: Joi.boolean()
            .required()
            .default(false)
            .messages({
                'boolean.base': 'Ciência cálculo obrigatório',
                'boolean.empty': 'Ciência cálculo obrigatório',
                'any.required': 'Ciência cálculo obrigatório'
            }),

        nod_parecer_projuris_aposentadoria: Joi.boolean()
            .required()
            .default(false)
            .messages({
                'boolean.base': 'Parecer do Projuris obrigatório',
                'boolean.empty': 'Parecer do Projuris obrigatório',
                'any.required': 'Parecer do Projuris obrigatório'
            }),

        nod_decisao_pad: Joi.boolean()
            .required()
            .default(false)
            .messages({
                'boolean.base': 'Decisão do PAD obrigatório',
                'boolean.empty': 'Decisão do PAD obrigatório',
                'any.required': 'Decisão do PAD obrigatório'
            })

    }
});
