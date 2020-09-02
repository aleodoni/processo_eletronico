import React from 'react';
import { FaRegSave } from 'react-icons/fa';
import PropTypes from 'prop-types';

import Button from '../Button';

export default function ButtonAlterarSenha({ name, clickHandler }) {
    return (
        <Button id={name} name={name} onClick={clickHandler}>
            <FaRegSave />
            Alterar senha
        </Button>
    );
}

ButtonAlterarSenha.propTypes = {
    name: PropTypes.string.isRequired,
    clickHandler: PropTypes.func,
};

ButtonAlterarSenha.defaultProps = {
    clickHandler: null,
};
