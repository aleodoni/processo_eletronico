import React from 'react';
import PropTypes from 'prop-types';

import { Container } from './styles';

export default function FormLine({ children, ...rest }) {
    return <Container {...rest}>{children}</Container>;
}

FormLine.propTypes = {
    children: PropTypes.node.isRequired,
};
