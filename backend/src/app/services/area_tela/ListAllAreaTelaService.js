import AppError from '../../error/AppError';

class ListAllAreaTelaService {
    constructor(areaTelaModel) {
        this.areaTelaModel = areaTelaModel;
    }

    async execute({ setId }) {
        const setor = await this.areaTelaModel.findAll({
            where: {
                set_id: Number(setId)
            },
            logging: true
        });

        if (!setor || setor.length === 0) {
            throw new AppError('Telas da área não encontrada');
        }

        return setor;
    }
}

export default ListAllAreaTelaService;
