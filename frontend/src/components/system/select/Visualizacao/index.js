import React from 'react';
import PropTypes from 'prop-types';

import Select from '../../../layout/Select';

export default function Visualizacao({ name, val, changeHandler, ...rest }) {
  const options = [
    { label: 'Normal', value: 0 },
    { label: 'Restrito', value: 1 },
    { label: 'Sigiloso', value: 2 },
  ];

  return (
    <Select
      id={name}
      name={name}
      label="Visualização"
      options={options}
      value={options.filter(({ value }) => value === val)}
      onChange={changeHandler}
      {...rest}
    />
  );
}

Visualizacao.propTypes = {
  name: PropTypes.string.isRequired,
  val: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  changeHandler: PropTypes.func.isRequired,
};

Visualizacao.defaultProps = {
  val: null,
};
