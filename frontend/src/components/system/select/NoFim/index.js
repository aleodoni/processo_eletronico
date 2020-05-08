import React from 'react';
import PropTypes from 'prop-types';

import Select from '../../../layout/Select';

export default function NoFim({ name, changeHandler, ...rest }) {
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
    <Select name={name} label="Nó final" options={options} onChange={changeHandler} {...rest} />
  );
}

NoFim.propTypes = {
  name: PropTypes.string.isRequired,
  changeHandler: PropTypes.func,
};

NoFim.defaultProps = {
  changeHandler: null,
};
