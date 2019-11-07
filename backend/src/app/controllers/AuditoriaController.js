import Auditoria from '../models/Auditoria';
import DataHoraAtual from '../models/DataHoraAtual';

require('dotenv').config();

class AuditoriaController {
  async audita(passado, requisicao, tipo, chave) {
    DataHoraAtual.findAll({
      plain: true,
      logging: false,
    })
      .then(dataHoraAtual => {
        if (tipo === 'I') {
          const keys = Object.entries(passado);
          for (const key of keys) {
            Auditoria.create(
              {
                rea_data: dataHoraAtual.dataValues.data_hora_atual,
                rea_tela: requisicao.url,
                rea_login: requisicao.headers.usuario,
                rea_terminal: requisicao.headers.host,
                rea_operacao: tipo,
                rea_campo: key[0],
                rea_valor_anterior: key[1],
                rea_chave: chave,
              },
              { returning: false, logging: false }
            )
              .then(auditoria => {
                // console.log('Auditoria de inserção executada com sucesso.');
                return null;
              })
              .catch(function(err) {
                console.log('Erro ao executar auditoria de inserção.' + err);
              });
          }
        }
        if (tipo === 'U') {
          const keys = Object.entries(passado);
          for (const key of keys) {
            Auditoria.create(
              {
                rea_data: dataHoraAtual.dataValues.data_hora_atual,
                rea_tela: requisicao.url,
                rea_login: requisicao.headers.usuario,
                rea_terminal: requisicao.headers.host,
                rea_operacao: tipo,
                rea_campo: key[0],
                rea_valor_anterior: key[1],
                rea_chave: chave,
              },
              { returning: false, logging: false }
            )
              .then(auditoria => {
                //console.log('Auditoria de edição executada com sucesso.');
                return null;
              })
              .catch(function(err) {
                console.log('Erro ao executar auditoria de edição.' + err);
              });
          }
        }
        if (tipo === 'D') {
          const keys = Object.entries(passado);
          for (const key of keys) {
            Auditoria.create(
              {
                rea_data: dataHoraAtual.dataValues.data_hora_atual,
                rea_tela: requisicao.url,
                rea_login: requisicao.headers.usuario,
                rea_terminal: requisicao.headers.host,
                rea_operacao: tipo,
                rea_campo: key[0],
                rea_valor_anterior: key[1],
                rea_chave: chave,
              },
              { returning: false, logging: false }
            )
              .then(auditoria => {
                // console.log('Auditoria de deleção executada com sucesso.');
                return null;
              })
              .catch(function(err) {
                console.log('Erro ao executar auditoria de deleção.' + err);
              });
          }
        }
      })
      .catch(function(err) {
        console.log(err);
      });
  }
}
export default new AuditoriaController();
