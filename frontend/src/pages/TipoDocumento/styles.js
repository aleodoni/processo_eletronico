import styled from 'styled-components';

export const Container = styled.div`
    display: flex;
    flex: 1;

    button {
        margin-right: 10px;
    }
`;

export const Titulo = styled.div`
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

export const Main = styled.main`
    margin-left: 10px;
    padding: 5px;
    width: 100%;

    form {
        display: flex;
        flex-direction: column;
    }

    input {
        width: 500px;
    }
`;

export const Erro = styled.div`
    font-size: 14px;
    color: red;
    padding-bottom: 10px;
`;

export const Container1 = styled.div`
    display: grid;
    grid-template-columns: 525px 160px 250px;
`;
