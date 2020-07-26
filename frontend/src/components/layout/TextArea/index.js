import React, { useRef, useEffect } from 'react';
import { useField } from '@unform/core';
import PropTypes from 'prop-types';

import { Container } from './styles';

export default function TextArea({ name, label, rows, cols, ...rest }) {
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
        <Container>
            {label && <label htmlFor={fieldName}>{label}</label>}

            <textarea
                name={fieldName}
                id={fieldName}
                ref={inputRef}
                rows={rows}
                cols={cols}
                defaultValue={defaultValue}
                {...rest}
            />

            {error && <span className="error">{error}</span>}
        </Container>
    );
}

TextArea.propTypes = {
    name: PropTypes.string.isRequired,
    label: PropTypes.string,
    rows: PropTypes.string,
    cols: PropTypes.string,
};

TextArea.defaultProps = {
    label: null,
    rows: null,
    cols: null,
};
