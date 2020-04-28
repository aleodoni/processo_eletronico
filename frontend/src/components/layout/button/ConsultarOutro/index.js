import React from 'react';
import { FaSearch } from 'react-icons/fa';
import PropTypes from 'prop-types';

import Button from '../Button';

export default function ConsultarOutro({ name, clickHandler }) {
    return (
        <Button id={name} name={name} onClick={clickHandler}>
            <FaSearch />
            Consultar outro
        </Button>
    );
}

ConsultarOutro.propTypes = {
    name: PropTypes.string.isRequired,
    clickHandler: PropTypes.func.isRequired,
};
