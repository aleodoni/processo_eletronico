import React from 'react';
import PropTypes from 'prop-types';

import Select from '../../../layout/Select';

export default function VistoExecutiva({ name, changeHandler, ...rest }) {
  const options = [
    {
      label: 'Concedido',
      value: 'Concedido',
    },
    {
      label: 'Negado',
      value: 'Negado',
    },
  ];

  return (
    <Select
      id={name}
      name={name}
      label="Visto"
      options={options}
      onChange={changeHandler}
      {...rest}
    />
  );
}

VistoExecutiva.propTypes = {
  name: PropTypes.string.isRequired,
  changeHandler: PropTypes.func,
};

VistoExecutiva.defaultProps = {
  changeHandler: null,
};
