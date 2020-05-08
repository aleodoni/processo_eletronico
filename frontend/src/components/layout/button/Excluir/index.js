import React from 'react';
import { FaRegTrashAlt } from 'react-icons/fa';
import PropTypes from 'prop-types';

import Button from '../Button';

export default function Excluir({ name, clickHandler }) {
    return (
        <Button id={name} name={name} type="button" onClick={clickHandler}>
            <FaRegTrashAlt />
            Excluir
        </Button>
    );
}

Excluir.propTypes = {
    name: PropTypes.string.isRequired,
    clickHandler: PropTypes.func.isRequired,
};
