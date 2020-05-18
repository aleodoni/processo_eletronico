import React, { useRef, useEffect } from 'react';
import { useField } from '@unform/core';
import PropTypes from 'prop-types';
import MaskedInput from 'react-text-mask';

import { Container } from './styles';

export default function ProcessoInputMask({ name, label, size, ...rest }) {
    const inputRef = useRef(null);
    const { fieldName, registerField, defaultValue, error } = useField(name);

    useEffect(() => {
        registerField({
            name: fieldName,
            ref: inputRef.current,
            path: 'value',
        });
    }, [fieldName, registerField]);

    function pad(n, width, z) {
        z = z || '0';
        n += '';
        return n.length >= width ? n : new Array(width - n.length + 1).join(z) + n;
    }

    function handleKeyDown({ keyCode }) {
        const { value } = inputRef.current.inputElement;

        if ((keyCode === 191 || keyCode === 111) && inputRef.current.value.length < 5) {
            const newValue = pad(value, 5);
            inputRef.current.inputElement.value = newValue;
        }
    }

    function handleChange(e) {
        inputRef.current.value = e.target.value;
    }
    return (
        <Container size={size}>
            {label && <label htmlFor={fieldName}>{label}</label>}

            <MaskedInput
                name={fieldName}
                id={fieldName}
                ref={inputRef}
                defaultValue={defaultValue}
                mask={[/\d/, /\d/, /\d/, /\d/, /\d/, '/', /\d/, /\d/, /\d/, /\d/]}
                guide={false}
                modelClean
                onKeyDown={handleKeyDown}
                onChange={handleChange}
                {...rest}
            />

            <span className="error">{error}</span>
        </Container>
    );
}

ProcessoInputMask.propTypes = {
    name: PropTypes.string.isRequired,
    label: PropTypes.string,
    size: PropTypes.number,
};

ProcessoInputMask.defaultProps = {
    label: null,
    size: 1,
};
