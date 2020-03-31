import styled from 'styled-components';

export const Container = styled.div`
    display: flex;
    flex-direction: row;
    width: 100%;

    input {
        display: flex;

        width: 100%;
        background: rgba(48, 63, 159, 0.8);
        border: 0;
        border-radius: 4px;
        height: 34px;
        padding: 0 15px;
        color: #fff;
        margin: 0 0 10px;

        &::placeholder {
            color: rgba(255, 255, 255, 0.5);
        }
    }

    span {
        color: #d44059;
        align-self: flex-start;
        margin: 0 0 10px;
        font-weight: bold;
    }
`;
