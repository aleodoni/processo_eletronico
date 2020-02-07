import React from 'react';
import PropTypes from 'prop-types';
import axios from '../../configs/axiosConfig';
import { ListaArquivo, BotaoComoLink } from './styles';

function AnexoArquivo({ proId, anexos }) {
    function downloadAnexo(e, arqId, id, arqNome) {
        e.preventDefault();
        axios({
            method: 'GET',
            url: `/download-processo/${id}/${arqId}`,
            headers: {
                authorization: sessionStorage.getItem('token'),
                Accept: 'application/pdf',
            },
            responseType: 'blob',
        })
            .then(res => {
                const blob = new Blob([res.data], { type: res.data.type });
                const url = window.URL.createObjectURL(blob);
                const link = document.createElement('a');
                link.href = url;
                const contentDisposition = res.headers['content-disposition'];
                let fileName = arqNome;
                if (contentDisposition) {
                    const fileNameMatch = contentDisposition.match(/filename="(.+)"/);
                    if (fileNameMatch.length === 2) {
                        fileName = fileNameMatch[1];
                    }
                }
                link.setAttribute('download', fileName);
                document.body.appendChild(link);
                link.click();
                link.remove();
                window.URL.revokeObjectURL(url);
            })
            .catch(() => {
                console.log('Erro ao efetuar o download do anexo.');
            });
    }

    return (
        <>
            {anexos.length > 0 ? (
                <ListaArquivo>
                    {anexos.map(anexo => (
                        <li key={anexo}>
                            <BotaoComoLink type="button" onClick={e => downloadAnexo(e, anexo.arq_id, proId, anexo.arq_nome)}>
                                {anexo.arq_nome}
                            </BotaoComoLink>
                        </li>
                    ))}
                </ListaArquivo>
            ) : (
                <ListaArquivo>
                    <li>Sem arquivos anexados.</li>
                </ListaArquivo>
            )}
        </>
    );
}

AnexoArquivo.propTypes = {
    proId: PropTypes.number.isRequired,
    anexos: PropTypes.shape({
        params: PropTypes.object,
    }).isRequired,
};
export default AnexoArquivo;
