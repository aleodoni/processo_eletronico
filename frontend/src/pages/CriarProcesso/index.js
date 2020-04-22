import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router';
import { FaFileAlt, FaSistrix } from 'react-icons/fa';
import { toast as mensagem } from 'react-toastify';
import { Container, AsideLeft, Main, ContainerAssunto, ContainerCriaProcesso, ContainerIniciativa, ContainerDadosServidorPublico, ContainerNome, Erro, TituloObrigatorio, TextoCamposArea, CustomSelect, CustomInput } from './styles';
import Header from '../../components/Header';
import Autorizacao from '../../components/Autorizacao';
import axios from '../../configs/axiosConfig';
import Menu from '../../components/Menu';

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

    function carregaGenero() {
        axios({
            method: 'GET',
            url: '/generos',
            headers: {
                authorization: sessionStorage.getItem('token'),
            },
        })
            .then(res => {
                const comboGenero = [];
                comboGenero.push(
                    <option key="" data-key="" value="">
                        Selecione...
                    </option>
                );
                for (let i = 0; i < res.data.length; i++) {
                    comboGenero.push(
                        <option key={res.data[i].gen_id} data-key={res.data[i].gen_id} value={res.data[i].gen_id}>
                            {res.data[i].gen_nome}
                        </option>
                    );
                }
                setGeneros(comboGenero);
            })
            .catch(() => {
                setErro('Erro ao carregar gêneros.');
            });
    }

    function iniciaTipoProcesso() {
        setTiposProcesso([]);
        setGenId('');
        setTprId('');
        const comboTipoProcesso = [];
        comboTipoProcesso.push(
            <option key="" data-key="" value="">
                Selecione...
            </option>
        );
        setTiposProcesso(comboTipoProcesso);
    }

    useEffect(() => {
        async function carrega() {
            carregaGenero();
            iniciaTipoProcesso();
        }
        carrega();
    }, []);

    function onSelect(e) {
        const { selectedIndex } = e.target.options;
        const codGenId = e.target.options[selectedIndex].getAttribute('data-key');
        axios({
            method: 'GET',
            url: `/tipos-de-processo/${codGenId}`,
            headers: {
                authorization: sessionStorage.getItem('token'),
            },
        })
            .then(res => {
                const comboTipoProcesso = [];
                comboTipoProcesso.push(
                    <option key="" value="">
                        Selecione...
                    </option>
                );
                for (let i = 0; i < res.data.length; i++) {
                    comboTipoProcesso.push(
                        <option key={res.data[i].tpr_id} value={res.data[i].tpr_id}>
                            {res.data[i].tpr_nome}
                        </option>
                    );
                }

                if (codGenId === '') {
                    iniciaTipoProcesso();
                } else {
                    setTiposProcesso(comboTipoProcesso);
                    setGenId(codGenId);
                    setTprId('');
                }
            })
            .catch(() => {
                setErro('Erro ao carregar tipos de processo.');
            });
    }

    function carregaArea() {
        axios({
            method: 'GET',
            url: '/area',
            headers: {
                authorization: sessionStorage.getItem('token'),
            },
        })
            .then(res => {
                const comboArea = [];
                comboArea.push(
                    <option key="" data-key="" value="">
                        Selecione...
                    </option>
                );
                for (let i = 0; i < res.data.length; i++) {
                    comboArea.push(
                        <option key={res.data[i].set_id} data-key={res.data[i].set_id} value={res.data[i].set_id}>
                            {res.data[i].set_nome}
                        </option>
                    );
                }
                setAreas(comboArea);
            })
            .catch(() => {
                setErro('Erro ao carregar áreas.');
            });
    }

    function handleProId(e) {
        setProId(e.target.value);
    }

    function handleAreaId(e) {
        setAreaId(parseInt(e.target.value, 10));
    }

    function handleTprId(e) {
        if (e.target.value === '26') {
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
        const re = /^[0-9\b]+$/;
        if (e.target.value === '' || re.test(e.target.value)) {
            setProMatricula(e.target.value);
        }
    }

    function handleProCpf(e) {
        const re = /^[0-9\b]+$/;
        if (e.target.value === '' || re.test(e.target.value)) {
            setProCpf(e.target.value);
        }
    }

    function handleProCnpj(e) {
        const re = /^[0-9\b]+$/;
        if (e.target.value === '' || re.test(e.target.value)) {
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
        const { selectedIndex } = e.target.options;
        const iniciativa = e.target.options[selectedIndex].getAttribute('data-key');
        if (iniciativa !== '') {
            const comboTipoIniciativa = [];
            setTipoIniciativaVisivel(true);
            setProIniciativa(iniciativa);
            if (iniciativa === 'Interna') {
                comboTipoIniciativa.push(
                    <option key="" data-key="" value="">
                        Selecione...
                    </option>
                );
                comboTipoIniciativa.push(
                    <option key="Servidor Público" data-key="Servidor Público" value="Servidor Público">
                        Servidor Público
                    </option>
                );
                comboTipoIniciativa.push(
                    <option key="Diretorias" data-key="Diretorias" value="Diretorias">
                        Diretorias
                    </option>
                );
                setCnpjVisivel(false);
                setAreaVisivel(false);
                setMatriculaVisivel(false);
                setNomeVisivel(false);
                setDadosServidorPublico(false);
                setEmailVisivel(false);
                setAssuntoVisivel(false);
            }
            if (iniciativa === 'Externa') {
                comboTipoIniciativa.push(
                    <option key="" data-key="" value="">
                        Selecione...
                    </option>
                );
                comboTipoIniciativa.push(
                    <option key="Pessoa Física" data-key="Pessoa Física" value="Pessoa Física">
                        Pessoa Física
                    </option>
                );
                comboTipoIniciativa.push(
                    <option key="Pessoa Jurídica" data-key="Pessoa Jurídica" value="Pessoa Jurídica">
                        Pessoa Jurídica
                    </option>
                );
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
        const { selectedIndex } = e.target.options;
        const tipoIniciativa = e.target.options[selectedIndex].getAttribute('data-key');
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
            setProTipoIniciativa(tipoIniciativa);
        }
    }

    function testaCPF(cpf) {
        let soma;
        let resto;
        soma = 0;
        if (cpf === '00000000000') return false;

        for (let i = 1; i <= 9; i++) soma += parseInt(cpf.substring(i - 1, i), 10) * (11 - i);
        resto = (soma * 10) % 11;

        if (resto === 10 || resto === 11) resto = 0;
        if (resto !== parseInt(cpf.substring(9, 10), 10)) return false;

        soma = 0;
        for (let i = 1; i <= 10; i++) soma += parseInt(cpf.substring(i - 1, i), 10) * (12 - i);
        resto = (soma * 10) % 11;

        if (resto === 10 || resto === 11) resto = 0;
        if (resto !== parseInt(cpf.substring(10, 11), 10)) return false;
        return true;
    }

    function criaProcesso() {
        function testaCNPJ(cnpj) {
            cnpj = cnpj.replace(/[^\d]+/g, '');
            if (cnpj.length !== 14) return false;
            if (
                cnpj === '00000000000000' ||
                cnpj === '11111111111111' ||
                cnpj === '22222222222222' ||
                cnpj === '33333333333333' ||
                cnpj === '44444444444444' ||
                cnpj === '55555555555555' ||
                cnpj === '66666666666666' ||
                cnpj === '77777777777777' ||
                cnpj === '88888888888888' ||
                cnpj === '99999999999999'
            )
                return false;
            let tamanho = cnpj.length - 2;
            let numeros = cnpj.substring(0, tamanho);
            const digitos = cnpj.substring(tamanho);
            let soma = 0;
            let pos = tamanho - 7;
            for (let i = tamanho; i >= 1; i--) {
                soma += numeros.charAt(tamanho - i) * pos--;
                if (pos < 2) pos = 9;
            }
            let resultado = soma % 11 < 2 ? 0 : 11 - (soma % 11);
            if (resultado.toString() !== digitos.charAt(0)) return false;

            tamanho += 1;
            numeros = cnpj.substring(0, tamanho);
            soma = 0;
            pos = tamanho - 7;
            for (let i = tamanho; i >= 1; i--) {
                soma += numeros.charAt(tamanho - i) * pos--;
                if (pos < 2) pos = 9;
            }
            resultado = soma % 11 < 2 ? 0 : 11 - (soma % 11);
            if (resultado.toString() !== digitos.charAt(1)) return false;
            return true;
        }
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
                if (proCpf.trim() === '' && proFone.trim() === '' && proCelular.trim() === '' && proEmail.trim() === '') {
                    erros = `${erros}Pelo menos um campo (Cpf, Fone, Celular, E-mail) deve ser preenchido.`;
                }
                if (erros !== '') {
                    setErro(erros);
                    return;
                }
                if (proCpf.trim() !== '') {
                    if (!testaCPF(proCpf.trim())) {
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
            if (proTipoIniciativa === 'Diretorias') {
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
                if (proCpf.trim() === '' && proFone.trim() === '' && proCelular.trim() === '' && proEmail.trim() === '') {
                    erros = `${erros}Pelo menos um campo (Cpf, Fone, Celular, E-mail) deve ser preenchido.`;
                }
                if (erros !== '') {
                    setErro(erros);
                    return;
                }
                if (proCpf.trim() !== '') {
                    if (!testaCPF(proCpf.trim())) {
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
                    if (!testaCNPJ(proCnpj.trim())) {
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
        <>
            <Container>
                <Autorizacao tela="Criar processo" />
                <Header />
                <AsideLeft>
                    <Menu />
                </AsideLeft>
                <Main>
                    <fieldset>
                        <legend>Novo processo</legend>
                        <Erro dangerouslySetInnerHTML={{ __html: erro }} />
                        <form noValidate autoComplete="off">
                            <input id="proId" value={proId} onChange={handleProId} type="hidden" />
                            <ContainerIniciativa>
                                <fieldset>
                                    <legend>Iniciativa</legend>
                                    <CustomSelect id="selectIniciativa" onChange={carregaTipoIniciativa} value={proIniciativa}>
                                        <option key="" data-key="" value="">
                                            Selecione...
                                        </option>
                                        <option key="Interna" data-key="Interna" value="Interna">
                                            Interna
                                        </option>
                                        <option key="Externa" data-key="Externa" value="Externa">
                                            Externa
                                        </option>
                                    </CustomSelect>
                                </fieldset>
                                {tipoIniciativaVisivel ? (
                                    <fieldset>
                                        <legend>Tipo da iniciativa</legend>
                                        <CustomSelect id="selectTipoIniciativa" onChange={carregaDadosIniciativa} value={proTipoIniciativa}>
                                            {tiposIniciativa}
                                        </CustomSelect>
                                    </fieldset>
                                ) : null}
                                {matriculaVisivel ? (
                                    <fieldset>
                                        <legend>Matrícula</legend>
                                        <CustomInput id="proMatricula" name="proMatricula" value={proMatricula} onChange={handleProMatricula} type="text" size="5" maxLength="5" />
                                        &nbsp;&nbsp;
                                        <button type="button" id="btnLocaliza" variant="contained" color="primary" onClick={localiza}>
                                            <FaSistrix />
                                            &nbsp;Localizar
                                        </button>
                                    </fieldset>
                                ) : null}
                                {areaVisivel ? (
                                    <fieldset>
                                        <legend>Área</legend>
                                        <CustomSelect id="selectArea" value={areaId} onChange={handleAreaId}>
                                            {areas}
                                        </CustomSelect>
                                    </fieldset>
                                ) : null}
                            </ContainerIniciativa>
                            {nomeVisivel ? (
                                <ContainerNome>
                                    <fieldset>
                                        <legend>Nome</legend>
                                        <CustomInput id="proNome" name="proNome" value={proNome} onChange={handleProNome} type="text" size="100" maxLength="100" />
                                    </fieldset>
                                </ContainerNome>
                            ) : null}
                            {dadosServidorPublico ? (
                                <ContainerDadosServidorPublico>
                                    <fieldset>
                                        <legend>Cpf</legend>
                                        <CustomInput id="proCpf" name="proCpf" value={proCpf} onChange={handleProCpf} type="text" size="10" maxLength="11" />
                                    </fieldset>
                                    <fieldset>
                                        <legend>Fone</legend>
                                        <CustomInput id="proFone" name="proFone" value={proFone} onChange={handleProFone} type="text" size="30" maxLength="30" />
                                    </fieldset>
                                    <fieldset>
                                        <legend>Celular</legend>
                                        <CustomInput id="proCelular" name="proCelular" value={proCelular} onChange={handleProCelular} type="text" size="30" maxLength="30" />
                                    </fieldset>
                                </ContainerDadosServidorPublico>
                            ) : null}
                            {cnpjVisivel ? (
                                <div>
                                    <ContainerNome>
                                        <fieldset>
                                            <legend>Responsável</legend>
                                            <CustomInput id="proContatoPj" name="proContatoPj" value={proContatoPj} onChange={handleProContatoPj} type="text" size="100" maxLength="100" />
                                        </fieldset>
                                    </ContainerNome>
                                    <ContainerDadosServidorPublico>
                                        <fieldset>
                                            <legend>Cnpj</legend>
                                            <CustomInput id="proCnpj" name="proCnpj" value={proCnpj} onChange={handleProCnpj} type="text" size="12" maxLength="14" />
                                        </fieldset>
                                        <fieldset>
                                            <legend>Fone</legend>
                                            <CustomInput id="proFone" name="proFone" value={proFone} onChange={handleProFone} type="text" size="30" maxLength="30" />
                                        </fieldset>
                                        <fieldset>
                                            <legend>Celular</legend>
                                            <CustomInput id="proCelular" name="proCelular" value={proCelular} onChange={handleProCelular} type="text" size="30" maxLength="30" />
                                        </fieldset>
                                    </ContainerDadosServidorPublico>
                                </div>
                            ) : null}
                            {emailVisivel ? (
                                <ContainerNome>
                                    <fieldset>
                                        <legend>E-mail</legend>
                                        <CustomInput id="proEmail" name="proEmail" value={proEmail} onChange={handleProEmail} type="text" size="101" maxLength="100" />
                                    </fieldset>
                                </ContainerNome>
                            ) : null}
                            <ContainerCriaProcesso>
                                <fieldset>
                                    <legend>
                                        <TituloObrigatorio>Gênero</TituloObrigatorio>
                                    </legend>
                                    <CustomSelect id="selectGenero" onChange={onSelect} value={genId}>
                                        {generos}
                                    </CustomSelect>
                                </fieldset>
                                <fieldset>
                                    <legend>
                                        <TituloObrigatorio>Tipo do processo</TituloObrigatorio>
                                    </legend>
                                    <CustomSelect id="selectTiposProcesso" onChange={handleTprId} value={tprId}>
                                        {tiposProcesso}
                                    </CustomSelect>
                                </fieldset>
                            </ContainerCriaProcesso>
                            {assuntoVisivel ? (
                                <ContainerAssunto>
                                    <fieldset>
                                        <legend>Assunto</legend>
                                        <TextoCamposArea id="proAssunto" name="proAssunto" rows="3" cols="100" value={proAssunto} onChange={handleProAssunto} />
                                    </fieldset>
                                </ContainerAssunto>
                            ) : null}
                        </form>
                        <button type="button" id="btnCriaProcesso" onClick={criaProcesso}>
                            <FaFileAlt />
                            &nbsp;Criar processo
                        </button>
                    </fieldset>
                </Main>
            </Container>
        </>
    );
}

export default CriarProcesso;
