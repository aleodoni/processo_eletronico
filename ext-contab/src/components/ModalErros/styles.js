import styled from 'styled-components';

export const ContainerModal = styled.div`
    width: 720px;
    p {
        text-align: center;
        margin-bottom: 15px;
    }
    h1 {
        font-size: 14px;
        color: #fff;
        text-align: center;
        margin-bottom: 10px;
    }

    hr {
        color: #fff;
        margin-bottom: 10px;
    }

    div {
        span {
            text-align: center;
        }
    }
`;

export const ContainerErros = styled.div`
    margin-left: 10px;
    ul {
        list-style: none;
        margin-bottom: 10px;
        color: #fff;
    }

    ul li::before {
        text-align: left;
        font-size: 14px;
        display: inline-block;
        width: 1em;
        margin-left: -1em;
        content: '• ';
        color: red;
    }
`;

export const ContainerBotao = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
`;
