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
    grid-template-columns: 100px 710px 120px;
    grid-template-rows: 70px;
    margin-bottom: 10px;
`;

export const Container2 = styled.div`
    display: grid;
    grid-template-columns: 270px;
    grid-template-rows: 70px;
    margin-bottom: 10px;

    select {
        font-size: 16px;
        height: 30px;
    }
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

export const CustomSelect = styled.select`
    position: relative;
    font-size: 14px;
    cursor: pointer;
`;
