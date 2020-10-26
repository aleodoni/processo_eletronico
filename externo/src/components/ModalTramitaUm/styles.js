import styled from 'styled-components';

export const ContainerModal = styled.div`
    width: 680px;
    display: grid;
    grid-template-columns: 670px;
    grid-column-gap: 0px;
    margin-top: 20px;

    hr {
        color: #fff;
    }
`;
export const ContainerTitulo = styled.div`
    justify-items: center;
    p {
        text-align: center;
        margin-bottom: 15px;
        color: #fff;
    }
    h1 {
        font-size: 14px;
        color: #fff;
        text-align: center;
        margin-bottom: 10px;
    }

    label {
        font-weight: bold;
    }
`;

export const ContainerBotoes = styled.div`
    display: grid;
    grid-template-columns: 320px 310px;
    grid-column-gap: 0px;
    margin-top: 20px;
    justify-items: center;
`;
