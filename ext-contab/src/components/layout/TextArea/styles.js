import styled from 'styled-components';

export const Container = styled.div`
    display: flex;
    flex-direction: column;
    padding-left: 5px;
    padding-right: 4px;
    width: 100%;

    textarea {
        display: flex;

        width: 100%;
        background: ${({ theme }) => theme.inputBackground};
        border: 0;
        border-radius: 4px;
        padding: 0 10px;
        color: ${({ theme }) => theme.text};
        margin: 1px 0 10px;

        &::placeholder {
            color: ${({ theme }) => theme.placeholder};
        }

        &:focus {
            box-shadow: 0 0 0 2px ${({ theme }) => theme.inputBorder};
        }
    }

    span.error {
        font-size: 14px;
        color: ${({ theme }) => theme.error};
        align-self: flex-start;
        margin: 0 0 10px;
        font-weight: bold;
    }

    label {
        font-size: 16px;
        font-weight: bold;
        color: #fff;
        margin-left: 5px;
        margin-bottom: 3px;
    }
`;
