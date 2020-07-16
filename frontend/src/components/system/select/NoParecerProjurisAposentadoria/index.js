import React from 'react';
import PropTypes from 'prop-types';

import Select from '../../../layout/Select';

export default function NoParecerProjurisAposentadoria({ name, changeHandler, ...rest }) {
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
      label="Parecer da aposentadoria"
      options={options}
      onChange={changeHandler}
      {...rest}
    />
  );
}

NoParecerProjurisAposentadoria.propTypes = {
  name: PropTypes.string.isRequired,
  changeHandler: PropTypes.func,
};

NoParecerProjurisAposentadoria.defaultProps = {
  changeHandler: null,
};
