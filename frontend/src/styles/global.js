import { createGlobalStyle } from 'styled-components';

import 'react-toastify/dist/ReactToastify.css';

export default createGlobalStyle`
* {
    margin: 2;
    padding: 0;
    outline: 0;
    box-sizing: border-box;
    font-family: Arial, Helvetica, sans-serif;
}

html, body, #root {
    min-height: 100%;
}

nav {
    grid-area: nav;
    background: #303f9f;
    border-top-left-radius: 5px;
    border-top-right-radius: 5px;
    border-bottom-right-radius: 5px;
    div {
        overflow: hidden;
        font-weight: bold;
        font-size: 14px;
        color: #FFF;
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
                color: #FFF;
                margin-right: 25px;
            }
            button {
                margin-top: 10px;
                margin-left: 5px;
                padding-left: 15px !important;
                padding-right: 15px !important;
                border: 1px solid #FFF !important;
            }
        }
    }

}



`;
