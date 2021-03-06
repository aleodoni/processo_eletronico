import axios from '../configs/axiosConfig';

function downloadArquivo() {
    function downloadAnexo(e, proId, ano, arqNome) {
        e.preventDefault();
        axios({
            method: 'GET',
            url: `/download-arquivo-manifestacao/${proId}/${ano}/${arqNome}`,
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
                let fileName = arqNome.substr(33, arqNome.length);
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

    return {
        downloadAnexo,
    };
}
export const download = downloadArquivo().downloadAnexo;
