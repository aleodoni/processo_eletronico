import AppError from '../../error/AppError';

class DeleteNodoService {
    constructor(nodoModel) {
        this.nodoModel = nodoModel;
    }

    async execute({ id }) {
        const nodo = await this.nodoModel.findByPk(id, {});

        if (!nodo) {
            throw new AppError('Nodo não encontrado');
        }

        await nodo.destroy({ where: { nod_id: id } });

        return nodo;
    }
}

export default DeleteNodoService;
