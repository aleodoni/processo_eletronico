import styled from 'styled-components';

export const ModalOverlay = styled.div`
    position: fixed;
    top: 0;
    left: 0;
    z-index: 1040;
    width: 100vw;
    height: 100vh;
    background-color: #000;
    opacity: 0.5;
`;

export const ModalWrapper = styled.div`
    position: fixed;
    top: 0;
    left: 0;
    z-index: 1050;
    width: 100%;
    height: 100%;
    overflow-x: hidden;
    overflow-y: auto;
    outline: 0;
`;

export const ModalCorpo = styled.div`
    z-index: 100;
    background: white;
    position: center;
    text-align: center;
    margin: 25rem auto;
    border-radius: 5px;
    max-width: 400px;
    padding: 0.5rem;

    p {
        font-size: 16px;
        font-weight: bold;
    }

    hr {
        border-top: 1px solid #303f9f;
    }
`;

export const ModalHeader = styled.div`
    display: flex;
    justify-content: flex-end;
`;

export const Botao = styled.button`
    font-size: 16px;
    border: none;
    border-radius: 5px;
    color: #fff;
    background: #303f9f;
    padding: 7px;
    text-align: center;
    margin-right: 10px;

    &:hover {
        background: #4496db;
    }
`;
