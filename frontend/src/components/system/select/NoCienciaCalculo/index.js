import React from 'react';
import PropTypes from 'prop-types';

import Select from '../../../layout/Select';

export default function NoCienciaCalculo({ name, changeHandler, ...rest }) {
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
      label="Ciência do cálculo"
      options={options}
      onChange={changeHandler}
      {...rest}
    />
  );
}

NoCienciaCalculo.propTypes = {
  name: PropTypes.string.isRequired,
  changeHandler: PropTypes.func,
};

NoCienciaCalculo.defaultProps = {
  changeHandler: null,
};
