import React from 'react';
import PropTypes from 'prop-types';

import Select from '../../../layout/Select';

export default function FaturaBoleto({ name, changeHandler, ...rest }) {
  const options = [
    {
      label: 'Sim',
      value: true,
    },
    {
      label: 'Não',
      value: false,
    },
  ];

  return (
    <Select
      name={name}
      label="Fatura ou boleto"
      options={options}
      onChange={changeHandler}
      {...rest}
    />
  );
}

FaturaBoleto.propTypes = {
  name: PropTypes.string.isRequired,
  changeHandler: PropTypes.func,
};

FaturaBoleto.defaultProps = {
  changeHandler: null,
};
