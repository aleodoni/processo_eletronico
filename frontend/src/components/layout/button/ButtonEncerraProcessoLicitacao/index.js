import React from 'react';
import PropTypes from 'prop-types';

import { Container } from './styles';

export default function ButtonEncerraProcessoLicitacao({ children, ...rest }) {
    return <Container {...rest}>{children}</Container>;
}

ButtonEncerraProcessoLicitacao.propTypes = {
    children: PropTypes.node.isRequired,
};
