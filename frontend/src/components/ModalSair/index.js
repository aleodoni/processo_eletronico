import React from 'react';
import ReactDOM from 'react-dom';
import { FaRegQuestionCircle, FaCheck, FaTimes } from 'react-icons/fa';
import { ModalOverlay, ModalWrapper, ModalCorpo, ModalHeader, Botao } from './styles';

const Modal = ({ isShowing, hide }) =>
    isShowing
        ? ReactDOM.createPortal(
              <>
                  <ModalOverlay />
                  <ModalWrapper aria-modal aria-hidden tabIndex={-1} role="dialog">
                      <ModalCorpo>
                          <FaRegQuestionCircle color="#303f9f" size="3em" />
                          <p>Deseja realmente sair do sistema?</p>
                          <hr />
                          <ModalHeader>
                              <Botao
                                  type="button"
                                  data-dismiss="modal"
                                  aria-label="Close"
                                  onClick={() => {
                                      window.location.href = '/processo-eletronico';
                                  }}>
                                  <FaCheck />
                                  &nbsp; OK
                              </Botao>
                              <Botao type="button" data-dismiss="modal" aria-label="Close" onClick={hide}>
                                  <FaTimes />
                                  &nbsp;Cancelar
                              </Botao>
                          </ModalHeader>
                      </ModalCorpo>
                  </ModalWrapper>
              </>,
              document.body
          )
        : null;

export default Modal;
