import React from 'react';
import { FaFolder } from 'react-icons/fa';
import PropTypes from 'prop-types';

import ButtonEncerraProcessoLicitacao from '../ButtonEncerraProcessoLicitacao';

export default function Encerrar({ name, clickHandler }) {
    return (
        <ButtonEncerraProcessoLicitacao id={name} name={name} onClick={clickHandler} type="button">
            <FaFolder />
            Encerrar processo
        </ButtonEncerraProcessoLicitacao>
    );
}

Encerrar.propTypes = {
    name: PropTypes.string.isRequired,
    clickHandler: PropTypes.func.isRequired,
};
