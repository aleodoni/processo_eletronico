import styled from 'styled-components';

export const Container = styled.div`
    display: grid;
    grid-template-areas:
        'nav nav'
        'asideLeft main';
    grid-template-columns: 1fr 6fr;

    fieldset {
        border: 1px solid;
        border-color: #303f9f;
        padding: 5px;
    }

    legend {
        font-family: Arial, Helvetica, sans-serif;
        font-size: 16px;
        color: #303f9f;
    }

    button {
        margin: 10px;
        font-family: Arial, Helvetica, sans-serif;
        font-size: 16px;
        border: none;
        border-radius: 5px;
        color: #fff;
        background: #303f9f;
        padding: 7px;
        text-align: center;
        cursor: pointer;

        &:hover {
            background: #4496db;
        }
    }
`;

export const AsideLeft = styled.aside`
    grid-area: asideLeft;
    background: #303f9f;
`;

export const Main = styled.main`
    grid-area: main;
    background: #fff;

    label {
        font-size: 16px;
        font-weight: bold;
    }

    div {
        margin: 3px;
    }
    select {
        font-size: 16px;
        height: 30px;
    }
`;

export const Erro = styled.div`
    font-size: 14px;
    color: red;
    padding-bottom: 5px;
`;

export const Centralizado = styled.div`
    text-align: center;
`;

export const BotaoComoLink = styled.button`
    background: #fff !important;
    border: none;
    padding: 3px;
    font-size: 14px;
    text-decoration: underline;
    color: #303f9f !important;
    cursor: pointer;

    span {
        margin-left: 45px;
    }
`;

export const TextoCamposArea = styled.textarea`
    resize: none;
`;
