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
    margin-left: 10px;
    padding: 5px;

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

    thead {
        color: black;
        background: #d3d3d3;

        tr,
        th {
            padding: 5px;
        }
    }
    tbody {
        color: black;
    }

    table {
        border-collapse: collapse;
        /*
        height: 500px;
        overflow-y: scroll;
        */
    }

    th,
    td {
        border: 1px solid black;
        padding: 5px;
    }
`;

export const Erro = styled.div`
    font-size: 14px;
    color: red;
    padding-bottom: 10px;
`;

export const Container1 = styled.div`
    display: grid;
    grid-template-columns: 300px;
    grid-template-rows: 30px;
    margin-bottom: 10px;

    div {
        display: grid;
        grid-template-columns: 80px 788px;
        grid-gap: 5px;
        margin-bottom: 10px;
        label {
            font-size: 16px;
            font-weight: bold;
        }
        span {
            font-size: 16px;
        }
    }
`;

export const Container2 = styled.div`
    display: grid;
    grid-template-columns: 175px;
    grid-template-rows: 65px;
    margin-bottom: 10px;

    select {
        font-size: 16px;
        height: 30px;
    }
`;

export const ContainerBotoes = styled.div`
    display: grid;
    grid-template-columns: 190px 110px 170px;
    grid-template-rows: 30px;
    grid-gap: 5px;
    margin-top: 10px;
    margin-bottom: 10px;

    input {
        opacity: 0;
        position: absolute;
        z-index: -1;
    }

    label {
        cursor: pointer;
        font-size: 16px;
        border: 1px solid #303f9f;
        border-radius: 5px;
        padding-top: 5px;
        padding-bottom: 5px;
        padding-left: 10px;
        background: #303f9f;
        color: #fff;

        &:hover {
            background-color: #4496db;
            border: 1px solid #4496db;
        }
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

export const ListaArquivo = styled.ul`
    list-style-type: none;
`;

export const Cancelado = styled.span`
    color: red;
`;

export const Centralizado = styled.div`
    text-align: center;
`;
