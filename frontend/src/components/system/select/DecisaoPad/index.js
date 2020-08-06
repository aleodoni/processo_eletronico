import React from 'react';
import PropTypes from 'prop-types';

import Select from '../../../layout/Select';

export default function DecisaoPad({ name, changeHandler, ...rest }) {
  const options = [
    {
      label: 'Pela continuidade do processo',
      value: 'Pela continuidade do processo',
    },
    {
      label: 'Novas diligências',
      value: 'Novas diligências',
    },
    {
      label: 'Agravamento de penalidade',
      value: 'Agravamento de penalidade',
    },
  ];

  return (
    <Select
      id={name}
      name={name}
      label="Decisão de PAD"
      options={options}
      onChange={changeHandler}
      {...rest}
    />
  );
}

DecisaoPad.propTypes = {
  name: PropTypes.string.isRequired,
  changeHandler: PropTypes.func,
};

DecisaoPad.defaultProps = {
  changeHandler: null,
};
