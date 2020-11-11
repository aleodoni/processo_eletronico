import styled from 'styled-components';

export const Container = styled.div`
    display: flex;
    flex: 1;

    fieldset {
        border: 1px solid;
        border-color: #fff;
        background: #fff;
        padding: 5px;
        border-radius: 3px;
    }

    p {
        color: #fff;
        font-weight: bold;
        margin-bottom: 3px;
    }

    h3 {
        color: #fff;
        font-weight: bold;
    }
`;

export const ContainerProcessoOrigem = styled.div`
    background: #fff;
    border-radius: 3px;
    margin-bottom: 5px;
    label {
        margin: 3px;
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

export const ContainerIniciativa = styled.div`
    display: grid;
    grid-template-columns: 1250px;
`;

export const ContainerDados = styled.div`
    display: grid;
    grid-template-columns: 240px 800px;
    grid-column-gap: 10px;
    div {
        display: grid;
        grid-template-columns: 240px 1000px;
        label {
            font-weight: bold;
            margin-bottom: 5px;
        }
    }
`;

export const ContainerManifestacoes = styled.div`
    display: grid;
    grid-template-columns: 1253px;
    grid-column-gap: 10px;
    margin-top: 20px;
    margin-bottom: 20px;

    label {
        font-weight: bold;
    }
`;

export const ContainerTramitacao = styled.div`
    display: grid;
    grid-template-columns: 1253px;
    grid-column-gap: 10px;
    margin-top: 20px;
    margin-bottom: 20px;

    label {
        font-weight: bold;
    }
`;

export const ContainerBotoes = styled.div`
    display: grid;
    grid-template-columns: 195px 180px 200px 250px 180px;
    grid-gap: 5px;
    input {
        opacity: 0;
        position: absolute;
        z-index: -1;
    }

    label {
        cursor: pointer;
        padding-top: 9px;
        padding-left: 9px;
        background: ${({ theme }) => theme.primary};
        border: 0;
        border-radius: 4px;
        height: 36px;
        padding: 5 9 15px;
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
    }
`;

export const BotaoComoLink = styled.button`
    background: transparent !important;
    border: none;
    padding: 3px;
    color: #000 !important;
    font-size: 14px;
    text-decoration: underline;
    cursor: pointer;

    span {
        margin-left: 45px;
    }
`;

export const ListaArquivo = styled.ul`
    list-style-type: none;
`;

export const Vermelho = styled.span`
    color: red;
`;

export const Centralizado = styled.div`
    text-align: center;
`;
