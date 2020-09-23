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

    label {
        margin-top: 10px;
        color: #fff;
        margin-bottom: 5px;
        margin-left: 10px;
    }

    hr {
        width: 100%;
        color: #fff;
        margin-left: 10px;
    }
`;

export const ContainerEmpenhos = styled.div`
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

            tr {
                th {
                    text-align: center;
                    padding: 3px;
                    border: solid 1px #d3d3d3;
                }
            }
        }
        tbody {
            background: #fff;

            tr {
                text-align: center;
            }

            tr:nth-child(even) {
                background-color: #def0ff;
                text-align: center;
            }

            td {
                border: solid 1px #fff;
                padding: 1px;

                div {
                    margin-top: 12px;
                    margin-left: 5px;
                }
            }
        }
    }
`;

export const Erro = styled.div`
    font-size: 14px;
    color: red;
    padding-top: 10px;
    padding-bottom: 10px;
    padding-left: 10px;
`;

export const ContainerTitulo = styled.div`
    display: grid;
    grid-template-columns: 620px;
    grid-column-gap: 10px;
    font-size: 16px;
    color: #fff;
    padding-top: 7px;
    padding-bottom: 7px;
    padding-left: 10px;
    font-weight: bold;

    span {
        font-size: 12px;
    }
`;

export const ContainerAviso = styled.div`
    font-size: 12px;
    color: #fff;
    padding-top: 7px;
    padding-bottom: 7px;
    padding-left: 10px;
    font-weight: bold;

    span {
        font-size: 16px;
        color: #fff;
    }
`;

export const ContainerObrigatorio = styled.span`
    font-size: 16px;
    color: red;
`;

export const ContainerBotaoVoltarEnviar = styled.div`
    display: grid;
    grid-template-columns: 100px 200px;
    grid-column-gap: 10px;
    margin-left: 10px;
    margin-top: 10px;
`;

export const ContainerArquivos = styled.div`
    color: #fff;
    margin-left: 10px;
    margin-top: 5px;

    span {
        margin-bottom: 15px;
    }

    hr {
        width: 890px;
        margin-bottom: 10px;
    }
`;

export const ContainerUpload = styled.div`
    display: table-cell;
    vertical-align: middle;
    height: 40px;
    input {
        opacity: 0;
        position: absolute;
        z-index: -1;
    }

    label {
        cursor: pointer;
        &:hover {
            text-decoration: underline;
        }
    }
`;

export const ContainerListaDocumentos = styled.div`
    display: grid;
    grid-template-columns: 770px 30px 500px;
    grid-column-gap: 3px;
`;

export const ContainerBanco = styled.div`
    display: grid;
    grid-template-columns: 450px 130px 150px 335px;
    grid-column-gap: 3px;
    padding-left: 5px;
    span {
        padding-top: 30px;
    }
`;

export const UploadArquivoComplementar = styled.div`
    margin-top: 15px;
    margin-bottom: 15px;
    padding-top: 9px;
    input {
        opacity: 0;
        position: absolute;
        z-index: -1;
    }

    label {
        cursor: pointer;
        padding: 10px;
        background: ${({ theme }) => theme.primary};
        border: 0;
        border-radius: 4px;
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
    }
`;

export const ContainerNota = styled.div`
    display: grid;
    grid-template-columns: 200px 170px 200px;
    grid-column-gap: 3px;
    padding-left: 5px;
`;

export const ContainerReferencia = styled.div`
    display: grid;
    grid-template-columns: 900px;
    padding-left: 5px;
`;

export const ContainerListaArquivos = styled.fieldset`
    width: 50px !important;
    margin-left: 10px;
    padding-top: 10px;
    padding-bottom: 10px;
    border-radius: 7px;
    border-color: #fff;

    legend {
        color: #fff;
        margin-left: 10px;
        font-weight: bold;
    }
`;

export const ContainerListaArquivosComplementares = styled.fieldset`
    width: 890px !important;
    margin-left: 10px;
    margin-top: 10px;
    padding-top: 10px;
    padding-bottom: 10px;
    border-radius: 7px;
    border-color: #fff;

    legend {
        color: #fff;
        margin-left: 10px;
        font-weight: bold;
    }

    ul {
        color: #fff;
        margin-top: 5px;
        margin-left: 20px;
    }
`;

export const ContainerBotoes = styled.fieldset`
    margin-left: 10px;
    padding-top: 10px;
    padding-left: 10px;
    border-radius: 7px;
    border-color: #fff;
    height: 60px;
`;

export const ContainerGridBotoes = styled.div`
    display: grid;
    grid-template-columns: 120px 170px;
    grid-column-gap: 10px;
`;
