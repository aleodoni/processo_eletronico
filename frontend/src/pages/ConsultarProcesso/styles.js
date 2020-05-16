import styled from 'styled-components';

export const Container = styled.div`
    display: flex;
    flex: 1;
`;

export const Main = styled.main`
    margin-left: 10px;
    padding: 5px;
    width: 100%;

    form {
        display: flex;
        flex-direction: column;
    }

    hr {
        margin-left: 5px;
        margin-bottom: 10px;
    }

    p {
        color: #fff;
        margin-left: 5px;
    }
`;

export const Erro = styled.div`
    font-size: 14px;
    color: red;
    padding-top: 30px;
    padding-left: 10px;
`;

export const ContainerConsultaProcesso = styled.div`
    display: grid;
    grid-template-columns: 160px 120px 450px;
    grid-gap: 5px;

    button {
        margin-top: 22px;
    }
`;

export const ContainerPesquisa = styled.div`
    display: grid;
    grid-template-columns: 90px 90px 645px;
    grid-gap: 5px;
`;

export const ContainerPesquisa1 = styled.div`
    display: grid;
    grid-template-columns: 415px 415px;
    grid-gap: 5px;
    margin-bottom: 7px;
`;

export const ContainerPesquisa2 = styled.div`
    display: grid;
    grid-template-columns: 197px 197px 100px 146px 174px;
    grid-gap: 5px;
`;

export const ContainerPesquisa3 = styled.div`
    display: grid;
    grid-template-columns: 415px 415px;
    grid-gap: 5px;
`;
