import React from 'react';
import { FaCheck } from 'react-icons/fa';
import PropTypes from 'prop-types';

import Button from '../Button';

export default function Ciencia({ name, clickHandler }) {
    return (
        <Button id={name} name={name} onClick={clickHandler}>
            <FaCheck />
            Ciente do processo
        </Button>
    );
}

Ciencia.propTypes = {
    name: PropTypes.string.isRequired,
    clickHandler: PropTypes.func.isRequired,
};
