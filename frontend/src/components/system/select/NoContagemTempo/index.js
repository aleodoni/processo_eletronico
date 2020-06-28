import React from 'react';
import PropTypes from 'prop-types';

import Select from '../../../layout/Select';

export default function NoContagemTempo({ name, changeHandler, ...rest }) {
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
    <Select
      name={name}
      label="Contagem de tempo"
      options={options}
      onChange={changeHandler}
      {...rest}
    />
  );
}

NoContagemTempo.propTypes = {
  name: PropTypes.string.isRequired,
  changeHandler: PropTypes.func,
};

NoContagemTempo.defaultProps = {
  changeHandler: null,
};
