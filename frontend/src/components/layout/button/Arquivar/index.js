import React from 'react';
import { FaFolder } from 'react-icons/fa';
import PropTypes from 'prop-types';

import ButtonTramita from '../ButtonTramita';

export default function Arquivar({ name, clickHandler }) {
    return (
        <ButtonTramita id={name} name={name} onClick={clickHandler} type="button">
            <FaFolder />
            Arquivar processo
        </ButtonTramita>
    );
}

Arquivar.propTypes = {
    name: PropTypes.string.isRequired,
    clickHandler: PropTypes.func.isRequired,
};
