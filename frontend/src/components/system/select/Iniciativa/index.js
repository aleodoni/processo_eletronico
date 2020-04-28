import React from 'react';
import PropTypes from 'prop-types';

import Select from '../../../layout/Select';

export default function Iniciativa({ name, val, changeHandler, ...rest }) {
  const options = [
    {
      label: 'Interna',
      value: 'Interna',
    },
    {
      label: 'Externa',
      value: 'Externa',
    },
  ];

  return (
    <Select
      id={name}
      name={name}
      label="Iniciativa"
      options={options}
      value={options.filter(({ value }) => value === val)}
      onChange={changeHandler}
      {...rest}
    />
  );
}

Iniciativa.propTypes = {
  name: PropTypes.string.isRequired,
  val: PropTypes.oneOfType([PropTypes.string, PropTypes.string]),
  changeHandler: PropTypes.func.isRequired,
};

Iniciativa.defaultProps = {
  val: null,
};
