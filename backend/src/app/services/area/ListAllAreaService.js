const { Sequelize } = require('sequelize');

class ListAllAreaService {
    constructor(setorModel) {
        this.setorModel = setorModel;
    }

    async execute() {
        const areas = await this.setorModel.findAll({
            where:
            Sequelize.where(Sequelize.col('set_id'), Sequelize.col('set_id_area')),
            order: ['set_nome'],
            attributes: ['set_id', 'set_nome'],
            logging: true
        });

        return areas;
    }
}

export default ListAllAreaService;
