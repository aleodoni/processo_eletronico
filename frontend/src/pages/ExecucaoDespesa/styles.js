import styled from 'styled-components';

export const Container = styled.div`
    display: flex;
    flex: 1;
    flex-direction: row;
`;

export const Main = styled.main`
    display: flex;
    flex: 1;
    flex-direction: column;
    width: 100%;
    margin-left: 10px;
    hr {
        width: 100%;
        color: #fff;
        margin-left: 10px;
    }
    h3 {
        color: #fff;
        margin-top: 5px;
        margin-left: 10px;
        margin-bottom: 5px;
    }
`;

export const ContainerProcessos = styled.div`
    display: grid;
    grid-template-columns: 1100px;
    margin-left: 10px;

    p {
        margin-top: 10px;
        color: #fff;
        margin-bottom: 5px;
    }

    table {
        padding: 3px;
        border-collapse: separate;
        border-spacing: 0;
        border: 1px solid #fff;
        width: 100%;
        border-radius: 7px;
        -moz-border-radius: 7px;
        background: #fff;

        thead {
            background: #d3d3d3;

            tr,
            th {
                padding: 3px;
                border: solid 1px #d3d3d3;
            }
        }
        tbody {
            background: #fff;
            tr:nth-child(even) {
                background-color: #def0ff;
            }

            td {
                border: solid 1px #fff;
                padding: 1px;
            }
        }
    }
`;

export const BotaoComoLink = styled.button`
    background: transparent !important;
    border: none;
    padding: 3px;
    font-size: 14px;
    text-decoration: underline;
    color: #303f9f !important;
    cursor: pointer;

    display: block;
    text-align: center;
`;

export const BotaoEdita = styled.button`
    border: 0;
    border-radius: 4px;
    height: 30px;
    width: 150px;

    color: #fff;
    background: #293689;
    font-size: 14px;
    transition: background 0.2s;

    &:hover {
        background: #3e50c5;
    }

    svg {
        margin-right: 10px;
        margin-left: 5px;
    }
`;

export const LinkFornecedor = styled.button`
    background: transparent;
    border: none;
    padding: 3px;
    font-size: 14px;
    text-decoration: underline;
    color: #000;

    &:hover {
        background: #293689;
        color: #fff;
        text-decoration: none;
    }
`;

export const ContainerBotoes = styled.div`
    display: grid;
    grid-template-columns: 300px;
    margin-bottom: 10px;
`;

export const Erro = styled.div`
    font-size: 14px;
    color: red;
    padding-bottom: 10px;
`;
