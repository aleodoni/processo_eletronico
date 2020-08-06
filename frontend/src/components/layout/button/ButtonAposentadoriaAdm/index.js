import React from 'react';
import PropTypes from 'prop-types';

import { Container } from './styles';

export default function ButtonAposentadoriaAdm({ children, ...rest }) {
    return <Container {...rest}>{children}</Container>;
}

ButtonAposentadoriaAdm.propTypes = {
    children: PropTypes.node.isRequired,
};
