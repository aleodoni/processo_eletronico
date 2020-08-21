import React from 'react';
import { FaCheck } from 'react-icons/fa';
import PropTypes from 'prop-types';

import Button from '../Button';

export default function Sim({ name, clickHandler }) {
    return (
        <Button id={name} name={name} onClick={clickHandler}>
            <FaCheck />
            Sim
        </Button>
    );
}

Sim.propTypes = {
    name: PropTypes.string.isRequired,
    clickHandler: PropTypes.func.isRequired,
};
