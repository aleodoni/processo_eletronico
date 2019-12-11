import React, { Component } from 'react';
class AnexoArquivo extends Component {

    render() {
      return(
      <div>
          { (this.props.anexos.length > 0)
        ? <ul>
          {
             this.props.anexos.map((anexo, index) => (
             <li><a href="#" key={index}>{anexo.arq_nome}</a></li>
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
