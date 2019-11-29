class BibController {
    async index(req, res) {
        return res.json('spa2');
    }
}

export default new BibController();
