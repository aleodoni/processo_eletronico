import Arquivo from '../models/Arquivo';
import Manifestacao from '../models/Manifestacao';
import CriaManifestacaoService from '../services/pdf/CriaManifestacaoService';

const criaManifestacao = new CriaManifestacaoService(Arquivo, Manifestacao);

class CriaPdfController {
    async criaPdfVistoExecutiva(req, res) {
        await criaManifestacao.criaManifestacaoVistoExecutiva(req.body.arq_id, req.body.man_id);
        return res.status(204).end();
    }

    async criaPdfCiencia(req, res) {
        await criaManifestacao.criaManifestacaoCiencia(req.body.arq_id, req.body.man_id);
        return res.status(204).end();
    }

    async criaPdfCienciaAverbacao(req, res) {
        await criaManifestacao.criaManifestacaoCienciaAverbacao(req.body.arq_id, req.body.man_id);
        return res.status(204).end();
    }
}

export default new CriaPdfController();
