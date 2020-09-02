import React from 'react';
import PropTypes from 'prop-types';

import { Container } from './styles';

export default function ButtonContainer({ children, ...rest }) {
    return <Container {...rest}>{children}</Container>;
}

ButtonContainer.propTypes = {
    children: PropTypes.node.isRequired,
};
