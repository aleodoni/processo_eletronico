import React, { useRef, useEffect } from 'react';
import ReactInputMask from 'react-input-mask';
import { useField } from '@unform/core';
import PropTypes from 'prop-types';
import { Container } from './styles';

export default function InputMask({ name, label, size, ...rest }) {
    const inputRef = useRef(null);

    const { fieldName, registerField, defaultValue, error } = useField(name);

    useEffect(() => {
        registerField({
            name: fieldName,
            ref: inputRef.current,
            path: 'value',
        });
    }, [fieldName, registerField]);

    return (
        <Container size={size}>
            {label && <label htmlFor={fieldName}>{label}</label>}
            <ReactInputMask
                name={fieldName}
                id={fieldName}
                ref={inputRef}
                defaultValue={defaultValue}
                {...rest}
            />
            <span className="error">{error}</span>
        </Container>
    );
}

InputMask.propTypes = {
    name: PropTypes.string.isRequired,
    label: PropTypes.string,
    size: PropTypes.number,
};

InputMask.defaultProps = {
    label: null,
    size: 1,
};
