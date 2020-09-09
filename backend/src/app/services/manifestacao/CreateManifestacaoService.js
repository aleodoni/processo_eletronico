import ConnectionHelper from '../../helpers/ConnectionHelper';

class CreateManifestacaoService {
    constructor(manifestacaoModel, dataHoraAtualModel, arquivoModel) {
        this.manifestacaoModel = manifestacaoModel;
        this.dataHoraAtualModel = dataHoraAtualModel;
        this.arquivoModel = arquivoModel;
    }

    async criaManifestacao({
        man_id,
        pro_id,
        tmn_id,
        man_login,
        man_id_area,
        man_visto_executiva,
        man_data,
        nod_id,
        man_ciencia,
        man_averbacao,
        man_ciencia_averbacao,
        man_aval_horario,
        man_contagem_tempo,
        man_ciencia_calculo,
        man_parecer_projuris_aposentadoria,
        man_decisao_pad,
        arq_id,
        arq_nome,
        arq_tipo,
        arq_doc_id,
        arq_doc_tipo,
        tpd_id,
        arq_data,
        arq_login
    }) {
        try {
            // const sequelize = (process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASS, {
            //     host: process.env.DB_HOST,
            //     dialect: 'postgres',
            //     define: {
            //         timestamps: false,
            //         underscoredAll: true
            //     },
            //     pool: {
            //         max: 7,
            //         min: 0,
            //         acquire: 30000,
            //         idle: 10000
            //     }
            // });

            // const transaction = await sequelize.transaction({ autocommit: false });
            const transaction = await ConnectionHelper.getTransaction();
            const dataHoraAtual = await this.dataHoraAtualModel.findAll({
                attributes: ['data_hora_atual'],
                logging: false,
                plain: true
            }, { transaction: transaction });
            man_data = dataHoraAtual.dataValues.data_hora_atual;
            arq_data = dataHoraAtual.dataValues.data_hora_atual;
            const manifestacao = await this.manifestacaoModel.create({
                man_id,
                pro_id,
                tmn_id,
                man_login,
                man_id_area,
                man_visto_executiva,
                man_data,
                nod_id,
                man_ciencia,
                man_averbacao,
                man_ciencia_averbacao,
                man_aval_horario,
                man_contagem_tempo,
                man_ciencia_calculo,
                man_parecer_projuris_aposentadoria,
                man_decisao_pad
            }, {
                logging: false
            }, { transaction: transaction });

            man_id = manifestacao.man_id;
            arq_doc_id = manifestacao.man_id;

            const arquivo = await this.arquivoModel.create({
                arq_id,
                arq_nome,
                pro_id,
                man_id,
                arq_tipo,
                arq_doc_id,
                arq_doc_tipo,
                tpd_id,
                arq_data,
                arq_login
            }, {
                logging: false
            }, { transaction: transaction });

            await transaction.commit();

            return { man_id: manifestacao.man_id, arq_id: arquivo.arq_id };
        } catch (error) {
            console.log(error);
        }
    }
}

export default CreateManifestacaoService;
