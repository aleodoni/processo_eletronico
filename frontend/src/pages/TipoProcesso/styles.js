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

export const Container1 = styled.div`
    display: grid;
    grid-template-columns: 450px 200px;
    grid-template-rows: 70px;
    margin-bottom: 10px;
`;

export const Container2 = styled.div`
    display: grid;
    grid-template-columns: 280px 570px 180px;
`;

export const ContainerBotoes = styled.div`
    display: grid;
    grid-template-columns: 110px 110px 170px;
    margin-top: 10px;
    margin-bottom: 20px;
    margin-left: 5px;
`;

export const CustomSelect = styled.select`
    position: relative;
    font-size: 14px;
    cursor: pointer;
`;
