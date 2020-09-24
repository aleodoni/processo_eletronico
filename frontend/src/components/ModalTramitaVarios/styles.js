import styled from 'styled-components';

export const ContainerModal = styled.div`
    width: 700px;
    p {
        text-align: center;
        margin-bottom: 15px;
        color: #fff;
    }
    h1 {
        font-size: 14px;
        color: #fff;
        text-align: center;
        margin-bottom: 10px;
    }

    label {
        font-weight: bold;
    }

    hr {
        color: #fff;
    }

    div {
    }
`;

export const Erro = styled.div`
    font-size: 12px;
    color: red;
    padding-bottom: 5px;
`;

export const ContainerCampos = styled.div`
    display: grid;

    div {
        color: #fff;
        font-size: 14px;
        font-weight: bold;
        margin-bottom: 3px;
    }
`;

export const ContainerBotoes = styled.div`
    display: grid;
    grid-template-columns: 430px 82px;
    grid-column-gap: 0px;
    margin-top: 20px;
    justify-items: center;
`;

export const BasicSelect = styled.select`
    display: flex;

    background-color: ${({ theme }) => theme.inputBackground};
    height: 36px;
    border: 0;
    border-radius: 4px;
    color: ${({ theme }) => theme.text};
    margin: 1px 0 10px;

    option {
        display: flex;
        min-height: 36px;
        height: 36px;
        color: ${({ theme }) => theme.primary};
    }
`;
