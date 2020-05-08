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
`;

export const Erro = styled.div`
    font-size: 14px;
    color: red;
    padding-top: 30px;
    padding-left: 10px;
`;

export const ContainerConsultaManifestacao = styled.div`
    display: grid;
    grid-template-columns: 140px 120px 300px;
    grid-gap: 5px;
    margin-bottom: 14px;

    button {
        margin-top: 22px;
    }
`;
