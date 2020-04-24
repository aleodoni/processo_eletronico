import styled from 'styled-components';

export const Container = styled.div`
    display: flex;
    flex: 1;
    flex-direction: column;

    width: 100%;
    background-color: ${({ theme }) => theme.primary};

    nav {
            div {
                overflow: hidden;
                font-weight: bold;
                font-size: 18px;
                color: ${({ theme }) => theme.text};
                img {
                    width: 50px;
                    vertical-align:middle;
                    margin-right: 15px;
                    margin-bottom: 5px;
                    margin-left: 5px;
                    margin-top: 5px;
                }

                div {
                    display: flex;
                    align-items: center;
                    /* align-items: center; */

                    float: right;
                    /* background-color: green; */
                    margin-right: 5px;

                    span {
                        display:flex;
                        align-items: center;

                        svg {
                            margin-right: 5px;
                        }

                    }

                    label {
                        font-weight: bold;
                        font-size: 14px;
                        /* margin-top: 10px; */
                        color: ${({ theme }) => theme.text};
                        margin-right: 25px;
                    }

                    button {
                        /* background-color: red; */
                        /* padding-right: 5px; */
                        /* align-items: center; */
                        margin-top: 10px;
                        /* margin-left: 5px;
                        padding-left: 15px !important;
                        padding-right: 15px !important; */
                        /* border: 1px solid ${({ theme }) => theme.text} !important; */
                    }

                }
            }

        }
    }
`;
