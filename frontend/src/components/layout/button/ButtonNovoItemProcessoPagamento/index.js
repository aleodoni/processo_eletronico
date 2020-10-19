import React from 'react';
import PropTypes from 'prop-types';

import { Container } from './styles';

export default function ButtonNovoItemProcessoPagamento({ children, ...rest }) {
    return <Container {...rest}>{children}</Container>;
}

ButtonNovoItemProcessoPagamento.propTypes = {
    children: PropTypes.node.isRequired,
};
