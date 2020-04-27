import React from 'react';
import PropTypes from 'prop-types';

import { Container } from './styles';

export default function ButtonAcessoRapido({ children, ...rest }) {
    return <Container {...rest}>{children}</Container>;
}

ButtonAcessoRapido.propTypes = {
    children: PropTypes.node.isRequired,
};
