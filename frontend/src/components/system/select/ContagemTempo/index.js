import React from 'react';
import PropTypes from 'prop-types';

import Select from '../../../layout/Select';

export default function ContagemTempo({ name, changeHandler, ...rest }) {
  const options = [
    {
      label: 'Suficiência de tempo',
      value: 'Suficiência de tempo',
    },
    {
      label: 'Insuficiência de tempo',
      value: 'Insuficiência de tempo',
    },
  ];

  return (
    <Select
      id={name}
      name={name}
      label="Contagem de tempo"
      options={options}
      onChange={changeHandler}
      {...rest}
    />
  );
}

ContagemTempo.propTypes = {
  name: PropTypes.string.isRequired,
  changeHandler: PropTypes.func,
};

ContagemTempo.defaultProps = {
  changeHandler: null,
};
