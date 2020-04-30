import React from 'react';
import { FaSitemap } from 'react-icons/fa';
import PropTypes from 'prop-types';

import Button from '../Button';

export default function GeraFluxo({ name, clickHandler }) {
    return (
        <Button id={name} name={name} type="button" onClick={clickHandler}>
            <FaSitemap />
            Gerar fluxo
        </Button>
    );
}

GeraFluxo.propTypes = {
    name: PropTypes.string.isRequired,
    clickHandler: PropTypes.func.isRequired,
};
