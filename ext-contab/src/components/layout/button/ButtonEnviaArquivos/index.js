import React from 'react';
import PropTypes from 'prop-types';

import { Container } from './styles';

export default function ButtonEnviaArquivos({ children, ...rest }) {
    return <Container {...rest}>{children}</Container>;
}

ButtonEnviaArquivos.propTypes = {
    children: PropTypes.node.isRequired,
};
