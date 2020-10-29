import React from 'react';
import { ToastContainer } from 'react-toastify';
import { ThemeProvider } from 'styled-components';
import Router from './Router';
import GlobalStyle from './styles/global';
import { defaultTheme } from './styles/theme';

export default function App() {
    return (
        <ThemeProvider theme={defaultTheme}>
            <>
                <Router />
                <GlobalStyle />
                <ToastContainer
                    autoClose={1000}
                    style={{ width: '400px' }}
                    pauseOnFocusLoss={false}
                    pauseOnHover={false}
                />
            </>
        </ThemeProvider>
    );
}
