import React from 'react';
import PropTypes from 'prop-types';

import Select from '../../../layout/Select';

export default function NoAverbacao({ name, changeHandler, ...rest }) {
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
    <Select name={name} label="Averbação" options={options} onChange={changeHandler} {...rest} />
  );
}

NoAverbacao.propTypes = {
  name: PropTypes.string.isRequired,
  changeHandler: PropTypes.func,
};

NoAverbacao.defaultProps = {
  changeHandler: null,
};
