import React from 'react';
import PropTypes from 'prop-types';

import Select from '../../../layout/Select';

export default function NoInteressado({ name, changeHandler, ...rest }) {
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
    <Select name={name} label="Interessado" options={options} onChange={changeHandler} {...rest} />
  );
}

NoInteressado.propTypes = {
  name: PropTypes.string.isRequired,
  changeHandler: PropTypes.func,
};

NoInteressado.defaultProps = {
  changeHandler: null,
};
