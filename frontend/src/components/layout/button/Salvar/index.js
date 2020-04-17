import React from 'react';
import { FaRegSave } from 'react-icons/fa';
import PropTypes from 'prop-types';

import Button from '../Button';

export default function Salvar({ name, clickHandler }) {
    return (
        <Button id={name} name={name} onClick={clickHandler}>
            <FaRegSave />
            Salvar
        </Button>
    );
}

Salvar.propTypes = {
    name: PropTypes.string.isRequired,
    clickHandler: PropTypes.func.isRequired,
};
