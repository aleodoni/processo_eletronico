import React from 'react';
import PropTypes from 'prop-types';

import { Container } from './styles';

export default function ButtonTramita({ children, ...rest }) {
    return <Container {...rest}>{children}</Container>;
}

ButtonTramita.propTypes = {
    children: PropTypes.node.isRequired,
};
