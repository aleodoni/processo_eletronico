import styled from 'styled-components';

export const Container = styled.button`
    display: flex;
    align-items: center;

    background: #00796b;
    border: 0;
    border-radius: 4px;
    height: 36px;
    padding: 0 15px;
    color: ${({ theme }) => theme.text};
    margin: 0 0 10px;
    margin-top: 3px;
    font-size: 14px;
    transition: background 0.2s;

    &:hover {
        background: #3ec7b7;
    }

    svg {
        margin-right: 10px;
        margin-left: 5px;
    }
`;
