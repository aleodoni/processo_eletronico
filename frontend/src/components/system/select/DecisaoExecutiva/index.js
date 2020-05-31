import React from 'react';
import PropTypes from 'prop-types';

import Select from '../../../layout/Select';

export default function DecisaoExecutiva({ name, changeHandler, ...rest }) {
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
      label="Decisão"
      options={options}
      onChange={changeHandler}
      {...rest}
    />
  );
}

DecisaoExecutiva.propTypes = {
  name: PropTypes.string.isRequired,
  changeHandler: PropTypes.func,
};

DecisaoExecutiva.defaultProps = {
  changeHandler: null,
};
