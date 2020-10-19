import React from 'react';
import PropTypes from 'prop-types';

import Select from '../../../layout/Select';

export default function NoCienciaAverbacao({ name, changeHandler, ...rest }) {
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
      label="Ciência da averbação"
      options={options}
      onChange={changeHandler}
      {...rest}
    />
  );
}

NoCienciaAverbacao.propTypes = {
  name: PropTypes.string.isRequired,
  changeHandler: PropTypes.func,
};

NoCienciaAverbacao.defaultProps = {
  changeHandler: null,
};
