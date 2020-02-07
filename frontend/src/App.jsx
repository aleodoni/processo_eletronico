import React from 'react';
import { ToastContainer } from 'react-toastify';
import Router from './Router';
import GlobalStyle from './styles/global';

export default function App() {
    return (
        <>
            <Router />
            <GlobalStyle />
            <ToastContainer autoClose={700} position="bottom-right" />
        </>
    );
}
