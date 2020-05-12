import React from 'react';
import { FaSearchPlus } from 'react-icons/fa';
import PropTypes from 'prop-types';

import Button from '../Button';

export default function Pesquisar({ name, clickHandler }) {
    return (
        <Button id={name} name={name} onClick={clickHandler}>
            <FaSearchPlus size="1em" />
            Pesquisar
        </Button>
    );
}

Pesquisar.propTypes = {
    name: PropTypes.string.isRequired,
    clickHandler: PropTypes.func,
};

Pesquisar.defaultProps = {
    clickHandler: null,
};
