import React from 'react';
import PropTypes from 'prop-types';

import Header from '../../../components/Header';

import { Wrapper, Content, Page } from './styles';

export default function DefaultLayout({ children }) {
    return (
        <Wrapper>
            <Header />
            <Content>
                <Page>{children}</Page>
            </Content>
        </Wrapper>
    );
}

DefaultLayout.propTypes = {
    children: PropTypes.element,
};

DefaultLayout.defaultProps = {
    children: null,
};
