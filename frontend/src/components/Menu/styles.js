import styled from 'styled-components';

export const Container = styled.div`
    background: #303f9f;
    color: #fff;
    border-bottom-left-radius: 5px;
    border-bottom-right-radius: 5px;

    span {
        color: #fff;
    }
`;

export const Fundo = styled.div`
    background: #303f9f;
    color: #fff;

    hr {
        border-radius: 5px;
        border-top: 1px solid #fff;
        width: 95%;
    }

    &:hover {
        background: #4496db;
        color: #fff;
    }
`;
