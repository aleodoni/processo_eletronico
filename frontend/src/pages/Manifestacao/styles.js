import styled from 'styled-components';

export const Erro = styled.div`
    font-size: 14px;
    color: red;
    padding-bottom: 10px;
`;

export const ModalPai = styled.div`
    position: fixed;
    width: 100%;
    height: 100%;
    background: #000;
    top: 0;
    left: 0;
    opacity: 0.5;
`;

export const ContainerBotoes = styled.div`
    display: grid;
    grid-template-columns: 170px 170px;
    grid-gap: 5px;

    label {
        cursor: pointer;
        font-size: 16px;
        border: 1px solid '#4859B8';
        border-radius: 5px;
        padding-top: 3px;
        padding-bottom: 5px;
        padding-left: 10px;
        padding-right: 10px;
        background: #4859b8;
        color: #fff;
        &:hover {
            background-color: #303f9f;
        }
    }

    input {
        opacity: 0;
        position: absolute;
        z-index: -1;
    }
`;

export const ModalFilho = styled.div`
    position: absolute;
    width: 800;
    height: 600;
    background: white;
    padding: 20px;
    top: 16%;
    left: 30%;
    border-radius: 0.5rem;
    opacity: 1;
`;
