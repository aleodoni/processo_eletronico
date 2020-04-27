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
        font-family: Arial, Helvetica, sans-serif;
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
`;

export const AsideLeft = styled.aside`
    grid-area: asideLeft;
    background: #303f9f;
`;

export const Main = styled.main`
    grid-area: main;
    background: #fff;
    /*margin: 10px;*/

    form {
        display: flex;
        flex-direction: column;
        font-size: 16px;
    }

    input {
        background: #ffffff;
        border: 1px solid #c4c4c4;
        border-radius: 5px;
        font-size: 16px;
        padding-top: 5px;
        padding-bottom: 5px;
    }
`;

export const Erro = styled.div`
    font-size: 14px;
    color: red;
    padding-bottom: 10px;
`;

export const ContainerTabela = styled.div`
    thead {
        color: black;
        background: #d3d3d3;

        tr,
        th {
            padding: 5px;
            border: solid 1px #000000;
        }
    }
    tbody {
        color: black;

        tr,
        td {
            border: solid 1px #000000;
            padding: 3px;
            text-align: center;
        }
    }

    table {
        border-collapse: collapse;
        border: solid 1px #000000;
        width: 100%;
    }
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
