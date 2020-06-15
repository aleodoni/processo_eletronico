class CreateAuditoriaService {
    constructor(auditoriaModel, dataHoraAtualModel) {
        this.auditoriaModel = auditoriaModel;
        this.dataHoraAtualModel = dataHoraAtualModel;
    }

    async execute(data, url, usuario, maquina, tipo, chave) {
        console.log(usuario);
        this.dataHoraAtualModel.findAll({
            plain: true,
            logging: false
        })
            .then(dataHoraAtual => {
                const pattern = /(\d{2})-(\d{2})-(\d{4}) (\d{2}):(\d{2}):(\d{2})/;
                const newDate = new Date(dataHoraAtual.dataValues.data_hora_atual.replace(pattern, '$3-$2-$1T$4:$5:$6'));
                if (tipo === 'I') {
                    const keys = Object.entries(data);
                    for (const key of keys) {
                        this.auditoriaModel.create(
                            {
                                rea_data: newDate,
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
                                rea_data: newDate,
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
                                rea_data: newDate,
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
