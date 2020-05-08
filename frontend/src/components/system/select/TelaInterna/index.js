import React from 'react';
import PropTypes from 'prop-types';

import Select from '../../../layout/Select';

export default function TelaInterna({ name, changeHandler, ...rest }) {
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
    <Select name={name} label="Tela interna" options={options} onChange={changeHandler} {...rest} />
  );
}

TelaInterna.propTypes = {
  name: PropTypes.string.isRequired,
  changeHandler: PropTypes.func,
};

TelaInterna.defaultProps = {
  changeHandler: null,
};
