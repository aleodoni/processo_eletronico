import styled from 'styled-components';

export const Centro = styled.div`
    border-radius: 7px;
    height: 98vh;
    display: flex;
    justify-content: center;
    align-items: center;

    form {
        width: 600px;
        border-radius: 7px;
        margin: 20px;
        padding-bottom: 10px;
        padding-left: 30px;
        padding-right: 30px;
        display: flex;
        flex-direction: column;
        align-items: center;
        left: 50%;
        background: ${({ theme }) => theme.text};
    }

    img {
        width: 200px;
        margin: 10px 0 20px;
    }

    span {
        color: #222;
        font-size: 28px;
        font-weight: bold;
        margin-bottom: 15px;
    }

    div {
        color: #222;
        font-size: 16px;
        margin-bottom: 15px;
        width: 280px;
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
    padding-top: 15px;
`;

export const ErroLogin = styled.label`
    color: ${({ theme }) => theme.error};
`;
