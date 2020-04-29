import React, { useState, useEffect, useRef } from 'react';
import { useHistory } from 'react-router';
import { toast as mensagem } from 'react-toastify';
import { Form } from '@unform/web';
import Input from '../../components/layout/Input';
import TextArea from '../../components/layout/TextArea';
import Select from '../../components/layout/Select';
import {
    Container,
    Main,
    ContainerAssunto,
    ContainerMatricula,
    ContainerCriaProcesso,
    ContainerIniciativa,
    ContainerDadosServidorPublico,
    ContainerNome,
    Erro,
} from './styles';
import api from '../../service/api';
import Autorizacao from '../../components/Autorizacao';
import axios from '../../configs/axiosConfig';
import DefaultLayout from '../_layouts/default';
import CriaProcesso from '../../components/layout/button/CriaProcesso';
import Localizar from '../../components/layout/button/Localizar';
import Iniciativa from '../../components/system/select/Iniciativa';
import { cpf, cnpj } from '../../utils/validaCpfCnpj';

function CriarProcesso() {
    const history = useHistory();
    const [erro, setErro] = useState('');
    const [proId, setProId] = useState(undefined);
    const [genId, setGenId] = useState('');
    const [areaId, setAreaId] = useState('');
    const [tprId, setTprId] = useState('');
    const [tiposProcesso, setTiposProcesso] = useState([]);
    const [tiposIniciativa, setTiposIniciativa] = useState([]);
    const [proIniciativa, setProIniciativa] = useState('');
    const [proTipoIniciativa, setProTipoIniciativa] = useState('');
    const [proNome, setProNome] = useState('');
    const [proMatricula, setProMatricula] = useState('');
    const [proCpf, setProCpf] = useState('');
    const [proCnpj, setProCnpj] = useState('');
    const [proFone, setProFone] = useState('');
    const [proCelular, setProCelular] = useState('');
    const [proEmail, setProEmail] = useState('');
    const [proAssunto, setProAssunto] = useState('');
    const [proContatoPj, setProContatoPj] = useState('');
    const [generos, setGeneros] = useState([]);
    const [areas, setAreas] = useState([]);
    const [tipoIniciativaVisivel, setTipoIniciativaVisivel] = useState(false);
    const [matriculaVisivel, setMatriculaVisivel] = useState(false);
    const [nomeVisivel, setNomeVisivel] = useState(false);
    const [dadosServidorPublico, setDadosServidorPublico] = useState(false);
    const [emailVisivel, setEmailVisivel] = useState(false);
    const [cnpjVisivel, setCnpjVisivel] = useState(false);
    const [areaVisivel, setAreaVisivel] = useState(false);
    const [assuntoVisivel, setAssuntoVisivel] = useState(false);

    const formRef = useRef(null);
    const somenteNumeros = /^[0-9\b]+$/;

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
        setTiposProcesso([]);
        setGenId('');
        setTprId('');
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
            if (codGenId === '') {
                iniciaTipoProcesso();
            } else {
                setTiposProcesso(data);
                setGenId(codGenId);
                setTprId('');
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

    function handleProId(e) {
        setProId(e.target.value);
    }

    function handleAreaId(e) {
        setAreaId(parseInt(e.target.value, 10));
    }

    function handleTprId(e) {
        // demais processos
        if (e.target.value === 26) {
            setAssuntoVisivel(true);
        } else {
            setAssuntoVisivel(false);
        }
        setTprId(e.target.value);
    }

    function handleProNome(e) {
        setProNome(e.target.value);
    }

    function handleProContatoPj(e) {
        setProContatoPj(e.target.value);
    }

    function handleProAssunto(e) {
        setProAssunto(e.target.value);
    }

    function handleProMatricula(e) {
        if (e.target.value === '' || somenteNumeros.test(e.target.value)) {
            setProMatricula(e.target.value);
        }
    }

    function handleProCpf(e) {
        if (e.target.value === '' || somenteNumeros.test(e.target.value)) {
            setProCpf(e.target.value);
        }
    }

    function handleProCnpj(e) {
        if (e.target.value === '' || somenteNumeros.test(e.target.value)) {
            setProCnpj(e.target.value);
        }
    }

    function handleProFone(e) {
        setProFone(e.target.value);
    }

    function handleProCelular(e) {
        setProCelular(e.target.value);
    }

    function handleProEmail(e) {
        setProEmail(e.target.value);
    }

    function limpaCamposIniciativa() {
        setProNome('');
        setProMatricula('');
        setProCpf('');
        setProCnpj('');
        setProFone('');
        setProCelular('');
        setProEmail('');
        setProAssunto('');
        setProContatoPj('');
        setProTipoIniciativa('');
    }

    function carregaTipoIniciativa(e) {
        limpaCamposIniciativa();
        iniciaTipoProcesso();
        setErro('');
        const iniciativa = e.target.value;
        if (iniciativa !== '') {
            const comboTipoIniciativa = [];
            setTipoIniciativaVisivel(true);
            setProIniciativa(iniciativa);
            if (iniciativa === 'Interna') {
                comboTipoIniciativa.push({
                    label: 'Servidor Público',
                    value: 'Servidor Público',
                });
                comboTipoIniciativa.push({
                    label: 'Áreas',
                    value: 'Áreas',
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
            setProIniciativa(iniciativa);
        }
    }

    function carregaDadosIniciativa(e) {
        limpaCamposIniciativa();
        iniciaTipoProcesso();
        setErro('');
        const tipoIniciativa = e.target.value;
        if (tipoIniciativa !== '') {
            setProTipoIniciativa(tipoIniciativa);
            if (tipoIniciativa === 'Servidor Público') {
                setMatriculaVisivel(true);
                setNomeVisivel(true);
                setDadosServidorPublico(true);
                setEmailVisivel(true);
                setCnpjVisivel(false);
                setAreaVisivel(false);
                setAssuntoVisivel(false);
            }
            if (tipoIniciativa === 'Áreas') {
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
            setProTipoIniciativa(tipoIniciativa);
        }
    }

    function criaProcesso() {
        setErro('');
        if (proIniciativa === undefined || proIniciativa === '') {
            setErro('Selecione a iniciativa.');
            return;
        }
        if (proTipoIniciativa === undefined || proTipoIniciativa === '') {
            setErro('Selecione o tipo de iniciativa.');
            return;
        }
        if (proIniciativa === 'Interna') {
            if (proTipoIniciativa === 'Servidor Público') {
                let erros = '';
                if (proNome.trim() === '') {
                    erros = `${erros}Nome obrigatório.<br />`;
                }
                if (
                    proCpf.trim() === '' &&
                    proFone.trim() === '' &&
                    proCelular.trim() === '' &&
                    proEmail.trim() === ''
                ) {
                    erros = `${erros}Pelo menos um campo (Cpf, Fone, Celular, E-mail) deve ser preenchido.`;
                }
                if (erros !== '') {
                    setErro(erros);
                    return;
                }
                if (proCpf.trim() !== '') {
                    if (!cpf(proCpf.trim())) {
                        setErro('Cpf inválido.');
                        return;
                    }
                }
                if (genId === '') {
                    setErro('Selecione o gênero.');
                    return;
                }
                if (tprId === '') {
                    setErro('Selecione o tipo do processo.');
                    return;
                }
            }
            if (proTipoIniciativa === 'Áreas') {
                if (areaId === '') {
                    setErro('Selecione a área.');
                    return;
                }
                if (genId === '') {
                    setErro('Selecione o gênero.');
                    return;
                }
                if (tprId === '') {
                    setErro('Selecione o tipo do processo.');
                    return;
                }
            }
        }
        if (proIniciativa === 'Externa') {
            if (proTipoIniciativa === 'Pessoa Física') {
                let erros = '';
                if (proNome.trim() === '') {
                    erros += 'Nome obrigatório.<br />';
                }
                if (
                    proCpf.trim() === '' &&
                    proFone.trim() === '' &&
                    proCelular.trim() === '' &&
                    proEmail.trim() === ''
                ) {
                    erros = `${erros}Pelo menos um campo (Cpf, Fone, Celular, E-mail) deve ser preenchido.`;
                }
                if (erros !== '') {
                    setErro(erros);
                    return;
                }
                if (proCpf.trim() !== '') {
                    if (!cpf(proCpf.trim())) {
                        setErro('Cpf inválido.');
                        return;
                    }
                }
                if (genId === '') {
                    setErro('Selecione o gênero.');
                    return;
                }
                if (tprId === '') {
                    setErro('Selecione o tipo do processo.');
                    return;
                }
            }
            if (proTipoIniciativa === 'Pessoa Jurídica') {
                let erros = '';
                if (proNome.trim() === '') {
                    erros += 'Nome obrigatório.<br />';
                }
                if (proContatoPj.trim() === '') {
                    erros = `${erros}Nome do responsável obrigatório.<br />`;
                }
                if (proCnpj.trim() === '') {
                    erros = `${erros}Cnpj obrigatório.<br />`;
                }
                if (proFone.trim() === '' && proCelular.trim() === '' && proEmail.trim() === '') {
                    erros = `${erros}Pelo menos um campo (Fone, Celular, E-mail) deve ser preenchido.`;
                }
                if (erros !== '') {
                    setErro(erros);
                    return;
                }
                if (proCnpj.trim() !== '') {
                    if (!cnpj(proCnpj.trim())) {
                        setErro('Cnpj inválido.');
                        return;
                    }
                }
                if (genId === '') {
                    setErro('Selecione o gênero.');
                    return;
                }
                if (tprId === '') {
                    setErro('Selecione o tipo do processo.');
                    return;
                }
            }
        }

        axios({
            method: 'POST',
            url: '/processo',
            data: {
                pro_id: null,
                pro_nome: proNome,
                pro_matricula: proMatricula,
                pro_cpf: proCpf,
                pro_cnpj: proCnpj,
                pro_fone: proFone,
                pro_celular: proCelular,
                pro_email: proEmail,
                pro_encerramento: null,
                pro_assunto: proAssunto,
                usu_autuador: sessionStorage.getItem('usuario'),
                pro_ultimo_tramite: null,
                usu_finalizador: null,
                usu_alteracao: sessionStorage.getItem('usuario'),
                nod_id: sessionStorage.getItem('areaUsuario'),
                set_id_autuador: sessionStorage.getItem('setorUsuario'),
                area_id: parseInt(sessionStorage.getItem('areaUsuario'), 10),
                set_id_finalizador: null,
                pro_iniciativa: proIniciativa,
                pro_tipo_iniciativa: proTipoIniciativa,
                area_id_iniciativa: areaId,
                tpr_id: tprId,
                pro_contato_pj: proContatoPj,
            },
            headers: {
                authorization: sessionStorage.getItem('token'),
            },
        })
            .then(res => {
                history.push(`/dados-processo/${res.data.pro_id}`);
                mensagem.success('Processo criado com sucesso.');
            })
            .catch(() => {
                setErro('Erro ao inserir processo.');
            });
    }

    function localiza() {
        if (proMatricula.trim() === '') {
            setErro('Digite a matrícula.');
            return;
        }
        setProNome('');
        setProCpf('');
        setProCnpj('');
        setProFone('');
        setProCelular('');
        setProEmail('');
        setProAssunto('');
        setProContatoPj('');
        setErro('');
        axios({
            method: 'GET',
            url: `/dados-pessoa/${proMatricula}`,
            headers: {
                authorization: sessionStorage.getItem('token'),
            },
        })
            .then(res => {
                if (res.data === null) {
                    setProMatricula('');
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
                    setProNome(res.data.pes_nome);
                    setProCpf(res.data.pes_cpf);
                    setProFone(res.data.fone);
                    setProCelular(res.data.pes_celular);
                    setProEmail(res.data.pes_email);
                }
            })
            .catch(() => {
                setErro('Erro ao carregar dados de pessoa.');
            });
    }

    return (
        <DefaultLayout>
            <Container>
                <Autorizacao tela="Criar processo" />
                <Main>
                    <Erro dangerouslySetInnerHTML={{ __html: erro }} />
                    <Form ref={formRef}>
                        <input id="proId" value={proId} onChange={handleProId} type="hidden" />
                        <ContainerIniciativa>
                            <Iniciativa
                                name="selectIniciativa"
                                val={proIniciativa}
                                changeHandler={carregaTipoIniciativa}
                            />
                            {tipoIniciativaVisivel ? (
                                <Select
                                    id="selectTipoIniciativa"
                                    name="selectTipoIniciativa"
                                    label="Tipo da iniciativa"
                                    options={tiposIniciativa}
                                    onChange={carregaDadosIniciativa}
                                />
                            ) : null}
                            {matriculaVisivel ? (
                                <ContainerMatricula>
                                    <Input
                                        name="proMatricula"
                                        label="Matrícula"
                                        type="text"
                                        value={proMatricula}
                                        onChange={handleProMatricula}
                                        size="5"
                                        maxLength="5"
                                    />
                                    <Localizar
                                        name="btnLocaliza"
                                        clickHandler={() => {
                                            localiza();
                                        }}
                                    />
                                </ContainerMatricula>
                            ) : null}
                            {areaVisivel ? (
                                <Select
                                    name="selectArea"
                                    label="Área"
                                    options={areas}
                                    onChange={handleAreaId}
                                />
                            ) : null}
                        </ContainerIniciativa>
                        {nomeVisivel ? (
                            <ContainerNome>
                                <Input
                                    name="proNome"
                                    label="Nome"
                                    type="text"
                                    value={proNome}
                                    onChange={handleProNome}
                                    size="100"
                                    maxLength="100"
                                />
                            </ContainerNome>
                        ) : null}
                        {dadosServidorPublico ? (
                            <ContainerDadosServidorPublico>
                                <Input
                                    name="proCpf"
                                    label="Cpf"
                                    type="text"
                                    value={proCpf}
                                    onChange={handleProCpf}
                                    size="10"
                                    maxLength="11"
                                />
                                <Input
                                    name="proFone"
                                    label="Fone"
                                    type="text"
                                    value={proFone}
                                    onChange={handleProFone}
                                    size="30"
                                    maxLength="31"
                                />
                                <Input
                                    name="proCelular"
                                    label="Celular"
                                    type="text"
                                    value={proCelular}
                                    onChange={handleProCelular}
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
                                        value={proContatoPj}
                                        onChange={handleProContatoPj}
                                        size="100"
                                        maxLength="100"
                                    />
                                </ContainerNome>
                                <ContainerDadosServidorPublico>
                                    <Input
                                        name="proCnpj"
                                        label="Cnpj"
                                        type="text"
                                        value={proCnpj}
                                        onChange={handleProCnpj}
                                        size="12"
                                        maxLength="14"
                                    />
                                    <Input
                                        name="proFone"
                                        label="Fone"
                                        type="text"
                                        value={proFone}
                                        onChange={handleProFone}
                                        size="30"
                                        maxLength="30"
                                    />
                                    <Input
                                        name="proCelular"
                                        label="Celular"
                                        type="text"
                                        value={proCelular}
                                        onChange={handleProCelular}
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
                                    value={proEmail}
                                    onChange={handleProEmail}
                                    size="101"
                                    maxLength="100"
                                />
                            </ContainerNome>
                        ) : null}
                        <ContainerCriaProcesso>
                            <Select
                                name="selectGenero"
                                label="Gênero"
                                options={generos}
                                onChange={selecionaTipoProcesso}
                            />
                            <Select
                                name="selectTiposProcesso"
                                label="Tipo do processo"
                                options={tiposProcesso}
                                onChange={handleTprId}
                            />
                        </ContainerCriaProcesso>
                        {assuntoVisivel ? (
                            <ContainerAssunto>
                                <TextArea
                                    name="proAssunto"
                                    label="Assunto"
                                    rows={30}
                                    cols={100}
                                    value={proAssunto}
                                    onChange={handleProAssunto}
                                />
                            </ContainerAssunto>
                        ) : null}
                    </Form>
                    <CriaProcesso name="btnCriaProcesso" clickHandler={criaProcesso} />
                </Main>
            </Container>
        </DefaultLayout>
    );
}

export default CriarProcesso;
