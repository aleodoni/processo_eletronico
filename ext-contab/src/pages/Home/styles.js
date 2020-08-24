import styled from 'styled-components';

export const Container = styled.div`
    display: flex;
    flex: 1;
    flex-direction: row;
`;

export const Main = styled.main`
    display: flex;
    flex: 1;
    flex-direction: column;
    width: 100%;
    margin-left: 10px;
    hr {
        width: 100%;
        color: #fff;
        margin-left: 10px;
    }
`;

export const ContainerProcessos = styled.div`
    display: grid;
    grid-template-columns: 1100px;
    margin-left: 10px;

    p {
        margin-top: 10px;
        color: #fff;
        margin-bottom: 5px;
    }

    table {
        padding: 3px;
        border-collapse: separate;
        border-spacing: 0;
        border: 1px solid #fff;
        width: 100%;
        border-radius: 7px;
        -moz-border-radius: 7px;
        background: #fff;

        thead {
            background: #d3d3d3;

            tr {
                th {
                    text-align: left;
                    padding: 3px;
                    border: solid 1px #d3d3d3;
                }
            },

        }
        tbody {
            background: #fff;
            tr:nth-child(even) {
                background-color: #def0ff;
            }

            td {
                border: solid 1px #fff;
                padding: 1px;
            }
        }
    }
`;

export const Erro = styled.div`
    font-size: 14px;
    color: red;
    padding-bottom: 10px;
`;
