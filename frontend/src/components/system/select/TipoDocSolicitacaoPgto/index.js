import React from 'react';
import PropTypes from 'prop-types';

import Select from '../../../layout/Select';

export default function TipoDocSolicitacaoPgto({ name, changeHandler, ...rest }) {
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
      label="Solicitação de pagamento"
      options={options}
      onChange={changeHandler}
      {...rest}
    />
  );
}

TipoDocSolicitacaoPgto.propTypes = {
  name: PropTypes.string.isRequired,
  changeHandler: PropTypes.func,
};

TipoDocSolicitacaoPgto.defaultProps = {
  changeHandler: null,
};
