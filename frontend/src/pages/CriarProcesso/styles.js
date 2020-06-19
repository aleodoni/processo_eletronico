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

export const Titulo = styled.div`
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

export const ContainerIniciativa = styled.div`
    display: grid;
    grid-template-columns: 200px 180px 565px;
    grid-template-rows: 70px;
    grid-gap: 12px;
`;

export const ContainerMatricula = styled.div`
    display: grid;
    grid-template-columns: 90px 110px;
    grid-template-rows: 70px;
    grid-column-gap: 15px;

    button {
        margin-top: 22px;
    }
`;

export const ContainerBotoes = styled.div`
    margin-left: 5px;
    display: grid;
    grid-template-columns: 160px 160px;
    grid-column-gap: 7px;
`;

export const ContainerNome = styled.div`
    display: grid;
    grid-template-columns: 600px;
    grid-template-rows: 70px;
`;

export const ContainerDadosServidorPublico = styled.div`
    display: grid;
    grid-template-columns: 200px 365px 350px;
    grid-template-rows: 70px;
    grid-gap: 37px;
`;

export const ContainerCriaProcesso = styled.div`
    display: grid;
    grid-template-columns: 250px 750px;
    grid-template-rows: 70px;
`;
export const ContainerRevisaoPensaoAlimenticia = styled.div`
    display: grid;
    grid-template-columns: 750px;
    grid-template-rows: 70px;
`;

export const BotaoProcura = styled.button`
    display: flex;
    align-items: center;

    background: ${({ theme }) => theme.primary};
    border: 0;
    border-radius: 4px;
    height: 28px;
    padding: 0 15px;
    color: ${({ theme }) => theme.text};
    margin: 0 0 10px;
    font-size: 14px;
    transition: background 0.2s;

    &:hover {
        background: ${({ theme }) => theme.hover};
    }

    svg {
        margin-right: 10px;
        margin-left: 5px;
    }
`;
