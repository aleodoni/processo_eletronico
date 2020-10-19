import React, { useRef, useEffect } from 'react';
import { useField } from '@unform/core';
import PropTypes from 'prop-types';

import { Container } from './styles';

export default function InputSemLabel({ name, size, ...rest }) {
    const inputRef = useRef(null);

    const { fieldName, registerField, error } = useField(name);

    useEffect(() => {
        registerField({
            name: fieldName,
            ref: inputRef.current,
            path: 'value',
        });
    }, [fieldName, registerField]);

    return (
        <Container size={size}>
            <input name={fieldName} id={fieldName} ref={inputRef} {...rest} />

            <span className="error">{error}</span>
        </Container>
    );
}

InputSemLabel.propTypes = {
    name: PropTypes.string.isRequired,
    size: PropTypes.number,
};

InputSemLabel.defaultProps = {
    size: 1,
};
