import styled from 'styled-components';

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
    margin-left: 300px;

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

    grid-template-columns: 690px;
    margin-bottom: 5px;
    margin-left: 5px;

    label {
        font-weight: bold;
        margin: 3px;
    }

    div {
        margin: 5px;
    }
    fieldset {
        margin: 3px;
        width: 680px;
        border-radius: 7px;
        border: 1px solid #000;

        legend {
            padding-left: 5px;
            padding-right: 5px;
            font-weight: bold;
        }

        span {
            font-size: 16px;
            font-weight: normal;
            margin: 3px;
        }
    }
`;
