import styled from 'styled-components';

export const ContainerCodigoProcesso = styled.div`
    p {
        color: #fff;
        margin-bottom: 5px;
        font-weight: bold;
    }
`;

export const ContainerBotaoFecha = styled.button`
    display: flex;

    background: ${({ theme }) => theme.primary};
    border: 0;
    border-radius: 4px;
    height: 36px;
    width: 130px;
    padding: 0 15px;
    color: ${({ theme }) => theme.text};
    margin: 0 0 10px;
    font-size: 14px;
    transition: background 0.2s;
    margin-top: 8px;
    margin-left: 410px;

    &:hover {
        background: ${({ theme }) => theme.hover};
    }

    svg {
        margin-right: 10px;
        margin-left: 5px;
    }
`;

export const ContainerModal = styled.div`
    width: 990px;
    height: 495px;
    background-color: #303f9f;
    margin: 0px;
    padding: 0px;

    hr {
        border-top: 1px solid #303f9f;
        width: 100%;
        margin-bottom: 3px;
    }
`;

export const Centralizado = styled.div`
    display: grid;
    position: relative;
    margin: 3px;
`;

export const ContainerIniciativa = styled.div`
    display: grid;
    grid-template-columns: 990px;

    p {
        font-size: 16px;
        font-weight: bold;
        margin-left: 5px;
        margin-bottom: 5px;
    }

    div {
        margin-bottom: 5px;
        margin-left: 5px;
    }
`;

export const ContainerDados = styled.div`
    display: grid;
    grid-template-columns: 990px;

    p {
        font-size: 16px;
        font-weight: bold;
        margin-left: 5px;
        margin-bottom: 5px;
    }

    div {
        display: grid;
        grid-template-columns: 240px 690px;
        margin-bottom: 5px;
        margin-left: 5px;
        label {
            font-size: 14px;
            font-weight: bold;
        }
        span {
            font-size: 14px;
        }
    }
`;

export const ContainerArquivos = styled.div`
    display: grid;
    grid-template-columns: 990px;
    p {
        font-size: 14px;
        font-weight: bold;
        padding-left: 10px !important;
    }
`;

export const ContainerManifestacoes = styled.div`
    display: grid;
    grid-template-columns: 990px;

    p {
        font-size: 14px;
        font-weight: bold;
        padding-left: 10px !important;
    }

    div {
        height: 380px;
        overflow: auto;
        margin: 5px;

        thead {
            color: black;
            background: #d3d3d3;

            tr,
            th {
                padding: 1px;
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
    }
`;

export const ContainerTramites = styled.div`
    display: grid;
    grid-template-columns: 990px;

    p {
        font-size: 14px;
        font-weight: bold;
        padding-left: 10px !important;
    }

    div {
        height: 380px;
        overflow: auto;
        margin: 5px;

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
                padding: 3px;
            }
        }

        table {
            border-collapse: collapse;
            border: 1px solid #000000;
            font-size: 12px;
            width: 100%;
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
    margin-left: 15px;
    width: 900px !important;
`;

export const BotaoComoLinkManifestacoes = styled.button`
    background: transparent !important;
    border: none;
    color: #000 !important;
    font-size: 14px;
    text-decoration: underline;
    cursor: pointer;
    margin-left: 15px;
    width: 250px !important;
`;

export const ListaArquivo = styled.ul`
    list-style-type: none;
`;

export const Vermelho = styled.span`
    color: red;
`;
