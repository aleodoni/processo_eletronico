import React from 'react';
import PropTypes from 'prop-types';

import Select from '../../../layout/Select';

export default function SelecionaPasPad({ name, changeHandler, ...rest }) {
  const TIPO_PROCESSO_ADMINISTRATIVO_SINDICANCIA = 16;
  const TIPO_PROCESSO_ADMINISTRATIVO_DISCIPLINAR = 15;
  const options = [
    {
      label: 'Processo Administrativo de Sindicância - PAS',
      value: TIPO_PROCESSO_ADMINISTRATIVO_SINDICANCIA,
    },
    {
      label: 'Processo Administrativo Disciplinar - PAD',
      value: TIPO_PROCESSO_ADMINISTRATIVO_DISCIPLINAR,
    },
  ];

  return (
    <Select
      id={name}
      name={name}
      label="Tipo do processo"
      options={options}
      onChange={changeHandler}
      {...rest}
    />
  );
}

SelecionaPasPad.propTypes = {
  name: PropTypes.string.isRequired,
  changeHandler: PropTypes.func,
};

SelecionaPasPad.defaultProps = {
  changeHandler: null,
};
