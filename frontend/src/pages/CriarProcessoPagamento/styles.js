import styled from 'styled-components';

const handleColorType = cor => {
    switch (cor) {
        case true:
            return 'color: #A9A9A9;';
        default:
            return 'color: #fff;';
    }
};

const handleColorBorder = corBorda => {
    switch (corBorda) {
        case true:
            return 'border-color: #A9A9A9;';
        default:
            return 'border-color: #fff;';
    }
};

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
        margin-bottom: 10px;
    }
    h3 {
        color: #fff;
        margin-top: 5px;
        margin-left: 10px;
        margin-bottom: 5px;
    }
`;

export const ContainerListaArquivos = styled.div`
    display: grid;
    grid-template-columns: 1070px;
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
            font-size: 14px;
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

export const ContainerDadosProcesso = styled.div`
    display: grid;
    grid-template-columns: 885px 200px;
    grid-template-rows: 70px;
    grid-column-gap: 10px;
    margin-left: 7px;
`;

export const ContainerReferencia = styled.div`
    display: grid;
    grid-template-columns: 1070px;
    grid-template-rows: 90px;
    margin-left: 7px;
`;

export const ContainerBanco = styled.div`
    display: grid;
    grid-template-columns: 650px 200px 200px;
    grid-template-rows: 70px;
    grid-column-gap: 10px;
    margin-left: 7px;
`;

export const ContainerAutorizacao = styled.fieldset`
    width: 1090px;
    margin-left: 10px;
    padding-top: 10px;
    border-radius: 7px;
    border-color: #fff;
    margin-bottom: 10px;

    legend {
        color: #fff;
        margin-left: 10px;
    }
`;

export const ContainerDadosBanco = styled.fieldset`
    width: 1090px;
    margin-left: 10px;
    padding-top: 10px;
    border-radius: 7px;
    border-color: #fff;

    legend {
        color: #fff;
        margin-left: 10px;
    }
`;

export const ContainerDadosAutorizacao = styled.div`
    display: grid;
    grid-template-columns: 200px 165px 200px;
    grid-template-rows: 75px;
    grid-column-gap: 10px;
    margin-left: 7px;
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
    grid-template-columns: 180px 100px 160px 140px;
    margin-left: 10px;
    grid-column-gap: 10px;

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
`;

export const Erro = styled.div`
    font-size: 14px;
    color: red;
    padding-bottom: 10px;
`;

export const ContainerEmpenhosNotasFiscais = styled.div`
    margin-top: 10px;
    margin-bottom: 10px;
    display: grid;
    grid-template-columns: 340px 350px 365px;
    grid-column-gap: 23px;
`;

export const ContainerEmpenhos = styled.fieldset`
    margin-left: 10px;
    padding-top: 10px;
    padding-bottom: 10px;
    border-radius: 7px;
    ${({ corBorda }) => handleColorBorder(corBorda)};

    legend {
        ${({ cor }) => handleColorType(cor)};
        margin-left: 10px;
    }

    ul {
        list-style-type: square;
        color: #fff;
        margin-left: 25px;
    }
`;

export const ContainerInsereEmpenhos = styled.div`
    display: grid;
    grid-template-columns: 130px 160px;
    grid-column-gap: 10px;
`;

export const ContainerInsereNotasFiscais = styled.div`
    display: grid;
    grid-template-columns: 130px 170px;
    grid-column-gap: 10px;
`;

export const ContainerInsereNads = styled.div`
    display: grid;
    grid-template-columns: 130px 180px;
    grid-column-gap: 10px;
`;

export const ContainerNotasFiscais = styled.fieldset`
    margin-left: 10px;
    padding-top: 10px;
    border-radius: 7px;

    ${({ corBorda }) => handleColorBorder(corBorda)};

    legend {
        ${({ cor }) => handleColorType(cor)};
        margin-left: 10px;
    }

    ul {
        list-style-type: square;
        color: #fff;
        margin-left: 25px;
    }
`;

export const ContainerArquivos = styled.fieldset`
    width: 1090px;
    margin-left: 10px;
    padding-top: 10px;
    padding-right: 7px;
    padding-bottom: 10px;
    border-radius: 7px;
    border-color: #fff;

    legend {
        color: #fff;
        margin-left: 10px;
    }
`;

export const ContainerNADs = styled.fieldset`
    margin-left: 10px;
    padding-top: 10px;
    border-radius: 7px;
    ${({ corBorda }) => handleColorBorder(corBorda)};

    legend {
        ${({ cor }) => handleColorType(cor)};
        margin-left: 10px;
    }

    ul {
        list-style-type: square;
        color: #fff;
        margin-left: 25px;
    }
`;

export const LinkExcluir = styled.button`
    background: transparent;
    border: none;
    padding: 3px;
    text-decoration: none;

    &:hover {
        background: #293689;
        color: #fff;
    }
`;
