import React from 'react';
import PropTypes from 'prop-types';

import Select from '../../../layout/Select';

export default function NoDecisaoPad({ name, changeHandler, ...rest }) {
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
      label="Decisão de PAD"
      options={options}
      onChange={changeHandler}
      {...rest}
    />
  );
}

NoDecisaoPad.propTypes = {
  name: PropTypes.string.isRequired,
  changeHandler: PropTypes.func,
};

NoDecisaoPad.defaultProps = {
  changeHandler: null,
};
