import styled from 'styled-components';

export const Container = styled.div`
    display: flex;
    flex: 1;
    flex-direction: row;

    fieldset {
        border: 1px solid;
        border-color: #303f9f;
        padding: 5px;
    }

    legend {
        font-family: Arial, Helvetica, sans-serif;
        font-size: 16px;
        color: #303f9f;
    }
`;

export const Main = styled.main`
    display: flex;
    flex: 1;
    flex-direction: row;
    justify-content: center;
`;
