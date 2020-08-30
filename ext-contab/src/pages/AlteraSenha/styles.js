import styled from 'styled-components';

export const Container = styled.div`
    display: flex;
    flex: 1;
    flex-direction: row;
`;

export const Main = styled.main`
    display: flex;
    flex: 1;
    flex-direction: column;
    width: 100%;
    margin-left: 10px;

    label {
        margin-top: 10px;
        color: #fff;
        margin-bottom: 5px;
        margin-left: 10px;
    }

    hr {
        width: 100%;
        color: #fff;
        margin-left: 10px;
    }
`;

export const Erro = styled.div`
    font-size: 14px;
    color: red;
    padding-bottom: 10px;
`;

export const ContainerTitulo = styled.div`
    font-size: 16px;
    color: #fff;
    padding-top: 7px;
    padding-bottom: 7px;
    padding-left: 10px;
    font-weight: bold;
`;
