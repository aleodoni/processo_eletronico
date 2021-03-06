import Sequelize from 'sequelize';
import Autorizacao from '../app/models/Autorizacao';
import Area from '../app/models/Area';
import AreaCombo from '../app/models/AreaCombo';
import Banco from '../app/models/Banco';
import Setor from '../app/models/Setor';
import Lotacao from '../app/models/Lotacao';
import Tela from '../app/models/Tela';
import Genero from '../app/models/Genero';
import VGenero from '../app/models/VGenero';
import ModeloMenu from '../app/models/ModeloMenu';
import AreaMenu from '../app/models/AreaMenu';
import AreaTela from '../app/models/AreaTela';
import Menu from '../app/models/Menu';
import Fluxo from '../app/models/Fluxo';
import TipoProcesso from '../app/models/TipoProcesso';
import VMenu from '../app/models/VMenu';
import VMenuPai from '../app/models/VMenuPai';
import VAreaMenu from '../app/models/VAreaMenu';
import VTipoProcesso from '../app/models/VTipoProcesso';
import VTelaMenu from '../app/models/VTelaMenu';
import VDadosPessoa from '../app/models/VDadosPessoa';
import Auditoria from '../app/models/Auditoria';
import Processo from '../app/models/Processo';
import ProcessoOrigem from '../app/models/ProcessoOrigem';
import Nodo from '../app/models/Nodo';
import VNodo from '../app/models/VNodo';
import VDadosProcesso from '../app/models/VDadosProcesso';
import VDadosProcessoPasPad from '../app/models/VDadosProcessoPasPad';
import DataHoraAtual from '../app/models/DataHoraAtual';
import RazaoTramite from '../app/models/RazaoTramite';
import ProximoTramite from '../app/models/ProximoTramite';
import Arquivo from '../app/models/Arquivo';
import TipoManifestacao from '../app/models/TipoManifestacao';
import Manifestacao from '../app/models/Manifestacao';
import VDadosLogin from '../app/models/VDadosLogin';
import ArquivoManifestacao from '../app/models/ArquivoManifestacao';
import VNodoFluxo from '../app/models/VNodoFluxo';
import VProximoTramite from '../app/models/VProximoTramite';
import VProcessoEnvia from '../app/models/VProcessoEnvia';
import VProcessoRecebe from '../app/models/VProcessoRecebe';
import VProcessoOrigem from '../app/models/VProcessoOrigem';
import VProximoTramiteNormal from '../app/models/VProximoTramiteNormal';
import Tramite from '../app/models/Tramite';
import VTramite from '../app/models/VTramite';
import TipoDocumento from '../app/models/TipoDocumento';
import VTipoDocumento from '../app/models/VTipoDocumento';
import VAreaTramitacaoPessoal from '../app/models/VAreaTramitacaoPessoal';
import VProcessosPessoais from '../app/models/VProcessosPessoais';
import VProcessosArea from '../app/models/VProcessosArea';
import VNodoDecisao from '../app/models/VNodoDecisao';
import VDecisaoPessoal from '../app/models/VDecisaoPessoal';
import VManifestacao from '../app/models/VManifestacao';
import VManifestacaoProcesso from '../app/models/VManifestacaoProcesso';
import RegraAposentacao from '../app/models/RegraAposentacao';
import ComissaoProcessante from '../app/models/ComissaoProcessante';
import VMembrosComissao from '../app/models/VMembrosComissao';
import MembroComissao from '../app/models/MembroComissao';
import NomePasPad from '../app/models/NomePasPad';
import Sigilo from '../app/models/Sigilo';
import VSigilo from '../app/models/VSigilo';
import databaseConfig from '../config/database';

import ConnectionHelper from '../app/helpers/ConnectionHelper';
import VDadosMembrosComissao from '../app/models/VDadosMembrosComissao';
import VProcessosSigiloso from '../app/models/VProcessosSigiloso';
import VFornecedores from '../app/models/VFornecedores';
import VAutorizacaoFornecimento from '../app/models/VAutorizacaoFornecimento';
import AutorizacaoFornecimento from '../app/models/AutorizacaoFornecimento';
import VEmpenhoFornecedor from '../app/models/VEmpenhoFornecedor';
import ProcessoEmpenho from '../app/models/ProcessoEmpenho';
import ProcessoNotaFiscal from '../app/models/ProcessoNotaFiscal';
import AcessoFornecedores from '../app/models/AcessoFornecedores';
import VAutorizacaoArquivo from '../app/models/VAutorizacaoArquivo';
import ArquivoProcessoPgto from '../app/models/ArquivoProcessoPgto';
import VAutorizacaoProcesso from '../app/models/VAutorizacaoProcesso';
import VSetor from '../app/models/VSetor';
import ProcessoNAD from '../app/models/ProcessoNAD';
import VObservacaoTramite from '../app/models/VObservacaoTramite';

const models = [
    Autorizacao,
    Auditoria,
    DataHoraAtual,
    Area,
    AreaCombo,
    Setor,
    Lotacao,
    Tela,
    Menu,
    VMenu,
    ModeloMenu,
    AreaMenu,
    AreaTela,
    Genero,
    VGenero,
    VAreaMenu,
    VTelaMenu,
    VMenuPai,
    TipoProcesso,
    VTipoProcesso,
    VDadosPessoa,
    Fluxo,
    Processo,
    ProcessoOrigem,
    Nodo,
    VNodo,
    VDadosProcesso,
    RazaoTramite,
    ProximoTramite,
    Arquivo,
    TipoManifestacao,
    Manifestacao,
    VDadosLogin,
    ArquivoManifestacao,
    VNodoFluxo,
    VProximoTramite,
    Tramite,
    VProcessoEnvia,
    VProximoTramiteNormal,
    VProcessoRecebe,
    VTramite,
    TipoDocumento,
    VAreaTramitacaoPessoal,
    VProcessosPessoais,
    VProcessosArea,
    VNodoDecisao,
    VDecisaoPessoal,
    VTipoDocumento,
    VManifestacao,
    VManifestacaoProcesso,
    VProcessoOrigem,
    RegraAposentacao,
    ComissaoProcessante,
    MembroComissao,
    NomePasPad,
    VMembrosComissao,
    VDadosProcessoPasPad,
    VDadosMembrosComissao,
    VProcessosSigiloso,
    Sigilo,
    VSigilo,
    VFornecedores,
    VAutorizacaoFornecimento,
    VEmpenhoFornecedor,
    ProcessoEmpenho,
    ProcessoNotaFiscal,
    AcessoFornecedores,
    Banco,
    AutorizacaoFornecimento,
    VAutorizacaoArquivo,
    ArquivoProcessoPgto,
    VAutorizacaoProcesso,
    ProcessoNAD,
    VSetor,
    VObservacaoTramite
];

class Database {
    constructor() {
        this.init();
    }

    init() {
        this.connection = new Sequelize(databaseConfig);
        models.map(model => model.init(this.connection));
        models.map(
            model => model.associate && model.associate(this.connection.models)
        );

        ConnectionHelper.init(this.connection);
    }
}
export default new Database();
