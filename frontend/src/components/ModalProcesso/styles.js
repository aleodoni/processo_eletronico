import styled from 'styled-components';

export const ContainerModal = styled.div`
    width: 990px;
    height: 450px;

    fieldset {
        font-size: 14px;
        border: 1px solid;
        border-color: #303f9f;
        padding: 5px;
    }

    TabPanel {
        react-tabs__tab-list {
            border: 1px solid #aaa;
            margin: 0 0 10px;
            padding: 0;
        }
    }

    legend {
        font-family: Arial, Helvetica, sans-serif;
        font-size: 14px;
        color: #303f9f;
    }

    div {
        button {
            font-size: 14px;
            border: none;
            border-radius: 5px;
            color: #fff;
            background: #303f9f;
            padding: 5px;
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
    margin: 3px;
`;

export const ContainerIniciativa = styled.div`
    display: grid;
    grid-template-columns: 940px;
    grid-template-rows: 55px;
    grid-gap: 5px;
`;

export const ContainerDados = styled.div`
    display: grid;
    grid-template-columns: 240px 370px;
    grid-gap: 3px;
    fieldset {
        div {
            display: grid;
            grid-template-columns: 240px 690px;
            margin: 5px;
            padding: 5px;
            label {
                font-size: 14px;
                font-weight: bold;
            }
            span {
                font-size: 14px;
            }
        }
    }
`;
