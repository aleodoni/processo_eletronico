import React from 'react';
import PropTypes from 'prop-types';

import { Container } from './styles';

export default function ButtonCancelaArquivo({ children, ...rest }) {
    return <Container {...rest}>{children}</Container>;
}

ButtonCancelaArquivo.propTypes = {
    children: PropTypes.node.isRequired,
};
