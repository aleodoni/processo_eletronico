import React from 'react';
import PropTypes from 'prop-types';

import Select from '../../../layout/Select';

export default function NoAvalHorario({ name, changeHandler, ...rest }) {
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
      label="Aval de horário"
      options={options}
      onChange={changeHandler}
      {...rest}
    />
  );
}

NoAvalHorario.propTypes = {
  name: PropTypes.string.isRequired,
  changeHandler: PropTypes.func,
};

NoAvalHorario.defaultProps = {
  changeHandler: null,
};
