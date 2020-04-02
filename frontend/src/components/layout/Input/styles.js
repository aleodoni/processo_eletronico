import styled from 'styled-components';

export const Container = styled.div`
    display: flex;
    flex-direction: row;
    width: 100%;

    input {
        display: flex;

        width: 100%;
        background: ${({ theme }) => theme.input};
        border: 0;
        border-radius: 4px;
        height: 34px;
        padding: 0 15px;
        color: ${({ theme }) => theme.text};
        margin: 0 0 10px;

        &::placeholder {
            color: ${({ theme }) => theme.placeholder};
        }
    }

    span {
        color: ${({ theme }) => theme.text};
        align-self: flex-start;
        margin: 0 0 10px;
        font-weight: bold;
    }
`;
