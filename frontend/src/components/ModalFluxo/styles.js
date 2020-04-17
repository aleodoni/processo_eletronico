import styled from 'styled-components';

export const ContainerModal = styled.div`
    p {
        text-align: center;
    }
    h1 {
        font-size: 16px;
        color: #303f9f;
        text-align: center;
    }

    hr {
        color: #303f9f;
    }

    div {
        button {
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
    }
`;

export const Centralizado = styled.div`
    text-align: center;
`;
