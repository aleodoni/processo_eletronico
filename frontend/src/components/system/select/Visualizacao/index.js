import React from 'react';
import PropTypes from 'prop-types';

import Select from '../../../layout/Select';

export default function Visualizacao({ name, changeHandler, ...rest }) {
  const options = [
    {
      label: 'Normal',
      value: '0',
    },
    {
      label: 'Restrito',
      value: '1',
    },
    {
      label: 'Sigiloso',
      value: '2',
    },
  ];

  return (
    <Select
      id={name}
      name={name}
      label="Visualização"
      options={options}
      onChange={changeHandler}
      {...rest}
    />
  );
}

Visualizacao.propTypes = {
  name: PropTypes.string.isRequired,
  changeHandler: PropTypes.func,
};

Visualizacao.defaultProps = {
  changeHandler: null,
};
