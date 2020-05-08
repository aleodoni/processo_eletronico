import { createGlobalStyle } from 'styled-components';

import 'react-toastify/dist/ReactToastify.css';

export default createGlobalStyle`
    @import url('https://fonts.googleapis.com/css?family=Roboto&display=swap');

    * {
        margin: 0;
        padding: 0;
        outline: 0;
        box-sizing: border-box;
    }

    *:focus {
        outline: 0;
    }

    html, body, #root {
        min-height: 100%;
        height: 100%;
    }

    #root {
        /* display: flex; */
        /* flex: 1; */
        /* flex-direction: column; */
        align-items: center;
        height: 100%;
    }

    body {
        -webkit-font-smoothing: antialiased !important;
        background-size: 100%;
        background-repeat: no-repeat;
    }

    body:before {
        content:'';
        position: fixed;
        top: 0;
        bottom: 0;
        width: 100%;
        z-index: -1;
        background-image: ${({ theme }) => theme.gradient};
    }

    body, input, button, textarea, pre, select {
        font-family: Roboto, Arial, Helvetica, sans-serif;
    }

    button {
        font-family: Roboto, Arial, Helvetica, sans-serif;
        font-size: 16px;
        border: none;
        border-radius: 5px;
        color: #fff;
        background: #303f9f;
        padding: 7px;
        text-align: center;
        margin-right: 10px;
        cursor: pointer;

        &:hover {
            background: #4496db;
        }
    }

    input, textarea, select {
        font-size: 16px;
    }

    a {
        text-decoration: none;
    }

    ul {
        list-style: none;
    }
`;
