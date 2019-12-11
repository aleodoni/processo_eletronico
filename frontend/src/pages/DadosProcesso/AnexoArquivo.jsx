import React, { Component } from 'react';
import axios from '../../configs/axiosConfig';
class AnexoArquivo extends Component {

    downloadAnexo(e,arqId,proId,arqNome) {
        e.preventDefault();
        axios({
            method: 'GET',
            url: '/download-processo/'+proId+'/'+arqId,
            headers: {
                'authorization': sessionStorage.getItem('token'),
                'Accept': 'application/pdf'
            },
            responseType: 'blob'
        })
        .then(res => {
            const blob = new Blob([res.data], {type: res.data.type});
            const url = window.URL.createObjectURL(blob);
            const link = document.createElement('a');
            link.href = url;
            const contentDisposition = res.headers['content-disposition'];
            let fileName = arqNome;
            if (contentDisposition) {
                const fileNameMatch = contentDisposition.match(/filename="(.+)"/);
                if (fileNameMatch.length === 2)
                   fileName = fileNameMatch[1];
            }
            link.setAttribute('download', fileName);
            document.body.appendChild(link);
            link.click();
            link.remove();
            window.URL.revokeObjectURL(url);
        })
        .catch(err => {
            console.log('Erro ao efetuar o download do anexo.');
        });
    }

    render() {
      return(
      <div>
          { (this.props.anexos.length > 0)
        ? <ul>
          {
             this.props.anexos.map((anexo, index) => (
             <li key={index}><a href="#" onClick={(e) => this.downloadAnexo(e,anexo.arq_id, this.props.proId, anexo.arq_nome)}>{anexo.arq_nome}</a></li>
            ))
          }
          </ul>
        : <ul>
            <li>Sem arquivos anexados.</li>
          </ul>
      }

      </div>)
    }
  }
  export default AnexoArquivo;
