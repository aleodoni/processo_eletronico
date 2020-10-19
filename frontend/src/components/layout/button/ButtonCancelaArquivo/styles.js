import styled from 'styled-components';

export const Container = styled.button`
    display: flex;
    align-items: center;

    background: ${({ theme }) => theme.primary};
    border: 0;
    border-radius: 4px;
    color: ${({ theme }) => theme.text};
    font-size: 12px;
    transition: background 0.2s;

    &:hover {
        background: ${({ theme }) => theme.hover};
    }
`;
