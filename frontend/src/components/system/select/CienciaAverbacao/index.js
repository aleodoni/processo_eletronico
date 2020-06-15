import React from 'react';
import PropTypes from 'prop-types';

import Select from '../../../layout/Select';

export default function CienciaAverbacao({ name, changeHandler, ...rest }) {
  const options = [
    {
      label: 'Concordo com a averbação parcial',
      value: 'Concordo com a averbação parcial',
    },
    {
      label: 'Nova apresentação de CTC',
      value: 'Nova apresentação de CTC',
    },

    {
      label: 'Desisto do pedido',
      value: 'Desisto do pedido',
    },
  ];

  return (
    <Select
      id={name}
      name={name}
      label="Ciência da averbação"
      options={options}
      onChange={changeHandler}
      {...rest}
    />
  );
}

CienciaAverbacao.propTypes = {
  name: PropTypes.string.isRequired,
  changeHandler: PropTypes.func,
};

CienciaAverbacao.defaultProps = {
  changeHandler: null,
};
