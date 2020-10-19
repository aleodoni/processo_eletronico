import React from 'react';
import PropTypes from 'prop-types';

import Select from '../../../layout/Select';

export default function TipoProcessoVisivel({ name, changeHandler, ...rest }) {
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
    <Select name={name} label="Visível" options={options} onChange={changeHandler} {...rest} />
  );
}

TipoProcessoVisivel.propTypes = {
  name: PropTypes.string.isRequired,
  changeHandler: PropTypes.func,
};

TipoProcessoVisivel.defaultProps = {
  changeHandler: null,
};
