import React, { useRef, useEffect } from 'react';
import { useField } from '@unform/core';
import PropTypes from 'prop-types';
import MaskedInput from 'react-text-mask';

import { Container } from './styles';

export default function DateInputMask({ name, label, size, ...rest }) {
    const inputRef = useRef(null);
    const { fieldName, registerField, defaultValue, error } = useField(name);

    useEffect(() => {
        registerField({
            name: fieldName,
            ref: inputRef.current,
            path: 'value',
        });
    }, [fieldName, registerField]);

    function handleKeyDown() {
        const { value } = inputRef.current.inputElement;
        inputRef.current.inputElement.value = value;
    }

    function handleChange(e) {
        inputRef.current.value = e.target.value;
        // inputRef.current.inputElement.value = e.target.value;
    }
    return (
        <Container size={size}>
            {label && <label htmlFor={fieldName}>{label}</label>}

            <MaskedInput
                name={fieldName}
                id={fieldName}
                ref={inputRef}
                defaultValue={defaultValue}
                mask={[/\d/, /\d/, '/', /\d/, /\d/, '/', /\d/, /\d/, /\d/, /\d/]}
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

DateInputMask.propTypes = {
    name: PropTypes.string.isRequired,
    label: PropTypes.string,
    size: PropTypes.number,
};

DateInputMask.defaultProps = {
    label: null,
    size: 1,
};
