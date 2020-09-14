import styled from 'styled-components';

export const ContainerCodigoProcesso = styled.div`
    font-size: 16px;
    color: #fff;
    margin-bottom: 5px;
    font-weight: bold;
`;

export const ContainerBotaoFecha = styled.button`
    display: flex;

    background: ${({ theme }) => theme.primary};
    border: 0;
    border-radius: 4px;
    height: 36px;
    width: 130px;
    padding: 0 15px;
    padding-top: 10px;
    color: ${({ theme }) => theme.text};
    margin: 0 0 10px;
    font-size: 14px;
    transition: background 0.2s;
    margin-top: 8px;
    margin-left: 400px;

    &:hover {
        background: ${({ theme }) => theme.hover};
    }

    svg {
        margin-right: 10px;
        margin-left: 5px;
    }
`;

export const ContainerModal = styled.div`
    background-color: #303f9f;

    p {
        font-size: 14px;
        font-weight: bold;
        margin-top: 10px;
        margin-left: 15px;
    }

    ul {
        list-style-type: square;
    }
`;

export const ContainerDados = styled.div`
    display: grid;
    background: #fff;
    border-radius: 3px;
    font-size: 16px;

    grid-template-columns: 280px 690px;
    margin-bottom: 5px;
    margin-left: 5px;

    label {
        font-weight: bold;
        margin: 3px;
    }
    span {
        margin: 3px;
    }
`;

export const ContainerDadosNotaFiscalEmpenho = styled.div`
    display: grid;
    grid-template-columns: 500px;
    background: #fff;
    border-radius: 3px;
    font-size: 16px;
    margin-left: 5px;
    margin-bottom: 5px;
    label {
        font-weight: bold;
        margin: 3px;
    }
    ul {
        font-size: 16px;
        margin-left: 15px;
        li {
            color: #000;
            margin-left: 5px;
        }
    }
`;
