import React from 'react';
import { FaProjectDiagram } from 'react-icons/fa';
import PropTypes from 'prop-types';

import Button from '../Button';

export default function FluxoLicitacao({ name, clickHandler }) {
    return (
        <Button id={name} name={name} onClick={clickHandler}>
            <FaProjectDiagram />
            Ver fluxo de licitação
        </Button>
    );
}

FluxoLicitacao.propTypes = {
    name: PropTypes.string.isRequired,
    clickHandler: PropTypes.func.isRequired,
};
