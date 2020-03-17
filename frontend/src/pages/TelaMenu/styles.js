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

export const ContainerConsultaProcesso = styled.div`
    display: grid;
    grid-template-columns: 110px 150px 300px;
    grid-gap: 5px;
    margin-bottom: 14px;

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

    div {
        padding-top: 6px;
    }

    input {
        font-size: 18px;
    }
`;

export const ContainerMenu1 = styled.div`
    display: grid;
    grid-template-columns: 300px 310px 300px;
    grid-template-rows: 70px;
    margin-bottom: 10px;
`;

export const ContainerMenu2 = styled.div`
    display: grid;
    grid-template-columns: 700px 315px 120px 150px;
    grid-template-rows: 70px;
    margin-bottom: 10px;
`;

export const ContainerBotoes = styled.div`
    display: grid;
    grid-template-columns: 110px 110px 170px;
    grid-template-rows: 30px;
    margin-top: 10px;
    margin-bottom: 20px;

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

export const ModalApaga = styled.div`
    position: absolute;
    width: 300;
    border: 2px solid #116fbf;
    border-radius: 5px;
    background-color: #ffffff;
    left: 40%;
    top: 40%;
    text-align: center;
    padding: 10px;
`;

export const EstiloCheck = styled.div`
    margin-top: 30px;

    span {
        color: #303f9f;
    }
`;