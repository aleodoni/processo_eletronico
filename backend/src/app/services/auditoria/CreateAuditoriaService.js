class CreateAuditoriaService {
    constructor(auditoriaModel, dataHoraAtualModel) {
        this.auditoriaModel = auditoriaModel;
        this.dataHoraAtualModel = dataHoraAtualModel;
    }

    async execute(data, url, usuario, maquina, tipo, chave) {
        this.dataHoraAtualModel.findAll({
            plain: true,
            logging: false
        })
            .then(dataHoraAtual => {
                if (tipo === 'I') {
                    const keys = Object.entries(data);
                    for (const key of keys) {
                        this.auditoriaModel.create(
                            {
                                rea_data: dataHoraAtual.dataValues.data_hora_atual,
                                rea_tela: url,
                                rea_login: usuario,
                                rea_terminal: maquina,
                                rea_operacao: tipo,
                                rea_campo: key[0],
                                rea_valor_anterior: key[1],
                                rea_chave: chave
                            },
                            { returning: false, logging: false }
                        );
                    }
                }
                if (tipo === 'U') {
                    const keys = Object.entries(data);
                    for (const key of keys) {
                        this.auditoriaModel.create(
                            {
                                rea_data: dataHoraAtual.dataValues.data_hora_atual,
                                rea_tela: url,
                                rea_login: usuario,
                                rea_terminal: maquina,
                                rea_operacao: tipo,
                                rea_campo: key[0],
                                rea_valor_anterior: key[1],
                                rea_chave: chave
                            },
                            { returning: false, logging: false }
                        );
                    }
                }
                if (tipo === 'D') {
                    const keys = Object.entries(data);
                    for (const key of keys) {
                        this.auditoriaModel.create(
                            {
                                rea_data: dataHoraAtual.dataValues.data_hora_atual,
                                rea_tela: url,
                                rea_login: usuario,
                                rea_terminal: maquina,
                                rea_operacao: tipo,
                                rea_campo: key[0],
                                rea_valor_anterior: key[1],
                                rea_chave: chave
                            },
                            { returning: false, logging: false }
                        );
                    }
                }
                return null;
            });
    }
}

export default CreateAuditoriaService;
