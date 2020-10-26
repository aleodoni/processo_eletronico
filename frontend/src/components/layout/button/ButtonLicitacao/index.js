import React from 'react';
import PropTypes from 'prop-types';

import { Container } from './styles';

export default function ButtonLicitacao({ children, ...rest }) {
    return <Container {...rest}>{children}</Container>;
}

ButtonLicitacao.propTypes = {
    children: PropTypes.node.isRequired,
};
