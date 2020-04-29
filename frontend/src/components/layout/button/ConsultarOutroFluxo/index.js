import React from 'react';
import { FaSearch } from 'react-icons/fa';
import PropTypes from 'prop-types';

import Button from '../Button';

export default function ConsultarOutroFluxo({ name, clickHandler }) {
    return (
        <Button id={name} name={name} onClick={clickHandler}>
            <FaSearch />
            Consultar outro fluxo
        </Button>
    );
}

ConsultarOutroFluxo.propTypes = {
    name: PropTypes.string.isRequired,
    clickHandler: PropTypes.func.isRequired,
};
