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
`;

export const Erro = styled.div`
    margin-top: 3px;
    margin-left: 3px;
    font-size: 14px;
    color: red;
    padding-bottom: 10px;
`;

export const ContainerEmail = styled.div`
    display: grid;
    grid-template-columns: 800px;
`;

export const ContainerIrregularidade = styled.div`
    display: grid;
    grid-template-columns: 800px;
`;

export const ContainerProcessoPAS = styled.div`
    display: grid;
    grid-template-columns: 130px;
    grid-column-gap: 15px;
`;

export const ContainerNome = styled.div`
    display: grid;
    grid-template-columns: 800px;
    grid-column-gap: 15px;
`;

export const ContainerTipoProcesso = styled.div`
    display: grid;
    grid-template-columns: 400px 400px;
    grid-column-gap: 15px;
`;

export const ContainerMatricula = styled.div`
    display: grid;
    grid-template-columns: 90px 120px;
    grid-template-rows: 70px;
    grid-column-gap: 15px;

    button {
        margin-top: 22px;
    }
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

export const ContainerDadosServidorPublico = styled.div`
    display: grid;
    grid-template-columns: 160px 300px 300px;
    grid-template-rows: 70px;
    grid-gap: 20px;
`;

export const ContainerMembrosTitulo = styled.div`
    display: grid;
    grid-template-columns: 790px;
    margin-left: 5px;
    margin-bottom: 10px;
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
export const ContainerLocalizaMembros = styled.div`
    display: grid;
    grid-template-columns: 90px 200px;
    grid-template-rows: 70px;
    grid-column-gap: 15px;

    button {
        margin-top: 22px;
    }
`;

export const ContainerMembros = styled.div`
    display: grid;
    grid-template-columns: 800px;
    grid-column-gap: 15px;

    span {
        margin-left: 5px;
        margin-bottom: 3px;
        color: #cccccc;
    }
`;
