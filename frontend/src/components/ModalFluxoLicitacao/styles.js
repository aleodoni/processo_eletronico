import styled from 'styled-components';

export const ContainerModal = styled.div`
    width: 1400px;
    height: 720px;
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
        text-align: right;
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
