import styled from 'styled-components';

export const Container = styled.button`
    display: flex;
    align-items: center;

    background: ${({ theme }) => theme.primaryEnvia};
    border: 0;
    border-radius: 4px;
    height: 36px;
    padding: 0 15px;
    color: ${({ theme }) => theme.text};
    margin: 0 0 10px;
    font-size: 14px;
    transition: background 0.2s;

    &:hover {
        background: ${({ theme }) => theme.hover};
    }

    svg {
        margin-right: 10px;
        margin-left: 5px;
    }
`;
