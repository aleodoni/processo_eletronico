import React, { useState, useEffect, useRef } from 'react';
import { toast as mensagem } from 'react-toastify';
import { Form } from '@unform/web';
import { useHistory } from 'react-router';
import * as Yup from 'yup';
import Autorizacao from '../../components/Autorizacao';
import PesquisaProcesso from '../../components/PesquisaProcesso';
import api from '../../service/api';
import axios from '../../configs/axiosConfig';
import DefaultLayout from '../_layouts/default';
import Input from '../../components/layout/Input';
import ProcessoInputMask from '../../components/layout/InputMask/ProcessoInputMask';
import InputMask from '../../components/layout/InputMask';
import CpfInputMask from '../../components/layout/InputMask/CpfInputMask';
import CnpjInputMask from '../../components/layout/InputMask/CnpjInputMask';
import Select from '../../components/layout/Select';
import Localizar from '../../components/layout/button/Localizar';
import Pesquisar from '../../components/layout/button/Pesquisa';
import Limpar from '../../components/layout/button/Limpar';
import ConsultarOutro from '../../components/layout/button/ConsultarOutro';
import ButtonContainer from '../../components/layout/button/ButtonContainer';
import { cpf, cnpj, dataValida, dataFinalMaior } from '../../utils/validaCpfCnpj';
import {
    Container,
    ContainerConsultaProcesso,
    ContainerPesquisa,
    ContainerPesquisa1,
    ContainerPesquisa2,
    ContainerPesquisa3,
    Main,
    Erro,
    Titulo,
} from './styles';

require('dotenv').config();

function ConsultarProcesso() {
    const history = useHistory();
    const [erro, setErro] = useState('');
    const [tiposProcesso, setTiposProcesso] = useState([]);
    const [areaAtual, setAreaAtual] = useState([]);
    const [areaIniciativa, setAreaIniciativa] = useState([]);
    const [mostraForm, setMostraForm] = useState(true);
    const [totalProcessos, setTotalProcessos] = useState(0);
    const [mostraPesquisa, setMostraPesquisa] = useState(false);
    const [pesquisaProcessos, setPesquisaProcessos] = useState([]);

    const processo = {
        proCodigo: '',
    };

    const processoPesquisa = {
        proMatricula: '',
        proNome: '',
        proContatoPj: '',
        proCpf: '',
        proCnpj: '',
        proDataIniAutuacao: '',
        proDataFimAutuacao: '',
        proNumero: '',
        proAno: '',
        tprId: '-1',
        areaId: '-1',
        areaIdIniciativa: '-1',
    };

    const formRef = useRef(null);
    const formRefPesquisa = useRef(null);

    async function localiza({ proCodigo }) {
        try {
            const schema = Yup.object().shape({
                proCodigo: Yup.string().required('Código é obrigatório'),
            });

            await schema.validate({ proCodigo }, { abortEarly: false });

            axios({
                method: 'POST',
                url: '/processo-por-codigo',
                data: { proCodigo },
                headers: {
                    authorization: sessionStorage.getItem('token'),
                },
            })
                .then(res => {
                    if (res.data === null) {
                        setErro('Código inválido ou inexistente.');
                        return;
                    }
                    history.push(`/dados-processo/${res.data.pro_id}`);
                })
                .catch(() => {
                    setErro('Erro ao localizar registro.');
                });
        } catch (err) {
            const validationErrors = {};

            if (err instanceof Yup.ValidationError) {
                err.inner.forEach(error => {
                    validationErrors[error.path] = error.message;
                });
            }
            setErro(validationErrors.proCodigo);
        }
    }

    async function carregaTipoProcesso() {
        api.defaults.headers.Authorization = sessionStorage.getItem('token');

        try {
            const response = await api.get(`/tipos-de-processo`);

            const data = response.data.map(tipoProcesso => {
                return {
                    label: tipoProcesso.tpr_nome,
                    value: tipoProcesso.tpr_id,
                };
            });
            setTiposProcesso(data);
        } catch (err) {
            mensagem.error(`Falha na autenticação - ${err}`);
        }
    }

    async function carregaAreaAtual() {
        api.defaults.headers.Authorization = sessionStorage.getItem('token');

        try {
            const response = await api.get('/area-combo');

            const data = response.data.map(area => {
                return {
                    label: area.set_nome,
                    value: area.set_id,
                };
            });
            setAreaAtual(data);
        } catch (err) {
            mensagem.error(`Falha na autenticação - ${err}`);
        }
    }

    async function carregaAreaIniciativa() {
        api.defaults.headers.Authorization = sessionStorage.getItem('token');

        try {
            const response = await api.get('/area-combo');

            const data = response.data.map(area => {
                return {
                    label: area.set_nome,
                    value: area.set_id,
                };
            });
            setAreaIniciativa(data);
        } catch (err) {
            mensagem.error(`Falha na autenticação - ${err}`);
        }
    }

    useEffect(() => {
        async function carrega() {
            await carregaTipoProcesso();
            await carregaAreaAtual();
            await carregaAreaIniciativa();
        }
        carrega();
    }, []);

    function limpaCampos() {
        formRefPesquisa.current.setFieldValue('proMatricula', '');
        formRefPesquisa.current.setFieldValue('proNome', '');
        formRefPesquisa.current.setFieldValue('proContatoPj', '');
        formRefPesquisa.current.setFieldValue('proCpf', '');
        formRefPesquisa.current.setFieldValue('proCnpj', '');
        formRefPesquisa.current.setFieldValue('proDataIniAutuacao', '');
        formRefPesquisa.current.setFieldValue('proDataFimAutuacao', '');
        formRefPesquisa.current.setFieldValue('proNumero', '');
        formRefPesquisa.current.setFieldValue('proAno', '');
        formRefPesquisa.current.setFieldValue('tprId', '-1');
        formRefPesquisa.current.setFieldValue('areaId', '-1');
        formRefPesquisa.current.setFieldValue('areaIdIniciativa', '-1');
        document.getElementById('proDataIniAutuacao').value = '';
        document.getElementById('proDataFimAutuacao').value = '';
        document.getElementById('proNumero').value = '';
        document.getElementById('proMatricula').value = '';
        document.getElementById('proAno').value = '';
        document.getElementById('proCpf').value = '';
        document.getElementById('proCnpj').value = '';
        setErro('');
    }

    function pesquisa({
        proMatricula,
        proNome,
        proContatoPj,
        proCpf,
        proCnpj,
        proDataIniAutuacao,
        proDataFimAutuacao,
        proNumero,
        proAno,
        tprId,
        areaId,
        areaIdIniciativa,
    }) {
        setErro('');

        if (proAno !== '' && proAno !== undefined) {
            const ano = Number(proAno);
            if (ano < 2015 || ano > 2050) {
                setErro('Ano inválido.');
                return;
            }
        }

        let proDataIniAutuacaoPesquisa;
        let proDataFimAutuacaoPesquisa;

        if (proDataIniAutuacao !== '' && proDataIniAutuacao !== undefined) {
            if (dataValida(proDataIniAutuacao)) {
                proDataIniAutuacaoPesquisa = `${proDataIniAutuacao} 00:00:00`;
            } else {
                setErro('Data inicial de autuação inválida.');
                return;
            }
        }
        if (proDataFimAutuacao !== '' && proDataFimAutuacao !== undefined) {
            if (dataValida(proDataFimAutuacao)) {
                proDataFimAutuacaoPesquisa = `${proDataFimAutuacao} 23:59:59`;
            } else {
                setErro('Data final de autuação inválida.');
                return;
            }
        }

        if (
            proDataIniAutuacao !== '' &&
            proDataIniAutuacao !== undefined &&
            proDataFimAutuacao !== '' &&
            proDataFimAutuacao !== undefined
        ) {
            if (dataValida(proDataIniAutuacao) && dataValida(proDataFimAutuacao)) {
                if (dataFinalMaior(proDataIniAutuacao, proDataFimAutuacao)) {
                    setErro('Data inicial maior que data final.');
                    return;
                }
            } else {
                setErro('Data inicial ou final de autuação inválida.');
                return;
            }
        }

        if (proCpf !== '' && proCpf !== undefined && !cpf(proCpf.replace(/[^\d]+/g, ''))) {
            setErro('Cpf inválido.');
            return;
        }
        if (proCpf !== '' && proCnpj !== undefined && !cnpj(proCnpj.replace(/[^\d]+/g, ''))) {
            setErro('Cnpj inválido.');
            return;
        }
        axios({
            method: 'POST',
            url: '/pesquisa-processo',
            data: {
                pro_matricula: proMatricula,
                pro_nome: proNome,
                pro_contato_pj: proContatoPj,
                pro_cpf: proCpf,
                pro_cnpj: proCnpj,
                pro_data_ini_autuacao: proDataIniAutuacaoPesquisa,
                pro_data_fim_autuacao: proDataFimAutuacaoPesquisa,
                pro_numero: proNumero,
                pro_ano: proAno,
                tpr_id: tprId,
                area_id: areaId,
                area_id_iniciativa: areaIdIniciativa,
            },
            headers: {
                authorization: sessionStorage.getItem('token'),
            },
        })
            .then(res => {
                if (res.data.length === 0) {
                    mensagem.info('Sem registros para retornar.');
                } else {
                    mensagem.success('Carregando processo(s)...');
                    setTotalProcessos(res.data.length);
                    setMostraForm(false);
                    setMostraPesquisa(true);
                    setPesquisaProcessos(res.data);
                }
            })
            .catch(erroPesquisa => {
                if (
                    erroPesquisa.response.data.error ===
                    'Selecione pelo menos um campo para pesquisa.'
                ) {
                    setErro('Selecione pelo menos um campo para pesquisa.');
                } else {
                    setErro('Erro ao efetuar pesquisa.');
                }
            });
    }

    function retornaProcesso(linha) {
        history.push(`/dados-processo/${linha.pro_id}`);
    }

    function consulta() {
        setMostraForm(true);
        setMostraPesquisa(false);
    }

    return (
        <DefaultLayout>
            <Container>
                <Autorizacao tela="Consultar processo" />
                <Main>
                    <Titulo>
                        <p>Consultar processos</p>
                        <hr />
                    </Titulo>
                    {mostraForm ? (
                        <div>
                            <Form ref={formRef} initialData={processo} onSubmit={localiza}>
                                <ContainerConsultaProcesso>
                                    <ProcessoInputMask
                                        name="proCodigo"
                                        label="Digite o código"
                                        autoFocus
                                    />
                                    <Localizar name="btnConsultaProcesso" type="submit" />
                                    <div>
                                        <Erro>{erro}</Erro>
                                    </div>
                                </ContainerConsultaProcesso>
                            </Form>
                            <hr />
                            <Form
                                ref={formRefPesquisa}
                                initialData={processoPesquisa}
                                onSubmit={pesquisa}>
                                <ContainerPesquisa>
                                    <InputMask
                                        name="proNumero"
                                        label="Número"
                                        mask="99999"
                                        maskChar=" "
                                    />
                                    <InputMask name="proAno" label="Ano" mask="9999" maskChar=" " />
                                    <Select
                                        name="tprId"
                                        label="Tipo do processo"
                                        options={tiposProcesso}
                                    />
                                </ContainerPesquisa>
                                <ContainerPesquisa1>
                                    <Select name="areaId" label="Área atual" options={areaAtual} />
                                    <Select
                                        name="areaIdIniciativa"
                                        label="Área da iniciativa"
                                        options={areaIniciativa}
                                    />
                                </ContainerPesquisa1>
                                <ContainerPesquisa2>
                                    <InputMask
                                        name="proDataIniAutuacao"
                                        label="Data inicial de autuação"
                                        mask="99/99/9999"
                                        maskChar=" "
                                    />
                                    <InputMask
                                        name="proDataFimAutuacao"
                                        label="Data final de autuação"
                                        mask="99/99/9999"
                                        maskChar=" "
                                    />
                                    <InputMask
                                        name="proMatricula"
                                        label="Matrícula"
                                        mask="99999"
                                        maskChar=" "
                                    />
                                    <CpfInputMask name="proCpf" label="Cpf" />
                                    <CnpjInputMask name="proCnpj" label="Cnpj" />
                                </ContainerPesquisa2>
                                <ContainerPesquisa3>
                                    <Input
                                        name="proNome"
                                        label="Nome"
                                        type="text"
                                        size={100}
                                        maxLength="100"
                                    />
                                    <Input
                                        name="proContatoPj"
                                        label="Contato Pessoa Jurídica"
                                        type="text"
                                        size={100}
                                        maxLength="100"
                                    />
                                </ContainerPesquisa3>
                                <hr />
                                <ButtonContainer>
                                    <Pesquisar name="btnPesquisa" clickHandler={() => pesquisa} />
                                    <Limpar name="btnLimpa" clickHandler={limpaCampos} />
                                </ButtonContainer>
                            </Form>
                        </div>
                    ) : null}
                    {mostraPesquisa ? (
                        <div>
                            <p>Total de processo(s): {totalProcessos}</p>
                            <ButtonContainer>
                                <ConsultarOutro name="btnConsulta" clickHandler={consulta} />
                            </ButtonContainer>
                            <PesquisaProcesso
                                columns={[
                                    { title: 'Código', field: 'pro_codigo', width: 100 },
                                    { title: 'Tipo', field: 'tpr_nome', width: 450 },
                                    {
                                        title: 'Tipo da iniciativa',
                                        field: 'pro_tipo_iniciativa',
                                        width: 150,
                                    },
                                    {
                                        title: 'Área atual',
                                        field: 'area_atual_processo',
                                        width: 320,
                                    },
                                ]}
                                data={pesquisaProcessos}
                                fillData={retornaProcesso}
                            />
                        </div>
                    ) : null}
                </Main>
            </Container>
        </DefaultLayout>
    );
}

export default ConsultarProcesso;
