import React from 'react';
import PropTypes from 'prop-types';

import Select from '../../../layout/Select';

export default function NoInicio({ name, changeHandler, ...rest }) {
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
    <Select name={name} label="Nó inicial" options={options} onChange={changeHandler} {...rest} />
  );
}

NoInicio.propTypes = {
  name: PropTypes.string.isRequired,
  changeHandler: PropTypes.func,
};

NoInicio.defaultProps = {
  changeHandler: null,
};
