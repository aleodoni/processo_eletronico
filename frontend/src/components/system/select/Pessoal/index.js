import React from 'react';
import PropTypes from 'prop-types';

import Select from '../../../layout/Select';

export default function Pessoal({ name, changeHandler, ...rest }) {
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
    <Select name={name} label="Pessoal" options={options} onChange={changeHandler} {...rest} />
  );
}

Pessoal.propTypes = {
  name: PropTypes.string.isRequired,
  changeHandler: PropTypes.func,
};

Pessoal.defaultProps = {
  changeHandler: null,
};
