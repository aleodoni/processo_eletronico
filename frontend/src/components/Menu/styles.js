import styled from 'styled-components';

export const Container = styled.div`
    display: flex;

    width: 200px;
    max-width: 200px;
    color: #fff;

    span {
        color: #fff;
    }
`;

export const Fundo = styled.div`
    width: 200px;
    max-width: 200px;

    color: #fff;
    transition: background 0.2s;

    hr {
        border-top: 1px solid #fff;
        width: 100%;
        color: #fff;
    }

    /* &:hover {
        background: ${({ theme }) => theme.hover};
        color: #fff;
    } */
`;
