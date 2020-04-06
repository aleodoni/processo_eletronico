/* eslint-disable no-template-curly-in-string */

import * as Yup from 'yup';

Yup.setLocale({
    mixed: {
        default: 'é inválido',
        required: '${path} é um campo obrigatório'
    }
});

export default Yup;
