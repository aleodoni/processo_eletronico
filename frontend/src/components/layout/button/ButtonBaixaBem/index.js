import React from 'react';
import PropTypes from 'prop-types';

import { Container } from './styles';

export default function ButtonBaixaBem({ children, ...rest }) {
    return <Container {...rest}>{children}</Container>;
}

ButtonBaixaBem.propTypes = {
    children: PropTypes.node.isRequired,
};
