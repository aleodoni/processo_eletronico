import React from 'react';
import { FaTimes } from 'react-icons/fa';
import PropTypes from 'prop-types';

import Button from '../Button';

export default function Nao({ name, clickHandler }) {
    return (
        <Button id={name} name={name} onClick={clickHandler}>
            <FaTimes />
            Não
        </Button>
    );
}

Nao.propTypes = {
    name: PropTypes.string.isRequired,
    clickHandler: PropTypes.func.isRequired,
};
