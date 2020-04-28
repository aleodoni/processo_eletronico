import React from 'react';
import PropTypes from 'prop-types';

import Select from '../../../layout/Select';

export default function Ativo({ name, changeHandler, ...rest }) {
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

  return <Select name={name} label="Ativo" options={options} onChange={changeHandler} {...rest} />;
}

Ativo.propTypes = {
  name: PropTypes.string.isRequired,
  changeHandler: PropTypes.func,
};

Ativo.defaultProps = {
  changeHandler: null,
};
