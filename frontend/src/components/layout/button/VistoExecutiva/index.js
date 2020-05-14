import React from 'react';
import { FaCheck } from 'react-icons/fa';
import PropTypes from 'prop-types';

import Button from '../Button';

export default function VistoExecutiva({ name, clickHandler }) {
    return (
        <Button id={name} name={name} onClick={clickHandler}>
            <FaCheck />
            Visto da executiva
        </Button>
    );
}

VistoExecutiva.propTypes = {
    name: PropTypes.string.isRequired,
    clickHandler: PropTypes.func.isRequired,
};
