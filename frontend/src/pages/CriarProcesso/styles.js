import styled from 'styled-components';

export const Container = styled.div`
    display: flex;
    flex: 1;
`;

export const Main = styled.main`
    margin-left: 10px;
    padding: 5px;
    width: 100%;
`;

export const ContainerAssunto = styled.div`
    display: grid;
    grid-template-columns: 400px;
    grid-template-rows: 115px;
`;

export const Erro = styled.div`
    font-size: 14px;
    color: red;
    padding-bottom: 10px;
`;

export const ContainerIniciativa = styled.div`
    display: grid;
    grid-template-columns: 200px 180px 565px;
    grid-template-rows: 70px;
    grid-gap: 12px;
`;

export const ContainerMatricula = styled.div`
    display: grid;
    grid-template-columns: 100px 110px;
    grid-template-rows: 70px;

    button {
        margin-top: 22px;
    }
`;

export const ContainerNome = styled.div`
    display: grid;
    grid-template-columns: 575px;
    grid-template-rows: 70px;
`;

export const ContainerDadosServidorPublico = styled.div`
    display: grid;
    grid-template-columns: 200px 350px 350px;
    grid-template-rows: 70px;
    grid-gap: 37px;
`;

export const ContainerCriaProcesso = styled.div`
    display: grid;
    grid-template-columns: 487px 487px;
    grid-template-rows: 70px;
`;
