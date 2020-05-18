import styled from 'styled-components';

export const Container = styled.div`
    display: flex;
    flex-direction: column;
    flex: ${props => props.size};

    padding-left: 5px;
    padding-right: 4px;
    flex: 1;

    input {
        display: flex;

        /* width: 100%; */
        background: ${({ theme }) => theme.inputBackground};
        border: 0;
        border-radius: 4px;
        height: 36px;
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
        color: ${({ theme }) => theme.label};
        margin-left: 5px;
        margin-bottom: 3px;
    }
`;
