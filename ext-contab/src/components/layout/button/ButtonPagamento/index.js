import React from 'react';
import PropTypes from 'prop-types';

import { Container } from './styles';

export default function ButtonPagamento({ children, ...rest }) {
    return <Container {...rest}>{children}</Container>;
}

ButtonPagamento.propTypes = {
    children: PropTypes.node.isRequired,
};
