import styled from 'styled-components';

export const Container = styled.div`
    display: flex;
    flex: 1;

    legend {
        font-family: Arial, Helvetica, sans-serif;
        font-size: 16px;
        color: #303f9f;
    }

    button {
        margin-right: 10px;
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
    padding-bottom: 10px;
`;

export const ContainerDados = styled.div`
    display: grid;
    grid-template-columns: 650px 190px;
`;
