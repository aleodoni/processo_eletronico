import styled from 'styled-components';

export const Container = styled.div`
    display: grid;
    grid-template-areas:
        'nav nav'
        'asideLeft main';
    grid-template-rows: 1fr 10fr;
    grid-template-columns: 1fr 6fr;

    fieldset {
        border: 1px solid;
        border-radius: 5px;
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
    background: #fff;
`;

export const Main = styled.main`
    grid-area: main;
    background: #fff;
    margin: 10px;

    form {
        display: flex;
        flex-direction: column;
        font-size: 16px;
    }
`;

export const Erro = styled.div`
    font-size: 14px;
    color: red;
    padding-bottom: 10px;
`;

export const ContainerIniciativa = styled.div`
    display: grid;
    grid-template-columns: 1050px;
    grid-template-rows: 58px;
    grid-gap: 5px;
    margin-bottom: 14px;
`;

export const ContainerDados = styled.div`
    display: grid;
    grid-template-columns: 240px 500px;
    grid-gap: 5px;
    margin-bottom: 14px;

    fieldset {
        div {
            display: grid;
            grid-template-columns: 240px 788px;
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
    }
`;

export const ContainerBotoes = styled.div`
    display: grid;
    grid-template-columns: 145px 195px 120px 180px;
    grid-gap: 5px;
    margin-bottom: 14px;

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
        padding-top: 10px;
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
        font-size: 16px;
        border: none;
        border-radius: 5px;
        color: #fff;
        background: #303f9f;
        padding-top: 8px;
        padding-bottom: 5px;
        padding-left: 5px;
        text-align: center;
        cursor: pointer;

        &:hover {
            background: #4496db;
        }
    }
`;

export const ContainerArquivos = styled.div`
    display: grid;
    grid-template-columns: 1050px;
    grid-gap: 5px;
    margin-bottom: 14px;
`;

export const BotaoComoLink = styled.button`
    background: #fff !important;
    border: none;
    padding: 3px;
    color: #000 !important;
    font-size: 14px;
    text-decoration: underline;
    cursor: pointer;

    span {
        margin-left: 45px;
    }
`;

export const ListaArquivo = styled.ul`
    list-style-type: none;
`;
