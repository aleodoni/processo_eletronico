import { createGlobalStyle } from 'styled-components';

import 'react-toastify/dist/ReactToastify.css';

export default createGlobalStyle`
    @import url('https://fonts.googleapis.com/css?family=Roboto&display=swap');

    * {
        margin: 2;
        padding: 0;
        outline: 0;
        box-sizing: border-box;
    }

    *:focus {
        outline: 0;
    }

    html, body, #root {
        min-height: 100%;
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

    body, input, button, textarea, pre {
        font-family: Roboto, Arial, Helvetica, sans-serif;
    }

    button {
        cursor: pointer;
    }

    input, textarea {
        font-size: 16px;
    }

    a {
        text-decoration: none;
    }

    ul {
        list-style: none;
    }

    nav {
        grid-area: nav;
        /* background: ${({ theme }) => theme.primary}; */
        div {
            overflow: hidden;
            font-weight: bold;
            font-size: 14px;
            color: ${({ theme }) => theme.text};
            img {
                width: 50px;
                vertical-align:middle;
                margin-right: 15px;
                margin-bottom: 5px;
                margin-left: 5px;
                margin-top: 5px;
            }

            div {
                float: right;
                span {
                    display:inline-block;
                    vertical-align:middle;
                }

                label {
                    font-weight: bold;
                    font-size: 14px;
                    margin-top: 10px;
                    color: ${({ theme }) => theme.text};
                    margin-right: 25px;
                }
                button {
                    margin-top: 10px;
                    margin-left: 5px;
                    padding-left: 15px !important;
                    padding-right: 15px !important;
                    border: 1px solid ${({ theme }) => theme.text} !important;
                }
            }
        }

    }



`;
