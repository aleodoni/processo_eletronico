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
        margin: 5px;

        select {
            font-size: 16px;
            height: 30px;
        }
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
`;

export const Erro = styled.div`
    font-size: 14px;
    color: red;
    padding-bottom: 10px;
`;

export const Container1 = styled.div`
    display: grid;
    grid-template-columns: 100px 770px 120px;
    grid-template-rows: 70px;
    margin-bottom: 10px;
`;

export const ContainerNomeFluxo = styled.div`
    display: grid;
    grid-template-columns: 700px 210px;
    grid-template-rows: 60px;
    margin-bottom: 10px;

    button {
        font-family: Arial, Helvetica, sans-serif;
        font-size: 16px;
        border: none;
        border-radius: 5px;
        color: #fff;
        background: #303f9f;
        padding: 7px;
        text-align: center;
        margin-right: 5px;
        margin-top: 13px;
        height: 40px;
        cursor: pointer;

        &:hover {
            background: #4496db;
        }
    }
`;

export const ContainerCamposNodos = styled.div`
    display: grid;
    grid-template-columns: 520px 140px 140px 130px 80px;
    grid-template-rows: 70px;
    margin-bottom: 10px;

    select {
        font-size: 16px;
        height: 30px;
    }
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
        td,
        th {
            border: solid 1px #000000;
            padding: 3px;
        }
    }

    table {
        margin-left: 5px;
        margin-top: 10px;
        border-collapse: collapse;
        border: solid 1px #000000;
    }
`;

export const ContainerBotoes = styled.div`
    display: grid;
    grid-template-columns: 110px 110px 170px;
    grid-template-rows: 30px;
    margin-top: 10px;
    margin-bottom: 20px;
    margin-left: 5px;

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

export const CustomSelect = styled.select`
    position: relative;
    font-size: 14px;
    cursor: pointer;
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
