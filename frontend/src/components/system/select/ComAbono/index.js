import React from 'react';
import PropTypes from 'prop-types';

import Select from '../../../layout/Select';

export default function ComAbono({ name, changeHandler, ...rest }) {
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
      label="Recebeu comunicado eletrônico prévio?"
      options={options}
      onChange={changeHandler}
      {...rest}
    />
  );
}

ComAbono.propTypes = {
  name: PropTypes.string.isRequired,
  changeHandler: PropTypes.func,
};

ComAbono.defaultProps = {
  changeHandler: null,
};
