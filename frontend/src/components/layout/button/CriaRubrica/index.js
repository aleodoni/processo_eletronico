import React from 'react';
import { FaFileAlt } from 'react-icons/fa';
import PropTypes from 'prop-types';

import Button from '../Button';

export default function CriaRubrica({ name, clickHandler }) {
    return (
        <Button id={name} name={name} onClick={clickHandler}>
            <FaFileAlt />
            Criar rubrica
        </Button>
    );
}

CriaRubrica.propTypes = {
    name: PropTypes.string.isRequired,
    clickHandler: PropTypes.func.isRequired,
};
