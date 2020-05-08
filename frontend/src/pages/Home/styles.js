import styled from 'styled-components';

export const Container = styled.div`
    display: flex;
    flex: 1;
    flex-direction: row;
`;

export const Main = styled.main`
    display: grid;
    flex: 1;
    justify-content: center;

    p {
        color: #fff;
    }
`;

export const ContainerBotoes = styled.div`
    display: grid;
    grid-template-columns: 190px 230px;
`;

export const ContainerProcessos = styled.div`
    display: grid;
    grid-template-columns: 1080px;

    p {
        color: #fff;
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
        background: #fff;
        tr:nth-child(even) {
            background-color: #def0ff;
        }

        td {
            border: solid 1px #000000;
            padding: 3px;
        }
    }

    table {
        border-collapse: collapse;
        border: 1px solid #000000;
        width: 100%;
    }
`;

export const BotaoComoLink = styled.button`
    background: #fff !important;
    border: none;
    padding: 3px;
    font-size: 14px;
    text-decoration: underline;
    color: #303f9f !important;
    cursor: pointer;

    display: block;
    text-align: center;
`;

export const Erro = styled.div`
    font-size: 14px;
    color: red;
    padding-bottom: 10px;
`;
