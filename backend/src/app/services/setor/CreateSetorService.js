import AppError from '../../error/AppError';

class CreateSetorService {
    constructor(setorModel) {
        this.setorModel = setorModel;
    }

    async execute({ set_id, set_nome, set_sigla, set_id_area, set_ativo, set_tipo }) {
        // Verifica se set_nome é nulo ou em branco
        if (!set_nome || set_nome.trim().length === 0) {
            throw new AppError('Nome inválido');
        }

        // Verifica se set_sigla é nulo ou em branco
        if (!set_sigla || set_sigla.trim().length === 0) {
            throw new AppError('Sigla inválida');
        }

        // Verifica se set_area é nulo ou em branco
        if (!set_id_area) {
            throw new AppError('Área inválida');
        }

        const genero = await this.setorModel.create({ set_id, set_nome, set_sigla, set_id_area, set_ativo, set_tipo }, {
            logging: false
        });

        return genero.toJSON();
    }
}

export default CreateSetorService;
