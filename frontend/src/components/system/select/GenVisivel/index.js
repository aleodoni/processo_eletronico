import React from 'react';
import PropTypes from 'prop-types';

import Select from '../../../layout/Select';

export default function GenVisivel({ name, changeHandler, ...rest }) {
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
      label="Gênero visível"
      options={options}
      onChange={changeHandler}
      {...rest}
    />
  );
}

GenVisivel.propTypes = {
  name: PropTypes.string.isRequired,
  changeHandler: PropTypes.func,
};

GenVisivel.defaultProps = {
  changeHandler: null,
};
