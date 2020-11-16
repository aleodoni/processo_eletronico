import React, { useState, useEffect, useRef } from 'react';
import { useHistory } from 'react-router';
import { toast as mensagem } from 'react-toastify';
import { Form } from '@unform/web';
import { FaSearch } from 'react-icons/fa';
import Input from '../../components/layout/Input';
import InputMask from '../../components/layout/InputMask';
import CpfInputMask from '../../components/layout/InputMask/CpfInputMask';
import TextArea from '../../components/layout/TextArea';
import Select from '../../components/layout/Select';
import Limpar from '../../components/layout/button/Limpar';
import {
    Container,
    Main,
    ContainerAssunto,
    ContainerMatricula,
    ContainerCriaProcesso,
    ContainerIniciativa,
    ContainerDadosServidorPublico,
    ContainerNome,
    ContainerRevisaoPensaoAlimenticia,
    ContainerRecurso,
    ContainerAbonoPermanencia,
    ContainerBotoes,
    Erro,
    BotaoProcura,
    Titulo,
} from './styles';
import api from '../../service/api';
import Autorizacao from '../../components/Autorizacao';
import axios from '../../configs/axiosConfig';
import DefaultLayout from '../_layouts/default';
import CriaProcesso from '../../components/layout/button/CriaProcesso';
import Iniciativa from '../../components/system/select/Iniciativa';
import ComAbono from '../../components/system/select/ComAbono';
import { cpf, cnpj } from '../../utils/validaCpfCnpj';
import * as constantes from '../../utils/constantes';

function CriarProcesso() {
    const history = useHistory();
    const [erro, setErro] = useState('');

    const [processo, setProcesso] = useState({
        proId: undefined,
        genId: '-1',
        areaId: '-1',
        tprId: '-1',
        proIniciativa: '',
        proTipoIniciativa: '',
        proNome: '',
        proMatricula: '',
        proCpf: '',
        proCnpj: '',
        proFone: '',
        proCelular: '',
        proEmail: '',
        proAssunto: '',
        proContatoPj: '',
    });

    const [tipoIniciativaVisivel, setTipoIniciativaVisivel] = useState(false);
    const [matriculaVisivel, setMatriculaVisivel] = useState(false);
    const [nomeVisivel, setNomeVisivel] = useState(false);
    const [dadosServidorPublico, setDadosServidorPublico] = useState(false);
    const [emailVisivel, setEmailVisivel] = useState(false);
    const [cnpjVisivel, setCnpjVisivel] = useState(false);
    const [areaVisivel, setAreaVisivel] = useState(false);
    const [assuntoVisivel, setAssuntoVisivel] = useState(false);
    const [revisaoPensaoAlimenticiaVisivel, setRevisaoPensaoAlimenticiaVisivel] = useState(false);
    const [abonoPermanenciaVisivel, setAbonoPermanenciaVisivel] = useState(false);
    const [recursoVisivel, setRecursoVisivel] = useState(false);
    const [recursoPadVisivel, setRecursoPadVisivel] = useState(false);
    const [campoNumeroAbonoPermanenciaVisivel, setCampoNumeroAbonoPermanenciaVisivel] = useState(
        false
    );

    const [tiposProcesso, setTiposProcesso] = useState([]);
    const [tiposIniciativa, setTiposIniciativa] = useState([]);
    const [generos, setGeneros] = useState([]);
    const [areas, setAreas] = useState([]);
    const [pensoesAlimenticias, setPensoesAlimenticias] = useState([]);
    const [recursos, setRecursos] = useState([]);
    const [recursosPad, setRecursosPad] = useState([]);

    const formRef = useRef(null);

    async function carregaGenero() {
        api.defaults.headers.Authorization = sessionStorage.getItem('token');

        try {
            const response = await api.get('/generos');

            const data = response.data.map(genero => {
                return {
                    label: genero.gen_nome,
                    value: genero.gen_id,
                };
            });
            setGeneros(data);
        } catch (err) {
            mensagem.error(`Falha na autenticação - ${err}`);
        }
    }

    function iniciaTipoProcesso() {
        setProcesso({
            genId: '-1',
            tprId: '-1',
        });
        setTiposProcesso([]);
    }

    useEffect(() => {
        async function carrega() {
            await carregaGenero();
            iniciaTipoProcesso();
        }
        carrega();
    }, []);

    async function selecionaTipoProcesso(e) {
        const codGenId = e.target.value;
        api.defaults.headers.Authorization = sessionStorage.getItem('token');

        try {
            const response = await api.get(`/tipos-de-processo/${codGenId}`);

            const data = response.data.map(tipoProcesso => {
                return {
                    label: tipoProcesso.tpr_nome,
                    value: tipoProcesso.tpr_id,
                };
            });
            if (codGenId === '-1') {
                iniciaTipoProcesso();
            } else {
                setTiposProcesso(data);
            }
        } catch (err) {
            mensagem.error(`Falha na autenticação - ${err}`);
        }
    }

    async function carregaArea() {
        api.defaults.headers.Authorization = sessionStorage.getItem('token');

        try {
            const response = await api.get('/area-combo');

            const data = response.data.map(area => {
                return {
                    label: area.set_nome,
                    value: area.set_id,
                };
            });
            setAreas(data);
        } catch (err) {
            mensagem.error(`Falha na autenticação - ${err}`);
        }
    }

    async function carregaPensaoAlimenticia() {
        api.defaults.headers.Authorization = sessionStorage.getItem('token');

        try {
            const response = await api.get('/combo-processos-pensao-alimenticia');

            const data = response.data.map(processoPensao => {
                return {
                    label: `${processoPensao.pro_codigo} - ${processoPensao.pro_nome}`,
                    value: processoPensao.pro_id,
                };
            });
            setPensoesAlimenticias(data);
        } catch (err) {
            mensagem.error(`Falha na autenticação - ${err}`);
        }
    }

    async function carregaRecurso() {
        api.defaults.headers.Authorization = sessionStorage.getItem('token');

        try {
            const response = await api.get(
                `/combo-processos-recurso/${sessionStorage.getItem('usuario')}`
            );

            const data = response.data.map(processoRecurso => {
                return {
                    label: `${processoRecurso.pro_codigo} - ${processoRecurso.pro_nome} - ${processoRecurso.tpr_nome}`,
                    value: processoRecurso.pro_id,
                };
            });
            setRecursos(data);
        } catch (err) {
            mensagem.error(`Falha na autenticação - ${err}`);
        }
    }

    async function carregaRecursoPad() {
        api.defaults.headers.Authorization = sessionStorage.getItem('token');

        try {
            const response = await api.get(
                `/combo-processos-recurso-pad/${sessionStorage.getItem('usuario')}`
            );

            const data = response.data.map(processoRecursoPad => {
                return {
                    label: `${processoRecursoPad.pro_codigo} - ${processoRecursoPad.tpr_nome}`,
                    value: processoRecursoPad.pro_id,
                };
            });
            setRecursosPad(data);
        } catch (err) {
            mensagem.error(`Falha na autenticação - ${err}`);
        }
    }

    function handleTprId(e) {
        const tipoProcesso = Number(e.target.value);
        // demais processos
        if (tipoProcesso === constantes.TPR_DEMAIS) {
            setAssuntoVisivel(true);
        } else {
            if (tipoProcesso === constantes.TPR_REVISAO_DESCONTO_PENSAO_ALIMENTICIA) {
                carregaPensaoAlimenticia();
                setRevisaoPensaoAlimenticiaVisivel(true);
            } else {
                setRevisaoPensaoAlimenticiaVisivel(false);
            }
            if (tipoProcesso === constantes.TPR_ABONO_PERMANENCIA) {
                setAbonoPermanenciaVisivel(true);
            } else {
                setAbonoPermanenciaVisivel(false);
            }
            if (tipoProcesso === constantes.TPR_RECURSO) {
                carregaRecurso();
                setRecursoVisivel(true);
            } else {
                setRecursoVisivel(false);
            }
            if (tipoProcesso === constantes.TPR_RECURSO_REVISAO_PAD) {
                carregaRecursoPad();
                setRecursoPadVisivel(true);
            } else {
                setRecursoPadVisivel(false);
            }
            setAssuntoVisivel(false);
        }
    }

    function limpaCamposIniciativa() {
        setProcesso({
            proNome: '',
            proMatricula: '',
            proCpf: '',
            proCnpj: '',
            proFone: '',
            proCelular: '',
            proEmail: '',
            proAssunto: '',
            proContatoPj: '',
            proTipoIniciativa: '',
        });
    }

    function carregaTipoIniciativa(e) {
        limpaCamposIniciativa();
        iniciaTipoProcesso();
        setErro('');
        const iniciativa = e.target.value;
        if (iniciativa !== '') {
            const comboTipoIniciativa = [];
            setProcesso({
                proIniciativa: iniciativa,
            });
            setTipoIniciativaVisivel(true);
            if (iniciativa === 'Interna') {
                comboTipoIniciativa.push({
                    label: 'Servidor Público',
                    value: 'Servidor Público',
                });
                comboTipoIniciativa.push({
                    label: 'Diretorias',
                    value: 'Diretorias',
                });
                setCnpjVisivel(false);
                setAreaVisivel(false);
                setMatriculaVisivel(false);
                setNomeVisivel(false);
                setDadosServidorPublico(false);
                setEmailVisivel(false);
                setAssuntoVisivel(false);
            }
            if (iniciativa === 'Externa') {
                comboTipoIniciativa.push({
                    label: 'Pessoa Física',
                    value: 'Pessoa Física',
                });
                comboTipoIniciativa.push({
                    label: 'Pessoa Jurídica',
                    value: 'Pessoa Jurídica',
                });
                setCnpjVisivel(false);
                setMatriculaVisivel(false);
                setNomeVisivel(false);
                setDadosServidorPublico(false);
                setEmailVisivel(false);
                setAreaVisivel(false);
                setAssuntoVisivel(false);
            }
            setTiposIniciativa(comboTipoIniciativa);
        } else {
            setTipoIniciativaVisivel(false);
            setMatriculaVisivel(false);
            setNomeVisivel(false);
            setDadosServidorPublico(false);
            setEmailVisivel(false);
            setCnpjVisivel(false);
            setAreaVisivel(false);
            setAssuntoVisivel(false);
            setProcesso({
                proIniciativa: iniciativa,
            });
        }
    }

    function carregaDadosIniciativa(e) {
        limpaCamposIniciativa();
        iniciaTipoProcesso();
        setErro('');
        const tipoIniciativa = e.target.value;
        if (tipoIniciativa !== '') {
            setProcesso({
                proTipoIniciativa: tipoIniciativa,
            });
            if (tipoIniciativa === 'Servidor Público') {
                setMatriculaVisivel(true);
                setNomeVisivel(true);
                setDadosServidorPublico(true);
                setEmailVisivel(true);
                setCnpjVisivel(false);
                setAreaVisivel(false);
                setAssuntoVisivel(false);
            }
            if (tipoIniciativa === 'Diretorias') {
                carregaArea();
                setMatriculaVisivel(false);
                setNomeVisivel(false);
                setDadosServidorPublico(false);
                setEmailVisivel(false);
                setCnpjVisivel(false);
                setAreaVisivel(true);
                setAssuntoVisivel(false);
            }
            if (tipoIniciativa === 'Pessoa Física') {
                setMatriculaVisivel(false);
                setNomeVisivel(true);
                setDadosServidorPublico(true);
                setEmailVisivel(true);
                setCnpjVisivel(false);
                setAreaVisivel(false);
                setAssuntoVisivel(false);
            }
            if (tipoIniciativa === 'Pessoa Jurídica') {
                setMatriculaVisivel(false);
                setNomeVisivel(true);
                setDadosServidorPublico(false);
                setEmailVisivel(true);
                setCnpjVisivel(true);
                setAreaVisivel(false);
                setAssuntoVisivel(false);
            }
        } else {
            setMatriculaVisivel(false);
            setNomeVisivel(false);
            setDadosServidorPublico(false);
            setEmailVisivel(false);
            setCnpjVisivel(false);
            setAreaVisivel(false);
            setAssuntoVisivel(false);
            setProcesso({
                proTipoIniciativa: tipoIniciativa,
            });
        }
    }

    function criaProcesso() {
        const p = formRef.current.getData();
        setErro('');
        if (p.proIniciativa === '-1') {
            setErro('Selecione a iniciativa.');
            return;
        }
        if (p.proTipoIniciativa === '-1') {
            setErro('Selecione o tipo de iniciativa.');
            return;
        }
        if (p.proIniciativa === 'Interna') {
            if (p.proTipoIniciativa === 'Servidor Público') {
                let erros = '';
                if (p.proNome.trim() === '') {
                    erros = `${erros}Nome obrigatório.<br />`;
                }
                if (
                    p.proCpf.trim() === '' &&
                    p.proFone.trim() === '' &&
                    p.proCelular.trim() === '' &&
                    p.proEmail.trim() === ''
                ) {
                    erros = `${erros}Pelo menos um campo (Cpf, Fone, Celular, E-mail) deve ser preenchido.`;
                }
                if (erros !== '') {
                    setErro(erros);
                    return;
                }
                if (p.proCpf.trim() !== '') {
                    if (!cpf(p.proCpf.trim().replace(/[^\d]+/g, ''))) {
                        setErro('Cpf inválido.');
                        return;
                    }
                }
                if (p.genId === '-1') {
                    setErro('Selecione o gênero.');
                    return;
                }
                if (p.tprId === '-1') {
                    setErro('Selecione o tipo do processo.');
                    return;
                }
            }
            if (p.proTipoIniciativa === 'Diretorias') {
                if (p.areaId === '-1') {
                    setErro('Selecione a área.');
                    return;
                }
                if (p.genId === '-1') {
                    setErro('Selecione o gênero.');
                    return;
                }
                if (p.tprId === '-1') {
                    setErro('Selecione o tipo do processo.');
                    return;
                }
            }
        }
        if (p.proIniciativa === 'Externa') {
            if (p.proTipoIniciativa === 'Pessoa Física') {
                let erros = '';
                if (p.proNome.trim() === '') {
                    erros += 'Nome obrigatório.<br />';
                }
                if (
                    p.proCpf.trim() === '' &&
                    p.proFone.trim() === '' &&
                    p.proCelular.trim() === '' &&
                    p.proEmail.trim() === ''
                ) {
                    erros = `${erros}Pelo menos um campo (Cpf, Fone, Celular, E-mail) deve ser preenchido.`;
                }
                if (erros !== '') {
                    setErro(erros);
                    return;
                }
                if (p.proCpf.trim() !== '') {
                    if (!cpf(p.proCpf.trim().replace(/[^\d]+/g, ''))) {
                        setErro('Cpf inválido.');
                        return;
                    }
                }
                if (p.genId === '-1') {
                    setErro('Selecione o gênero.');
                    return;
                }
                if (p.tprId === '-1') {
                    setErro('Selecione o tipo do processo.');
                    return;
                }
            }
            if (p.proTipoIniciativa === 'Pessoa Jurídica') {
                let erros = '';
                if (p.proNome.trim() === '') {
                    erros += 'Nome obrigatório.<br />';
                }
                if (p.proContatoPj.trim() === '') {
                    erros = `${erros}Nome do responsável obrigatório.<br />`;
                }
                if (p.proCnpj.trim() === '') {
                    erros = `${erros}Cnpj obrigatório.<br />`;
                }
                if (
                    p.proFone.trim() === '' &&
                    p.proCelular.trim() === '' &&
                    p.proEmail.trim() === ''
                ) {
                    erros = `${erros}Pelo menos um campo (Fone, Celular, E-mail) deve ser preenchido.`;
                }
                if (erros !== '') {
                    setErro(erros);
                    return;
                }
                if (p.proCnpj.trim() !== '') {
                    if (!cnpj(p.proCnpj.trim())) {
                        setErro('Cnpj inválido.');
                        return;
                    }
                }
                if (p.genId === '-1') {
                    setErro('Selecione o gênero.');
                    return;
                }
                if (p.tprId === '-1') {
                    setErro('Selecione o tipo do processo.');
                    return;
                }
            }
        }
        // aqui valida se for pensão alimentícia
        if (Number(p.tprId) === constantes.TPR_REVISAO_DESCONTO_PENSAO_ALIMENTICIA) {
            if (p.proCpf === '' || p.proCpf === undefined) {
                setErro('CPF é obrigatório.');
                return;
            }
            if (Number(sessionStorage.getItem('areaUsuario')) !== constantes.AREA_DARH) {
                setErro('Este tipo de processo só pode ser aberto pela área DGRH.');
                return;
            }
            if (!cpf(p.proCpf.trim().replace(/[^\d]+/g, ''))) {
                setErro('Cpf inválido.');
                return;
            }
            if (p.proPensao === '-1') {
                setErro('Selecione o processo.');
                return;
            }
        }
        let pensao;
        if (p.proPensao !== '-1' && p.proPensao !== undefined) {
            pensao = Number(p.proPensao);
        } else {
            pensao = null;
        }

        // aqui valida se é abono de permanência

        if (Number(p.tprId) === constantes.TPR_ABONO_PERMANENCIA) {
            if (p.proComAbono === '-1') {
                setErro('Selecione se há comunicado eletrônico prévio.');
                return;
            }
            if (p.proComAbono === 'true') {
                if (p.proNumComAbono === '') {
                    setErro('Preencha o número do comunicado eletrônico prévio.');
                    return;
                }
            }
        } else {
            p.proComAbono = false;
            p.proNumComAbono = null;
        }

        // aqui valida se é do tipo recurso
        let proRecurso = false;
        let proCodigoRecurso = null;
        if (Number(p.tprId) === constantes.TPR_RECURSO) {
            if (p.proRecurso === '-1') {
                setErro('Selecione o processo.');
                return;
            }
            proCodigoRecurso = Number(p.proRecurso);
            proRecurso = true;
        }

        // aqui valida se se é do tipo auxílio funeral
        // se for o CPF é obrigatório
        if (Number(p.tprId) === constantes.TPR_AUXILIO_FUNERAL) {
            if (p.proCpf === '' || p.proCpf === undefined) {
                setErro('CPF é obrigatório.');
                return;
            }
        }
        //
        let cpfNumeros;
        let cnpjNumeros;
        if (p.proCpf !== '' && p.proCpf !== undefined) {
            cpfNumeros = p.proCpf.replace(/[^\d]+/g, '');
        }
        if (p.proCnpj !== '' && p.proCnpj !== undefined) {
            cnpjNumeros = p.proCnpj.replace(/[^\d]+/g, '');
        }

        axios({
            method: 'POST',
            url: '/processo',
            data: {
                pro_id: null,
                pro_nome: p.proNome,
                pro_matricula: p.proMatricula,
                pro_cpf: cpfNumeros,
                pro_cnpj: cnpjNumeros,
                pro_fone: p.proFone,
                pro_celular: p.proCelular,
                pro_email: p.proEmail,
                pro_encerramento: null,
                pro_assunto: p.proAssunto,
                usu_autuador: sessionStorage.getItem('usuario'),
                pro_ultimo_tramite: null,
                usu_finalizador: null,
                nod_id: null,
                set_id_autuador: sessionStorage.getItem('setorUsuario'),
                area_id: parseInt(sessionStorage.getItem('areaUsuario'), 10),
                set_id_finalizador: null,
                pro_iniciativa: p.proIniciativa,
                pro_tipo_iniciativa: p.proTipoIniciativa,
                area_id_iniciativa: p.areaId,
                tpr_id: p.tprId,
                pro_contato_pj: p.proContatoPj,
                pro_autuacao: null,
                pro_recurso: proRecurso,
                pro_pensao: pensao,
                pro_com_abono: p.proComAbono,
                pro_num_com_abono: p.proNumComAbono,
                pro_codigo_recurso: proCodigoRecurso,
            },
            headers: {
                authorization: sessionStorage.getItem('token'),
            },
        })
            .then(res => {
                history.push(`/dados-processo/${res.data.pro_id}`);
                mensagem.success('Processo criado com sucesso.');
            })
            .catch(erroCria => {
                if (
                    erroCria.response.data.error ===
                    'Processo sem fluxo. Cadastre um fluxo primeiro.'
                ) {
                    setErro('Processo sem fluxo. Cadastre um fluxo primeiro.');
                } else if (
                    erroCria.response.data.error === 'Erro ao retornar dados de área de pessoa.'
                ) {
                    setErro(
                        'Erro ao retornar dados de área de pessoa. Insira um nome válido de pessoa.'
                    );
                } else {
                    setErro('Erro ao inserir processo.');
                }
            });
    }

    function localiza() {
        const matricula = formRef.current.getFieldValue('proMatricula');
        if (matricula.trim() === '') {
            setErro('Digite a matrícula.');
            return;
        }
        setProcesso({
            proNome: '',
            proCpf: '',
            proCnpj: '',
            proFone: '',
            proCelular: '',
            proEmail: '',
            proAssunto: '',
            proContatoPj: '',
        });
        setErro('');
        axios({
            method: 'GET',
            url: `/dados-pessoa/${matricula}`,
            headers: {
                authorization: sessionStorage.getItem('token'),
            },
        })
            .then(res => {
                if (res.data === null) {
                    setErro('Matrícula inválida ou inexistente.');
                    setProcesso({
                        proMatricula: '',
                    });
                } else {
                    if (res.data.pes_email !== null) {
                        res.data.pes_email = res.data.pes_email.toLowerCase();
                    } else {
                        res.data.pes_email = '';
                    }
                    if (res.data.pes_cpf === null) {
                        res.data.pes_cpf = '';
                    }
                    if (res.data.fone === null) {
                        res.data.fone = '';
                    }
                    if (res.data.pes_celular === null) {
                        res.data.pes_celular = '';
                    }
                    if (res.data.pes_cpf.toString().length === 10) {
                        res.data.pes_cpf = `0${res.data.pes_cpf.toString()}`;
                    }
                    if (res.data.pes_cpf.toString().length === 9) {
                        res.data.pes_cpf = `00${res.data.pes_cpf.toString()}`;
                    }
                    formRef.current.setFieldValue('proCpf', res.data.pes_cpf);
                    setProcesso({
                        proNome: res.data.pes_nome,
                        proCpf: res.data.pes_cpf,
                        proFone: res.data.fone,
                        proCelular: res.data.pes_celular,
                        proEmail: res.data.pes_email,
                    });
                }
            })
            .catch(() => {
                setErro('Erro ao carregar dados de pessoa.');
            });
    }

    function abreCampoNumeroAbono() {
        const p = formRef.current.getData();
        if (p.proComAbono === 'true') {
            setCampoNumeroAbonoPermanenciaVisivel(true);
        } else {
            p.proNumComAbono = '';
            setCampoNumeroAbonoPermanenciaVisivel(false);
        }
    }

    function limpaCampos() {
        formRef.current.reset();
        setAssuntoVisivel(false);
        setTipoIniciativaVisivel(false);
        setMatriculaVisivel(false);
        setNomeVisivel(false);
        setDadosServidorPublico(false);
        setEmailVisivel(false);
        setCnpjVisivel(false);
        setAreaVisivel(false);
        setRevisaoPensaoAlimenticiaVisivel(false);
        setAbonoPermanenciaVisivel(false);
        iniciaTipoProcesso();
        formRef.current.setFieldValue('genId', '-1');
        formRef.current.setFieldValue('proIniciativa', '-1');
        formRef.current.setFieldValue('tprId', '-1');
        setErro('');
    }

    return (
        <DefaultLayout>
            <Container>
                <Autorizacao tela="Criar processo" />
                <Main>
                    <Titulo>
                        <p>Criar novo processo</p>
                        <hr />
                    </Titulo>
                    <Erro dangerouslySetInnerHTML={{ __html: erro }} />
                    <Form ref={formRef} initialData={processo} onSubmit={criaProcesso}>
                        <Input name="proId" type="hidden" />
                        <ContainerIniciativa>
                            <Iniciativa
                                name="proIniciativa"
                                changeHandler={carregaTipoIniciativa}
                            />
                            {tipoIniciativaVisivel ? (
                                <Select
                                    name="proTipoIniciativa"
                                    label="Tipo da iniciativa"
                                    options={tiposIniciativa}
                                    onChange={carregaDadosIniciativa}
                                />
                            ) : null}
                            {matriculaVisivel ? (
                                <ContainerMatricula>
                                    <InputMask
                                        name="proMatricula"
                                        label="Matrícula"
                                        mask="99999"
                                        maskChar=" "
                                    />
                                    <BotaoProcura
                                        id="btnLocaliza"
                                        name="btnLocaliza"
                                        type="button"
                                        onClick={localiza}>
                                        <FaSearch />
                                        Localizar
                                    </BotaoProcura>
                                </ContainerMatricula>
                            ) : null}
                            {areaVisivel ? (
                                <Select name="areaId" label="Área" options={areas} />
                            ) : null}
                        </ContainerIniciativa>
                        {nomeVisivel ? (
                            <ContainerNome>
                                <Input
                                    name="proNome"
                                    label="Nome"
                                    type="text"
                                    size="100"
                                    maxLength="100"
                                />
                            </ContainerNome>
                        ) : null}
                        {dadosServidorPublico ? (
                            <ContainerDadosServidorPublico>
                                <CpfInputMask
                                    name="proCpf"
                                    label="Cpf"
                                    //mask="999.999.999-99"
                                    size="11"
                                    maskChar=" "
                                />
                                <Input
                                    name="proFone"
                                    label="Fone"
                                    type="text"
                                    size="30"
                                    maxLength="31"
                                />
                                <Input
                                    name="proCelular"
                                    label="Celular"
                                    type="text"
                                    size="30"
                                    maxLength="30"
                                />
                            </ContainerDadosServidorPublico>
                        ) : null}
                        {cnpjVisivel ? (
                            <div>
                                <ContainerNome>
                                    <Input
                                        name="proContatoPj"
                                        label="Responsável"
                                        type="text"
                                        size="100"
                                        maxLength="100"
                                    />
                                </ContainerNome>
                                <ContainerDadosServidorPublico>
                                    <Input
                                        name="proCnpj"
                                        label="Cnpj"
                                        type="text"
                                        size="12"
                                        maxLength="14"
                                    />
                                    <Input
                                        name="proFone"
                                        label="Fone"
                                        type="text"
                                        size="30"
                                        maxLength="30"
                                    />
                                    <Input
                                        name="proCelular"
                                        label="Celular"
                                        type="text"
                                        size="30"
                                        maxLength="30"
                                    />
                                </ContainerDadosServidorPublico>
                            </div>
                        ) : null}
                        {emailVisivel ? (
                            <ContainerNome>
                                <Input
                                    name="proEmail"
                                    label="E-mail"
                                    type="text"
                                    size="101"
                                    maxLength="100"
                                />
                            </ContainerNome>
                        ) : null}
                        <ContainerCriaProcesso>
                            <Select
                                name="genId"
                                label="Gênero"
                                options={generos}
                                onChange={selecionaTipoProcesso}
                            />
                            <Select
                                name="tprId"
                                label="Tipo do processo"
                                options={tiposProcesso}
                                onChange={handleTprId}
                            />
                        </ContainerCriaProcesso>
                        {revisaoPensaoAlimenticiaVisivel ? (
                            <ContainerRevisaoPensaoAlimenticia>
                                <Select
                                    name="proPensao"
                                    label="Selecione o processo"
                                    options={pensoesAlimenticias}
                                />
                            </ContainerRevisaoPensaoAlimenticia>
                        ) : null}
                        {recursoVisivel ? (
                            <ContainerRecurso>
                                <Select
                                    name="proRecurso"
                                    label="Selecione o processo para recurso"
                                    options={recursos}
                                />
                            </ContainerRecurso>
                        ) : null}
                        {recursoPadVisivel ? (
                            <ContainerRecurso>
                                <Select
                                    name="proRecursoPad"
                                    label="Selecione o processo para recurso de PAD"
                                    options={recursosPad}
                                />
                            </ContainerRecurso>
                        ) : null}
                        {abonoPermanenciaVisivel ? (
                            <ContainerAbonoPermanencia>
                                <ComAbono name="proComAbono" onChange={abreCampoNumeroAbono} />
                                {campoNumeroAbonoPermanenciaVisivel ? (
                                    <>
                                        <Input
                                            name="proNumComAbono"
                                            label="Número da comunicação de abono"
                                            type="text"
                                            size="30"
                                            maxLength="30"
                                        />
                                    </>
                                ) : null}
                            </ContainerAbonoPermanencia>
                        ) : null}
                        {assuntoVisivel ? (
                            <ContainerAssunto>
                                <TextArea name="proAssunto" label="Assunto" rows={30} cols={100} />
                            </ContainerAssunto>
                        ) : null}
                    </Form>
                    <ContainerBotoes>
                        <CriaProcesso name="btnCriaProcesso" clickHandler={criaProcesso} />
                        <Limpar name="btnLimpa" clickHandler={limpaCampos} />
                    </ContainerBotoes>
                </Main>
            </Container>
        </DefaultLayout>
    );
}

export default CriarProcesso;
