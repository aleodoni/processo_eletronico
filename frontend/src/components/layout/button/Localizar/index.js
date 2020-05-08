import React from 'react';
import { FaSearch } from 'react-icons/fa';
import PropTypes from 'prop-types';

import Button from '../Button';

export default function Localizar({ name, clickHandler }) {
    return (
        <Button id={name} name={name} onClick={clickHandler}>
            <FaSearch />
            Localizar
        </Button>
    );
}

Localizar.propTypes = {
    name: PropTypes.string.isRequired,
    clickHandler: PropTypes.func,
};

Localizar.defaultProps = {
    clickHandler: null,
};
