/* eslint-disable react-hooks/exhaustive-deps */

import React, { useRef, useEffect } from 'react';
import { useField } from '@unform/core';
import PropTypes from 'prop-types';

import { Container, BasicSelect } from './styles';
import { defaultTheme } from '../../../styles/theme';

export default function Select({ name, label, options, ...rest }) {
    const selectRef = useRef(null);

    const { fieldName, defaultValue, registerField, error } = useField(name);

    useEffect(() => {
        registerField({
            name: fieldName,
            ref: selectRef.current,
            path: 'select.state.value',
            getValue: ref => {
                if (rest.isMulti) {
                    if (!ref.select.state.value) {
                        return [];
                    }

                    return ref.select.state.value.map(option => option.value);
                }
                if (!ref.select.state.value) {
                    return '';
                }

                return ref.select.state.value.value;
            },
        });
    }, [fieldName, registerField, rest.isMulti]);

    return (
        <Container>
            {label && <label htmlFor={fieldName}>{label}</label>}

            <BasicSelect
                placeholder="Selecione..."
                defaultValue={defaultValue}
                ref={selectRef}
                {...rest}
                classNamePrefix="react-select"
                className="react-select-container"
                theme={theme => ({
                    ...theme,
                    borderRadius: 4,
                    colors: {
                        ...theme.colors,
                        primary25: defaultTheme.inputBorder,
                        primary: defaultTheme.primary,
                        neutral0: defaultTheme.inputBackground,

                        neutral40: defaultTheme.text,
                        neutral50: defaultTheme.text,
                        neutral80: defaultTheme.text,
                    },
                })}
                options={options}
            />
        </Container>
    );
}

Select.propTypes = {
    name: PropTypes.string.isRequired,
    options: PropTypes.arrayOf(
        PropTypes.shape({
            label: PropTypes.string.isRequired,
            value: PropTypes.oneOfType([PropTypes.string.isRequired, PropTypes.number.isRequired, null]),
        })
    ).isRequired,
    label: PropTypes.string,
};

Select.defaultProps = {
    label: null,
};
