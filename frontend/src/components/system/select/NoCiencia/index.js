import React from 'react';
import PropTypes from 'prop-types';

import Select from '../../../layout/Select';

export default function NoCiencia({ name, changeHandler, ...rest }) {
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
    <Select name={name} label="Ciência" options={options} onChange={changeHandler} {...rest} />
  );
}

NoCiencia.propTypes = {
  name: PropTypes.string.isRequired,
  changeHandler: PropTypes.func,
};

NoCiencia.defaultProps = {
  changeHandler: null,
};
