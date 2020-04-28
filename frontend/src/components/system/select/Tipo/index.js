import React from 'react';
import PropTypes from 'prop-types';

import Select from '../../../layout/Select';

export default function Tipo({ name, changeHandler, ...rest }) {
  const options = [
    {
      label: 'Normal',
      value: 'N',
    },
    {
      label: 'Gabinete',
      value: 'G',
    },
    {
      label: 'Especial',
      value: 'E',
    },
  ];

  return (
    <Select
      id={name}
      name={name}
      label="Tipo"
      options={options}
      onChange={changeHandler}
      {...rest}
    />
  );
}

Tipo.propTypes = {
  name: PropTypes.string.isRequired,
  changeHandler: PropTypes.func,
};

Tipo.defaultProps = {
  changeHandler: null,
};
