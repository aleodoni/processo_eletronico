/* eslint-disable react-hooks/exhaustive-deps */

import React, { useRef, useEffect } from 'react';
import { useField } from '@unform/core';
import PropTypes from 'prop-types';

import { Container, BasicSelect } from './styles';

export default function Select({ name, label, options, size, ...rest }) {
    const selectRef = useRef(null);

    const { fieldName, registerField, error } = useField(name);

    useEffect(() => {
        registerField({
            name: fieldName,
            ref: selectRef.current,
            path: 'value',
        });
    }, [fieldName, registerField]);

    const montaOptions = () => {
        return (
            <>
                <option value="-1">Selecione...</option>
                {options.map(option => (
                    <option key={option.value} value={option.value}>
                        {option.label}
                    </option>
                ))}
            </>
        );
    };

    return (
        <Container size={size}>
            {label && <label htmlFor={fieldName}>{label}</label>}

            <BasicSelect name={fieldName} id={fieldName} ref={selectRef} {...rest}>
                {montaOptions()}
            </BasicSelect>

            {error && <span className="error">{error}</span>}
        </Container>
    );

    // useEffect(() => {
    //     registerField({
    //         name: fieldName,
    //         ref: selectRef.current,
    //         path: 'state.value',
    //         getValue: ref => {
    //             if (rest.isMulti) {
    //                 if (!ref.state.value) {
    //                     return [];
    //                 }

    //                 return ref.state.value.map(option => option.value);
    //             }

    //             if (!ref.state.value) {
    //                 return '';
    //             }

    //             return ref.state.value.value;
    //         },
    //     });
    // }, [fieldName, registerField, rest.isMulti]);

    // return (
    //     <Container size={size}>
    //         {label && <label htmlFor={fieldName}>{label}</label>}

    //         <BasicSelect
    //             placeholder="Selecione..."
    //             defaultValue={defaultValue}
    //             ref={selectRef}
    //             {...rest}
    //             classNamePrefix="react-select"
    //             className="react-select-container"
    //             theme={theme => ({
    //                 ...theme,
    //                 borderRadius: 4,
    //                 colors: {
    //                     ...theme.colors,
    //                     primary25: defaultTheme.inputBorder,
    //                     primary: defaultTheme.primary,
    //                     neutral0: defaultTheme.inputBackground,

    //                     neutral40: defaultTheme.text,
    //                     neutral50: defaultTheme.text,
    //                     neutral80: defaultTheme.text,
    //                 },
    //             })}
    //             options={options}
    //         />
    //     </Container>
    // );
}

Select.propTypes = {
    name: PropTypes.string.isRequired,
    options: PropTypes.arrayOf(
        PropTypes.shape({
            label: PropTypes.string,
            value: PropTypes.oneOfType([PropTypes.string, PropTypes.bool, PropTypes.number]),
        })
    ),
    label: PropTypes.string,
    size: PropTypes.number,
};

Select.defaultProps = {
    options: [],
    label: null,
    size: 1,
};
