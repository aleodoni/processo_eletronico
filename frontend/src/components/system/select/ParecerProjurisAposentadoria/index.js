import React from 'react';
import PropTypes from 'prop-types';

import Select from '../../../layout/Select';

export default function ParecerProjurisAposentadoria({ name, changeHandler, ...rest }) {
  const options = [
    {
      label: 'Pela legalidade e regularidade',
      value: 'Pela legalidade e regularidade',
    },
    {
      label: 'Correção de informações ou esclarecimentos',
      value: 'Correção de informações ou esclarecimentos',
    },
  ];

  return (
    <Select
      id={name}
      name={name}
      label="Parecer"
      options={options}
      onChange={changeHandler}
      {...rest}
    />
  );
}

ParecerProjurisAposentadoria.propTypes = {
  name: PropTypes.string.isRequired,
  changeHandler: PropTypes.func,
};

ParecerProjurisAposentadoria.defaultProps = {
  changeHandler: null,
};
