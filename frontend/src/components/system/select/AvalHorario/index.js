import React from 'react';
import PropTypes from 'prop-types';

import Select from '../../../layout/Select';

export default function AvalHorario({ name, changeHandler, ...rest }) {
  const options = [
    {
      label: 'Horário concedido',
      value: 'Horário concedido',
    },
    {
      label: 'Horário indeferido',
      value: 'Horário indeferido',
    },
  ];

  return (
    <Select
      id={name}
      name={name}
      label="Aval de horário"
      options={options}
      onChange={changeHandler}
      {...rest}
    />
  );
}

AvalHorario.propTypes = {
  name: PropTypes.string.isRequired,
  changeHandler: PropTypes.func,
};

AvalHorario.defaultProps = {
  changeHandler: null,
};
