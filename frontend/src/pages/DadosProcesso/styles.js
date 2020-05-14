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
    }

    h3 {
        color: #fff;
        font-weight: bold;
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
    grid-template-columns: 1050px;
`;

export const ContainerDados = styled.div`
    display: grid;
    grid-template-columns: 240px 800px;
    grid-column-gap: 10px;
    div {
        display: grid;
        grid-template-columns: 240px 800px;
        label {
            font-weight: bold;
            margin-bottom: 5px;
        }
    }
`;

export const ContainerBotoes = styled.div`
    display: grid;
    grid-template-columns: 155px 195px 180px 180px;
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

export const ContainerArquivos = styled.div`
    display: grid;
    grid-template-columns: 1050px;
    grid-gap: 5px;
    thead {
        color: black;
        background: #d3d3d3;

        tr,
        th {
            padding: 3px;
            border: solid 1px #000000;
        }
    }
    tbody {
        color: black;

        tr:nth-child(even) {
            background-color: #def0ff;
        }

        td {
            border: solid 1px #000000;
            text-align: center;
            padding: 3px;
        }
    }

    table {
        border-collapse: collapse;
        border: 1px solid #000000;
        font-size: 12px;
        width: 100%;
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
