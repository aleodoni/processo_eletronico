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

export const Erro = styled.div`
    font-size: 14px;
    color: red;
    padding-bottom: 10px;
`;

export const BotaoCriaManifestacao = styled.button`
    background: ${({ theme }) => theme.primary};
    border: 0;
    border-radius: 4px;
    height: 27px;
    width: 162px;
    color: ${({ theme }) => theme.text};
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

export const BotaoFinalizaProcesso = styled.button`
    background: #008000;
    align-items: center;
    border: 0;
    border-radius: 4px;
    height: 27px;
    width: 162px;
    color: ${({ theme }) => theme.text};
    font-size: 14px;
    transition: background 0.2s;

    &:hover {
        background: #32cd32;
    }

    svg {
        margin-right: 10px;
        margin-left: 5px;
    }
`;
