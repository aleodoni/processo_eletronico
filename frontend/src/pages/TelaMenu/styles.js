import styled from 'styled-components';

export const Container = styled.div`
    display: flex;
    flex: 1;

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
    grid-template-columns: 500px 500px;
`;

export const Container2 = styled.div`
    display: grid;
    grid-template-columns: 500px 100px 120px;
`;
