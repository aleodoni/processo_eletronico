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
    padding-top: 10px;
    color: ${({ theme }) => theme.text};
    margin: 0 0 10px;
    font-size: 14px;
    transition: background 0.2s;
    margin-top: 8px;
    margin-left: 550px;

    &:hover {
        background: ${({ theme }) => theme.hover};
    }

    svg {
        margin-right: 10px;
        margin-left: 5px;
    }
`;

export const ContainerProcessoOrigem = styled.div`
    display: grid;
    grid-template-columns: 1253px;
    grid-column-gap: 10px;
    margin-bottom: 20px;
`;

export const ContainerModal = styled.div`
    width: 1200px;
    height: 620px;
    background-color: #303f9f;

    p {
        font-size: 14px;
        font-weight: bold;
        color: #fff;
        margin-top: 10px;
        margin-left: 15px;
    }
`;

export const ContainerIniciativa = styled.div`
    background: #fff;
    border-radius: 3px;
    margin-bottom: 5px;
    margin-left: 5px;
    label {
        font-weight: bold;
        margin: 3px;
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

export const ContainerComponente = styled.div`
    margin-left: 5px;

    p {
        font-size: 14px;
        font-weight: bold;
        color: #fff;
    }
`;
