import React from 'react';
import PropTypes from 'prop-types';

import Select from '../../../layout/Select';

export default function ManifestacaoPublica({ name, changeHandler, ...rest }) {
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
      label="Manifestação pública"
      options={options}
      onChange={changeHandler}
      {...rest}
    />
  );
}

ManifestacaoPublica.propTypes = {
  name: PropTypes.string.isRequired,
  changeHandler: PropTypes.func,
};

ManifestacaoPublica.defaultProps = {
  changeHandler: null,
};
