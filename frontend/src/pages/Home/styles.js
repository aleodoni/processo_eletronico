import styled from 'styled-components';

export const Container = styled.div`
    display: grid;
    grid-template-areas:
        'nav nav'
        'asideLeft main';
    grid-template-rows: 1fr 10fr;
    grid-template-columns: 1fr 6fr;

    fieldset {
        border: 1px solid;
        border-radius: 5px;
        border-color: #303f9f;
        padding: 5px;
    }

    legend {
        font-family: Arial, Helvetica, sans-serif;
        font-size: 16px;
        color: #303f9f;
    }

    button {
        font-family: Arial, Helvetica, sans-serif;
        font-size: 16px;
        border: none;
        border-radius: 5px;
        color: #fff;
        background: #303f9f;
        padding: 7px;
        text-align: center;
        margin-right: 10px;
        cursor: pointer;

        &:hover {
            background: #4496db;
        }
    }
`;

export const AsideLeft = styled.aside`
    grid-area: asideLeft;
    background: #fff;
`;

export const Main = styled.main`
    grid-area: main;
    background: #fff;
    margin: 10px;
`;
