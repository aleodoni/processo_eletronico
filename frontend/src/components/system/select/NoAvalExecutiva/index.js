import React from 'react';
import PropTypes from 'prop-types';

import Select from '../../../layout/Select';

export default function NoAvalExecutiva({ name, changeHandler, ...rest }) {
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
      label="Aval da executiva"
      options={options}
      onChange={changeHandler}
      {...rest}
    />
  );
}

NoAvalExecutiva.propTypes = {
  name: PropTypes.string.isRequired,
  changeHandler: PropTypes.func,
};

NoAvalExecutiva.defaultProps = {
  changeHandler: null,
};
