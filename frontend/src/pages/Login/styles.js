import styled from 'styled-components';
import { lighten } from 'polished';

export const Centro = styled.div`
    border-radius: 7px;
    height: 98vh;
    display: flex;
    justify-content: center;
    align-items: center;
    /* background: #303f9f; */
    /* font-family: Arial, Helvetica, sans-serif; */

    form {
        width: 400px;
        border-radius: 7px;
        margin: 20px;
        padding-bottom: 10px;
        padding-left: 50px;
        padding-right: 50px;
        display: flex;
        flex-direction: column;
        align-items: center;
        left: 50%;
        background: #fff;
    }

    img {
        width: 200px;
        margin: 10px 0 20px;
    }

    span {
        color: #222;
        font-size: 28px;
        font-weight: bold;
        /* letter-spacing: 0.1em; */
        /* text-shadow: -1px 0 darkgrey, 0 1px darkgrey, 1px 0 black, 0 -1px darkgrey; */
        margin-bottom: 15px;
    }

    /*input {
        font-size: 14px;
        margin-bottom: 5px;
    } */
`;

export const BotaoLogin = styled.button.attrs({
    type: 'submit',
})`
    font-size: 16px;
    border-radius: 4px;
    background: #303f9f;
    padding: 7px;
    margin-top: 10px;
    color: #fff;
    /* border: 1px solid #303f9f; */
    border: 0;
    display: flex;
    justify-content: center;
    align-items: center;

    &:hover {
        background: ${lighten(0.1, '#303f9f')};
    }
`;

export const Versao = styled.label`
    font-size: 12px;
    padding-top: 15px;
`;

export const ErroLogin = styled.label`
    color: red;
`;
