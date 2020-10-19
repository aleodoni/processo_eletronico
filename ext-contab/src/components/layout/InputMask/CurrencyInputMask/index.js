import React, { useRef, useEffect } from 'react';
import IntlCurrencyInput from 'react-intl-currency-input';
import { useField } from '@unform/core';
import PropTypes from 'prop-types';
import { Container } from './styles';

export default function CurrencyInputMask({ name, label, size, ...rest }) {
    const currencyConfig = {
        locale: 'pt-BR',
        formats: {
            number: {
                BRL: {
                    style: 'currency',
                    currency: 'BRL',
                    minimumFractionDigits: 2,
                    maximumFractionDigits: 2,
                },
            },
        },
    };
    const inputRef = useRef(null);

    const { fieldName, registerField, defaultValue, error } = useField(name);

    useEffect(() => {
        registerField({
            name: fieldName,
            ref: inputRef.current,
            path: 'value',
        });
    }, [fieldName, registerField]);

    const handleChange = (event, val, maskedValue) => {
        event.preventDefault();
        console.log(val); // value without mask (ex: 1234.56)
        console.log(maskedValue); // masked value (ex: R$1234,56)
        inputRef.current.value = val;
    };

    return (
        <Container size={size}>
            {label && <label htmlFor={fieldName}>{label}</label>}
            <IntlCurrencyInput
                currency="BRL"
                config={currencyConfig}
                name={fieldName}
                id={fieldName}
                ref={inputRef}
                defaultValue={defaultValue}
                onChange={handleChange}
                {...rest}
            />
            <span className="error">{error}</span>
        </Container>
    );
}

CurrencyInputMask.propTypes = {
    name: PropTypes.string.isRequired,
    label: PropTypes.string,
    size: PropTypes.number,
};

CurrencyInputMask.defaultProps = {
    label: null,
    size: 1,
};
