import styled from 'styled-components';
import { lighten } from 'polished';

const handleColorBackground = corBackground => {
    switch (corBackground) {
        case true:
            // return 'background: #A9A9A9;';
            return `background: ${lighten(0.25, '#A9A9A9')}`;
        default:
            return `background: ${lighten(0.25, '#303f9f')}`;
    }
};

export const Container = styled.div`
    display: flex;
    flex-direction: column;
    flex: ${props => props.size};

    padding-left: 5px;
    padding-right: 4px;
    flex: 1;

    input {
        display: flex;

        ${({ corBackground }) => handleColorBackground(corBackground)};
        border: 0;
        border-radius: 4px;
        height: 28px;
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
`;
