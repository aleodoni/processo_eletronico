import React, { useRef, useEffect } from 'react';
import { useField } from '@unform/core';
import PropTypes from 'prop-types';

import { Container } from './styles';

export default function Input({ name, label, size, ...rest }) {
    const inputRef = useRef(null);

    const { fieldName, defaultValue, registerField, error } = useField(name);

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

            <input
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

Input.propTypes = {
    name: PropTypes.string.isRequired,
    label: PropTypes.string,
    size: PropTypes.number,
};

Input.defaultProps = {
    label: null,
    size: 1,
};
