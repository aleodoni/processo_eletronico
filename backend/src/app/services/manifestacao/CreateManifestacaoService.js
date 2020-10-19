import ConnectionHelper from '../../helpers/ConnectionHelper';

class CreateManifestacaoService {
    constructor(manifestacaoModel, dataHoraAtualModel) {
        this.manifestacaoModel = manifestacaoModel;
        this.dataHoraAtualModel = dataHoraAtualModel;
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
        man_decisao_pad
    }) {
        try {
            const transaction = await ConnectionHelper.getTransaction();
            const dataHoraAtual = await this.dataHoraAtualModel.findAll({
                attributes: ['data_hora_atual'],
                logging: false,
                plain: true
            }, { transaction: transaction });
            man_data = dataHoraAtual.dataValues.data_hora_atual;
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
            await transaction.commit();

            return { man_id: manifestacao.man_id };
        } catch (error) {
            console.log(error);
        }
    }
}

export default CreateManifestacaoService;
