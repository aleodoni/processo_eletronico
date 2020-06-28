import React from 'react';
import PropTypes from 'prop-types';

import Select from '../../../layout/Select';

export default function CienciaCalculo({ name, changeHandler, ...rest }) {
  const options = [
    {
      label: 'Estou ciente do cálculo',
      value: 'Estou ciente do cálculo',
    },
    {
      label: 'Discordo do cálculo',
      value: 'Discordo do cálculo',
    },
  ];

  return (
    <Select
      id={name}
      name={name}
      label="Ciência do cálculo"
      options={options}
      onChange={changeHandler}
      {...rest}
    />
  );
}

CienciaCalculo.propTypes = {
  name: PropTypes.string.isRequired,
  changeHandler: PropTypes.func,
};

CienciaCalculo.defaultProps = {
  changeHandler: null,
};
