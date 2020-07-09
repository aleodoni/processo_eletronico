import AppError from '../../error/AppError';

class CreateNodoService {
    constructor(nodoModel, fluxoModel) {
        this.nodoModel = nodoModel;
        this.fluxoModel = fluxoModel;
    }

    async execute({
        nod_id,
        nod_inicio,
        nod_fim,
        flu_id,
        area_id,
        nod_dias_prazo,
        nod_ordem,
        nod_aval_executiva,
        nod_decisao,
        nod_interessado,
        nod_ciencia,
        nod_averbacao,
        nod_ciencia_averbacao,
        nod_aval_horario,
        nod_contagem_tempo,
        nod_ciencia_calculo
    }) {
        // Verifica se o fluxo existe
        const fluxoExiste = await this.fluxoModel.findByPk(flu_id, { logging: true });

        if (!fluxoExiste) {
            throw new AppError('Fluxo não existe');
        }
        //

        const nodo = await this.nodoModel.create({
            nod_id,
            nod_inicio,
            nod_fim,
            flu_id,
            area_id,
            nod_dias_prazo,
            nod_ordem,
            nod_aval_executiva,
            nod_decisao,
            nod_interessado,
            nod_ciencia,
            nod_averbacao,
            nod_ciencia_averbacao,
            nod_aval_horario,
            nod_contagem_tempo,
            nod_ciencia_calculo
        }, {
            logging: true
        });

        return nodo.toJSON();
    }
}

export default CreateNodoService;
