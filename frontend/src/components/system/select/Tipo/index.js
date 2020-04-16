import React from 'react';
import PropTypes from 'prop-types';

import Select from '../../../layout/Select';

export default function Tipo({ name, val, changeHandler, ...rest }) {
  const options = [
    {
      label: 'Normal',
      value: 'N',
    },
    {
      label: 'Gabinete',
      value: 'G',
    },
    {
      label: 'Especial',
      value: 'E',
    },
  ];

  return <Select id={name} name={name} label="Tipo" options={options} value={options.filter(({ value }) => value === val)} onChange={changeHandler} {...rest} />;
}

Tipo.propTypes = {
  name: PropTypes.string.isRequired,
  val: PropTypes.oneOfType([PropTypes.string, PropTypes.number, null]),
  changeHandler: PropTypes.func.isRequired,
};

Tipo.defaultProps = {
  val: null,
};
