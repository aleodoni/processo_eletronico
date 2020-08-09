import React, { useState, useRef } from 'react';
import { Form } from '@unform/web';
import { useHistory } from 'react-router';
import { toast as mensagem } from 'react-toastify';
import { FaSearch } from 'react-icons/fa';
import axios from '../../configs/axiosConfig';
import InputMask from '../../components/layout/InputMask';
import Input from '../../components/layout/Input';
import Autorizacao from '../../components/Autorizacao';
import * as constantes from '../../utils/constantes';
import { cpf } from '../../utils/validaCpfCnpj';
import {
    Container,
    Main,
    Erro,
    Titulo,
    BotaoProcura,
    ContainerMatricula,
    ContainerDadosServidorPublico,
    ContainerNome,
    ContainerEmail,
} from './styles';
import CriaProcesso from '../../components/layout/button/CriaProcesso';
import Limpar from '../../components/layout/button/Limpar';
import DefaultLayout from '../_layouts/default';
import ButtonContainer from '../../components/layout/button/ButtonContainer';

function CriarProcessoAposentadoriaAdm() {
    const history = useHistory();
    const [erro, setErro] = useState('');
    const [dadosServidorPublico, setDadosServidorPublico] = useState(false);
    const [processo, setProcesso] = useState({
        proId: undefined,
        genId: constantes.GEN_REQUERIMENTOS_RH,
        areaId: constantes.AREA_DARH,
        tprId: constantes.TPR_APOSENTADORIA_INICIATIVA_ADM,
        proIniciativa: 'Interna',
        proTipoIniciativa: 'Servidor Público',
        proNome: '',
        proMatricula: '',
        proCpf: '',
        proFone: '',
        proCelular: '',
        proEmail: '',
    });
    const formRef = useRef(null);

    function criaProcesso() {
        const p = formRef.current.getData();
        setErro('');
        let erros = '';
        if (p.proMatricula.trim() === '') {
            erros += 'Matrícula obrigatória.<br />';
        }
        if (p.proNome.trim() === '') {
            erros += 'Nome obrigatório.<br />';
        }

        if (p.proCpf.trim() !== '') {
            if (!cpf(p.proCpf.trim().replace(/[^\d]+/g, ''))) {
                setErro('Cpf inválido.');
                return;
            }
        }
        if (erros !== '') {
            setErro(erros);
            return;
        }

        let cpfNumeros;
        if (p.proCpf !== '' && p.proCpf !== undefined) {
            cpfNumeros = p.proCpf.replace(/[^\d]+/g, '');
        }

        axios({
            method: 'POST',
            url: '/processo',
            data: {
                pro_id: null,
                pro_nome: p.proNome,
                pro_matricula: p.proMatricula,
                pro_cpf: cpfNumeros,
                pro_fone: p.proFone,
                pro_celular: p.proCelular,
                pro_email: p.proEmail,
                pro_encerramento: null,
                pro_assunto: null,
                usu_autuador: sessionStorage.getItem('usuario'),
                pro_ultimo_tramite: null,
                usu_finalizador: null,
                nod_id: null,
                set_id_autuador: sessionStorage.getItem('setorUsuario'),
                area_id: constantes.AREA_DARH,
                set_id_finalizador: null,
                pro_iniciativa: 'Interna',
                pro_tipo_iniciativa: 'Servidor Público',
                area_id_iniciativa: constantes.AREA_DARH,
                tpr_id: constantes.TPR_APOSENTADORIA_INICIATIVA_ADM,
                pro_autuacao: null,
                pro_recurso: false,
                pro_com_abono: false,
                pro_num_com_abono: null,
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
                    setErro(erroCria.response.data.error);
                } else {
                    setErro('Erro ao inserir processo.');
                }
            });
    }

    function limpaCampos() {
        formRef.current.reset();
        setErro('');
        setProcesso({
            proMatricula: '',
            proNome: '',
            proCpf: '',
            proFone: '',
            proCelular: '',
            proEmail: '',
        });
        setDadosServidorPublico(false);
    }

    function localiza() {
        setErro('');
        const matricula = formRef.current.getFieldValue('proMatricula');
        if (matricula.trim() === '') {
            setErro('Digite a matrícula.');
            return;
        }
        setProcesso({
            proMatricula: '',
            proNome: '',
            proCpf: '',
            proFone: '',
            proCelular: '',
            proEmail: '',
            proAssunto: '',
        });
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
                    setProcesso({
                        proNome: res.data.pes_nome,
                        proCpf: res.data.pes_cpf,
                        proFone: res.data.fone,
                        proCelular: res.data.pes_celular,
                        proEmail: res.data.pes_email,
                    });
                    setDadosServidorPublico(true);
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
                    <Titulo>
                        <p>Criar processo de aposentadoria por iniciativa da administração</p>
                        <hr />
                    </Titulo>
                    <Erro dangerouslySetInnerHTML={{ __html: erro }} />
                    <Form ref={formRef} initialData={processo} onSubmit={criaProcesso}>
                        <Input name="proId" type="hidden" />
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
                        {dadosServidorPublico ? (
                            <>
                                <ContainerNome>
                                    <Input
                                        name="proNome"
                                        label="Nome"
                                        type="text"
                                        size="100"
                                        maxLength="100"
                                    />
                                </ContainerNome>
                                <ContainerDadosServidorPublico>
                                    <InputMask
                                        name="proCpf"
                                        label="Cpf"
                                        mask="999.999.999-99"
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

                                    <ContainerEmail>
                                        <Input
                                            name="proEmail"
                                            label="E-mail"
                                            type="text"
                                            size="101"
                                            maxLength="100"
                                        />
                                    </ContainerEmail>
                                </ContainerDadosServidorPublico>
                                <br />
                                <ButtonContainer>
                                    <CriaProcesso name="btnCriaProcesso" />
                                    <Limpar name="btnLimpa" clickHandler={limpaCampos} />
                                </ButtonContainer>
                            </>
                        ) : null}
                    </Form>
                </Main>
            </Container>
        </DefaultLayout>
    );
}

export default CriarProcessoAposentadoriaAdm;
