import styled from 'styled-components';

export const ContainerModal = styled.div`
    width: 400px;
    p {
        text-align: center;
        margin-bottom: 15px;
    }
    h1 {
        font-size: 16px;
        color: #fff;
        text-align: center;
        margin-bottom: 15px;
    }

    hr {
        color: #fff;
    }

    div {
        display: grid;
        grid-template-columns: 200px 200px;
        grid-column-gap: 0px;
        margin-top: 20px;
        justify-items: center;
    }

    label {
        font-size: 18px;
    }
`;
