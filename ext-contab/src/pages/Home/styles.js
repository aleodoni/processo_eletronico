import styled from 'styled-components';

const handleColorType = (cor) => {
    switch (cor) {
        case 'vermelho':
            return 'color: #fff; background: #e0001e;';
        case 'laranja':
            return 'color: #fff; background: #fc5f00;';
        case 'verde':
            return 'color: #fff; background: #2E8B57;';
        default:
            return 'color: #fff; background: #2E8B57;';
    }
};

const handleColorHover = (corHover) => {
    switch (corHover) {
        case 'vermelho-claro':
            return 'background: #ff4040;';
        case 'laranja-claro':
            return 'background: #ffbc40;';
        case 'verde-claro':
            return 'background: #44c17b;';
        default:
            return 'background: #44c17b;';
    }
};

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

export const BotaoComoLink = styled.button`
    background: transparent !important;
    border: none;
    padding: 3px;
    font-size: 14px;
    text-decoration: underline;
    color: ${({ theme }) => theme.primary} !important;
    cursor: pointer;

    display: block;
    text-align: center;
`;

export const Erro = styled.div`
    font-size: 14px;
    color: red;
    padding-bottom: 10px;
`;

export const BotaoCriaManifestacao = styled.button`
    border: 0;
    border-radius: 4px;
    background: ${({ theme }) => theme.primary};
    height: 30px;
    width: 150px;

    ${({ cor }) => handleColorType(cor)};
    font-size: 14px;
    transition: background 0.2s;

    &:hover {
        ${({ corHover }) => handleColorHover(corHover)};
    }

    svg {
        margin-right: 10px;
        margin-left: 5px;
    }
`;
