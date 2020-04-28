import React from 'react';
import { FaNetworkWired } from 'react-icons/fa';
import PropTypes from 'prop-types';

import Button from '../Button';

export default function Tramitar({ name, clickHandler }) {
    return (
        <Button id={name} name={name} onClick={clickHandler}>
            <FaNetworkWired />
            Tramitar
        </Button>
    );
}

Tramitar.propTypes = {
    name: PropTypes.string.isRequired,
    clickHandler: PropTypes.func.isRequired,
};
