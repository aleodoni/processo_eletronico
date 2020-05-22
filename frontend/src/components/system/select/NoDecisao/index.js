import React from 'react';
import PropTypes from 'prop-types';

import Select from '../../../layout/Select';

export default function NoDecisao({ name, changeHandler, ...rest }) {
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
      label="Nó de decisão"
      options={options}
      onChange={changeHandler}
      {...rest}
    />
  );
}

NoDecisao.propTypes = {
  name: PropTypes.string.isRequired,
  changeHandler: PropTypes.func,
};

NoDecisao.defaultProps = {
  changeHandler: null,
};
