import React from 'react';
import { FaFileAlt } from 'react-icons/fa';
import PropTypes from 'prop-types';

import Button from '../Button';

export default function CriaManifestacao({ name, clickHandler }) {
    return (
        <Button id={name} name={name} onClick={clickHandler}>
            <FaFileAlt />
            Criar manifestação
        </Button>
    );
}

CriaManifestacao.propTypes = {
    name: PropTypes.string.isRequired,
    clickHandler: PropTypes.func.isRequired,
};
