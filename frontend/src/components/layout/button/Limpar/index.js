import React from 'react';
import { FaSyncAlt } from 'react-icons/fa';
import PropTypes from 'prop-types';

import Button from '../Button';

export default function Limpar({ name, clickHandler }) {
    return (
        <Button id={name} name={name} onClick={clickHandler}>
            <FaSyncAlt />
            Limpar campos
        </Button>
    );
}

Limpar.propTypes = {
    name: PropTypes.string.isRequired,
    clickHandler: PropTypes.func.isRequired,
};
