import styled from 'styled-components';

export const Container = styled.div`
    display: flex;
    flex: 1;
    flex-direction: column;

    width: 100%;
    background-color: ${({ theme }) => theme.primary};

    nav {
        div {
            display: flex;

            overflow: hidden;
            font-weight: bold;
            font-size: 18px;
            color: ${({ theme }) => theme.text};

            div {
                display: flex;

                button {
                    margin-top: 10px;
                    margin-right: 10px;
                }
            }
        }
    }
`;

export const Titulo = styled.span`
    font-weight: bold;
    font-size: 22px;
    color: ${({ theme }) => theme.text};

    img {
        width: 50px;
        vertical-align: middle;
        margin-right: 15px;
        margin-bottom: 5px;
        margin-left: 5px;
        margin-top: 5px;
    }
`;

export const UserData = styled.div`
    display: flex;
    flex: 1;
    flex-direction: column;

    margin-right: 10px;
    /* background-color: yellow; */

    div {
        display: flex;
        flex: 1;
        flex-direction: row;
        align-items: center;
        justify-content: flex-end;

        svg {
            margin-right: 5px;
        }

        label {
            font-size: 14px;
        }
    }

    span {
        display: flex;
        flex: 1;
        justify-content: flex-end;
        align-items: flex-start;

        label {
            font-size: 11px;
            color: ${({ theme }) => theme.placeholder};
        }
    }
`;
