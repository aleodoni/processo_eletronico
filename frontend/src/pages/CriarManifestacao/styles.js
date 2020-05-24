import styled from 'styled-components';

export const Container = styled.div`
    display: grid;
    grid-template-columns: 1100px;

    p {
        color: #fff;
        font-weight: bold;
        margin-top: 10px;
        margin-bottom: 3px;
    }

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

        td {
            border: solid 1px #000000;
            text-align: center;
            padding: 3px;
        }
    }

    table {
        border-collapse: collapse;
        border: 1px solid #000000;
        font-size: 14px;
        width: 100%;
        background: #fff;
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

    hr {
        color: #fff;
    }

    label {
        padding-left: 5px;
        padding-top: 5px;
        color: #ffffff;
        font-weight: bold;
    }
    span {
        padding-top: 5px;
        color: #ffffff;
    }
`;

export const Erro = styled.div`
    font-size: 14px;
    color: red;
    padding-bottom: 10px;
`;

export const Container2 = styled.div`
    display: grid;
    grid-template-columns: 250px 850px;
    margin-bottom: 10px;
`;

export const ContainerBotoes = styled.div`
    display: grid;
    grid-template-columns: 185px 165px 130px 165px;
    grid-gap: 5px;
    margin-bottom: 10px;
    margin-left: 5px;

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
    background: #fff;
    border: none;
    padding: 3px;
    font-size: 14px;
    text-decoration: underline;
    color: #303f9f;
    cursor: pointer;

    span {
        margin-left: 45px;
    }

    &:hover {
        background: #fff;
    }
`;

export const Cancelado = styled.span`
    color: red;
`;
