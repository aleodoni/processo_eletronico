import Yup from '../../config/validator';

export default async(req, res, next) => {
    try {
        const schema = Yup.object().shape({
            login: Yup.string().required(),
            senha: Yup.string().required()
        });

        await schema.validate(req.body, { abortEarly: false });

        return next();
    } catch (err) {
        return res
            .status(400)
            .json({ error: 'Erro de validação', messages: err.inner });
    }
};
