import React from 'react';
import PropTypes from 'prop-types';

import Select from '../../../layout/Select';

export default function Pessoal({ name, val, changeHandler, ...rest }) {
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

  return <Select id={name} name={name} label="Pessoal" options={options} value={options.filter(({ value }) => value === val)} onChange={changeHandler} {...rest} />;
}

Pessoal.propTypes = {
  name: PropTypes.string.isRequired,
  val: PropTypes.oneOfType([PropTypes.string, PropTypes.number, null]),
  changeHandler: PropTypes.func.isRequired,
};

Pessoal.defaultProps = {
  val: null,
};
