import styled from 'styled-components';

export const Centro = styled.div`
    border-radius: 7px;
    height: 98vh;
    display: flex;
    justify-content: center;
    align-items: center;

    form {
        width: 400px;
        border-radius: 7px;
        margin: 20px;
        padding-bottom: 10px;
        padding-left: 50px;
        padding-right: 50px;
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
`;

export const Versao = styled.label`
    font-size: 12px;
    padding-top: 15px;
`;
