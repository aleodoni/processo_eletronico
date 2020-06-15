import React from 'react';
import PropTypes from 'prop-types';

import Select from '../../../layout/Select';

export default function Averbacao({ name, changeHandler, ...rest }) {
  const options = [
    {
      label: 'Favorável',
      value: 'Favorável',
    },
    {
      label: 'Parcialmente favorável',
      value: 'Parcialmente favorável',
    },
    {
      label: 'Desfavorável',
      value: 'Desfavorável',
    },
  ];

  return (
    <Select
      id={name}
      name={name}
      label="Averbação"
      options={options}
      onChange={changeHandler}
      {...rest}
    />
  );
}

Averbacao.propTypes = {
  name: PropTypes.string.isRequired,
  changeHandler: PropTypes.func,
};

Averbacao.defaultProps = {
  changeHandler: null,
};
