import styled from 'styled-components';

export const Container = styled.button`
    display: flex;
    align-items: center;

    background: ${({ theme }) => theme.primary};
    border: 0;
    border-radius: 4px;
    height: 40px;
    padding: 0 15px;
    color: ${({ theme }) => theme.text};
    margin: 0 auto;
    margin-left: 10px;
    margin-right: 10px;
    font-size: 14px;
    transition: background 0.2s;

    a {
        color: ${({ theme }) => theme.text};
    }

    &:hover {
        background: ${({ theme }) => theme.hover};
    }

    svg {
        margin-right: 10px;
        margin-left: 5px;
    }
`;
