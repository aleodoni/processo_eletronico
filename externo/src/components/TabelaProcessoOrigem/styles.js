import styled from 'styled-components';

export const LinkProcesso = styled.button`
    background: transparent;
    border: none;
    font-size: 16px;
    text-decoration: underline;
    color: #fff;
    cursor: pointer;

    &:hover {
        background: ${({ theme }) => theme.hover};
        color: #fff;
        text-decoration: none;
    }

    span {
        margin-left: 45px;
    }
`;
