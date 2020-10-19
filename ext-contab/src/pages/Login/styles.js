import styled from 'styled-components';

export const Centro = styled.div`
    border-radius: 7px;
    display: flex;
    justify-content: center;
    align-items: center;

    form {
        border-radius: 7px;
        margin: 5px;
        margin-top: 30px;
        padding-bottom: 10px;
        padding-left: 10px;
        padding-right: 10px;
        display: flex;
        flex-direction: column;
        align-items: center;
        background: ${({ theme }) => theme.text};
    }

    img {
        width: 120px;
        margin: 10px 0 10px;
    }

    span {
        color: #222;
        font-size: 22px;
        font-weight: bold;
        margin-bottom: 5px;
    }

    div {
        color: #222;
        font-size: 16px;
        margin-bottom: 5px;
        width: 300px;
        text-align: center;
    }
`;

export const BotaoLogin = styled.button.attrs({
    type: 'submit',
})`
    font-size: 16px;
    border-radius: 4px;
    background: ${({ theme }) => theme.primary};
    padding: 7px;
    margin-top: 10px;
    color: ${({ theme }) => theme.text};
    border: 0;
    display: flex;
    justify-content: center;
    align-items: center;

    &:hover {
        background: ${({ theme }) => theme.hover};
    }
`;

export const Versao = styled.label`
    font-size: 12px;
    padding-top: 5px;
`;

export const ErroLogin = styled.label`
    color: ${({ theme }) => theme.error};
`;
