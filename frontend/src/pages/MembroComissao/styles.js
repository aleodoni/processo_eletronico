import styled from 'styled-components';

export const Container = styled.div`
    display: grid;

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

export const Main = styled.main`
    margin-left: 10px;
    padding: 5px;
    width: 100%;

    form {
        display: flex;
        flex-direction: column;
    }
`;

export const Erro = styled.div`
    font-size: 14px;
    color: red;
    padding-bottom: 5px;
    margin-left: 5px;
    margin-top: 3px;
`;

export const Titulo = styled.div`
    display: grid;
    grid-template-columns: 1600px;
    margin-left: 5px;
    p {
        color: #fff;
        font-weight: bold;
        margin-top: 10px;
        margin-bottom: 3px;
    }
    hr {
        width: 100%;
        color: #fff;
    }
`;

export const ContainerNomeComissao = styled.div`
    display: grid;
    grid-template-columns: 720px 250px;
    margin-bottom: 10px;
    fieldset {
        border: 1px solid #ffffff;
        border-radius: 5px;
        padding-top: 12px;
        label {
            color: #ffffff;
            font-weight: bold;
        }
    }

    div {
        padding-top: 8px;
    }
`;

export const ContainerCamposArea = styled.div`
    display: grid;
    grid-template-columns: 740px;
    margin-bottom: 10px;
`;

export const ContainerSelecione = styled.div`
    display: grid;
    grid-template-columns: 740px;
    margin-bottom: 10px;
`;

export const ContainerCamposMembro = styled.div`
    display: grid;
    grid-template-columns: 115px 625px;
    margin-bottom: 10px;
`;

export const ContainerCamposMembroDados = styled.div`
    display: grid;
    grid-template-columns: 320px 150px;
    margin-bottom: 10px;
`;
