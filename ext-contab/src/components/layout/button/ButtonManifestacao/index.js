import React from 'react';
import PropTypes from 'prop-types';

import { Container } from './styles';

export default function ButtonManifestacao({ children, ...rest }) {
    return <Container {...rest}>{children}</Container>;
}

ButtonManifestacao.propTypes = {
    children: PropTypes.node.isRequired,
};
