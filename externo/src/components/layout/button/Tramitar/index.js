import React from 'react';
import { FaNetworkWired } from 'react-icons/fa';
import PropTypes from 'prop-types';

import ButtonTramita from '../ButtonTramita';

export default function Tramitar({ name, clickHandler }) {
    return (
        <ButtonTramita id={name} name={name} onClick={clickHandler} type="button">
            <FaNetworkWired />
            Tramitar
        </ButtonTramita>
    );
}

Tramitar.propTypes = {
    name: PropTypes.string.isRequired,
    clickHandler: PropTypes.func.isRequired,
};
