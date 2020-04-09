import React from 'react';
import PropTypes from 'prop-types';
import { FaPaperclip } from 'react-icons/fa';
import { ModalPai, ModalFilho, ContainerBotoes } from './styles';

function ModalManifestacao({ proId, show, onClose }) {
    function fechar(e) {
        onClose && onClose(e);
    }

    return (
        <div>
            <ModalPai />
            <ModalFilho>
                <fieldset>
                    <legend>{`Manifestação proId:${proId}`}</legend>
                    <div />
                    <ContainerBotoes>
                        <label htmlFor="anexo">
                            <FaPaperclip />
                            &nbsp;Inserir anexo
                        </label>
                        <input type="file" name="file" onChange={null} id="anexo" />
                        <button
                            type="button"
                            onClick={e => {
                                fechar(e);
                            }}>
                            Fechar
                        </button>
                    </ContainerBotoes>
                </fieldset>
            </ModalFilho>
        </div>
    );
}
ModalManifestacao.propTypes = {
    proId: PropTypes.string.isRequired,
    show: PropTypes.bool.isRequired,
    onClose: PropTypes.bool.isRequired,
};
export default ModalManifestacao;
