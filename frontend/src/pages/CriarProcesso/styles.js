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

export const ContainerAssunto = styled.div`
    display: grid;
    grid-template-columns: 400px;
    grid-template-rows: 115px;
    margin-bottom: 20px;

    fieldset {
        border-color: #303f9f;
    }

    legend {
        color: #303f9f;
    }
`;

export const Erro = styled.div`
    font-size: 14px;
    color: red;
    padding-bottom: 10px;
`;

export const ContainerIniciativa = styled.div`
    display: grid;
    grid-template-columns: 150px 150px 270px;
    grid-template-rows: 70px;
    grid-gap: 12px;
    margin-bottom: 20px;

    fieldset {
        border-color: #303f9f;
    }
`;

export const ContainerNome = styled.div`
    display: grid;
    grid-template-columns: 575px;
    grid-template-rows: 70px;
    margin-bottom: 20px;
`;

export const ContainerDadosServidorPublico = styled.div`
    display: grid;
    grid-template-columns: 200px 350px 350px;
    grid-template-rows: 70px;
    grid-gap: 37px;
    margin-bottom: 20px;
`;

export const ContainerCriaProcesso = styled.div`
    display: grid;
    grid-template-columns: 487px 487px;
    grid-template-rows: 70px;
    margin-bottom: 20px;
`;

export const TituloObrigatorio = styled.span`
    color: #303f9f;
`;

export const TextoCamposArea = styled.textarea`
    resize: none;
`;

export const CustomSelect = styled.select`
    position: relative;
    font-size: 16px;
    cursor: pointer;
    height: 30px;
`;

export const CustomInput = styled.input`
    font-size: 16px;
    height: 30px;
`;
