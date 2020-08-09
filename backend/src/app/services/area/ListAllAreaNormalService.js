class ListAllAreaNormalService {
    constructor(areaComboModel) {
        this.areaComboModel = areaComboModel;
    }

    async execute() {
        const areas = await this.areaComboModel.findAll({
            where: { set_tipo: 'N' },
            order: ['set_nome'],
            attributes: ['set_id', 'set_nome'],
            logging: false
        });

        return areas;
    }
}

export default ListAllAreaNormalService;
