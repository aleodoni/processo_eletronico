import React from 'react';
import PropTypes from 'prop-types';

import Select from '../../../layout/Select';

export default function Ativo({ name, val, changeHandler, ...rest }) {
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

  return <Select id={name} name={name} label="Ativo" options={options} value={options.filter(({ value }) => value === val)} onChange={changeHandler} {...rest} />;
}

Ativo.propTypes = {
  name: PropTypes.string.isRequired,
  val: PropTypes.oneOfType([PropTypes.string, PropTypes.number, null]),
  changeHandler: PropTypes.func.isRequired,
};

Ativo.defaultProps = {
  val: null,
};
