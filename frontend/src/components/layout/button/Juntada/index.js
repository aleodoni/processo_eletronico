import React from 'react';
import { FaBuffer } from 'react-icons/fa';
import PropTypes from 'prop-types';

import Button from '../Button';

export default function Juntada({ name, clickHandler }) {
    return (
        <Button id={name} name={name} type="button" onClick={clickHandler}>
            <FaBuffer />
            Juntada de processo
        </Button>
    );
}

Juntada.propTypes = {
    name: PropTypes.string.isRequired,
    clickHandler: PropTypes.func.isRequired,
};
