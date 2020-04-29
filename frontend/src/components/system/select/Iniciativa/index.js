import React from 'react';
import PropTypes from 'prop-types';

import Select from '../../../layout/Select';

export default function Iniciativa({ name, changeHandler, ...rest }) {
  const options = [
    {
      label: 'Interna',
      value: 'Interna',
    },
    {
      label: 'Externa',
      value: 'Externa',
    },
  ];

  return (
    <Select name={name} label="Iniciativa" options={options} onChange={changeHandler} {...rest} />
  );
}

Iniciativa.propTypes = {
  name: PropTypes.string.isRequired,
  changeHandler: PropTypes.func,
};

Iniciativa.defaultProps = {
  changeHandler: null,
};
