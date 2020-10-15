import React from 'react';
import PropTypes from 'prop-types';

import Select from '../../../layout/Select';

export default function TramitacaoAberta({ name, changeHandler, ...rest }) {
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
      label="Tramitação aberta"
      options={options}
      onChange={changeHandler}
      {...rest}
    />
  );
}

TramitacaoAberta.propTypes = {
  name: PropTypes.string.isRequired,
  changeHandler: PropTypes.func,
};

TramitacaoAberta.defaultProps = {
  changeHandler: null,
};
