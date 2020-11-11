import React, { useState, useRef } from 'react';
import { Form } from '@unform/web';
import { useHistory } from 'react-router';
import { toast as mensagem } from 'react-toastify';
import axios from '../../configs/axiosConfig';
import Input from '../../components/layout/Input';
import Autorizacao from '../../components/Autorizacao';
import * as constantes from '../../utils/constantes';
import { Container, Main, Erro, Titulo, ContainerNome, ContainerAssunto } from './styles';
import CriaProcesso from '../../components/layout/button/CriaProcesso';
import TextArea from '../../components/layout/TextArea';
import Limpar from '../../components/layout/button/Limpar';
import DefaultLayout from '../_layouts/default';
import ButtonContainer from '../../components/layout/button/ButtonContainer';

function CriarProcessoLicitacao() {
    const history = useHistory();
    const [erro, setErro] = useState('');
    const [processo, setProcesso] = useState({
        proId: undefined,
        genId: constantes.GEN_EXECUCAO_DESPESAS,
        areaId: constantes.AREA_DAF,
        tprId: constantes.TPR_AQUISICAO_BENS_SERVICOS,
        proIniciativa: 'Interna',
        proTipoIniciativa: 'Diretorias',
        proNome: '',
        proAssunto: '',
    });
    const formRef = useRef(null);

    function criaProcesso() {
        const p = formRef.current.getData();
        setErro('');
        let erros = '';
        if (p.proNome.trim() === '') {
            erros += 'Nome obrigatório.<br />';
        }

        if (erros !== '') {
            setErro(erros);
            return;
        }

        axios({
            method: 'POST',
            url: '/processo',
            data: {
                pro_id: null,
                pro_nome: p.proNome,
                pro_encerramento: null,
                pro_assunto: p.proAssunto,
                usu_autuador: sessionStorage.getItem('usuario'),
                pro_ultimo_tramite: null,
                usu_finalizador: null,
                nod_id: null,
                gen_id: constantes.GEN_EXECUCAO_DESPESAS,
                set_id_autuador: sessionStorage.getItem('setorUsuario'),
                area_id: constantes.AREA_DAF,
                set_id_finalizador: null,
                pro_iniciativa: 'Interna',
                pro_tipo_iniciativa: 'Diretorias',
                area_id_iniciativa: constantes.AREA_DAF,
                tpr_id: constantes.TPR_AQUISICAO_BENS_SERVICOS,
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
            proNome: '',
            proAssunto: '',
        });
    }

    return (
        <DefaultLayout>
            <Container>
                <Autorizacao tela="Criar processo" />
                <Main>
                    <Titulo>
                        <p>Criar processo de Aquisição de Bens e/ou Contratação de Serviços</p>
                        <hr />
                    </Titulo>
                    <Erro dangerouslySetInnerHTML={{ __html: erro }} />
                    <Form ref={formRef} initialData={processo} onSubmit={criaProcesso}>
                        <Input name="proId" type="hidden" />
                        <ContainerNome>
                            <Input
                                name="proNome"
                                label="Nome"
                                type="text"
                                size="100"
                                maxLength="100"
                            />
                        </ContainerNome>
                        <ContainerAssunto>
                            <TextArea name="proAssunto" label="Assunto" rows={3} cols={300} />
                        </ContainerAssunto>
                        <br />
                        <ButtonContainer>
                            <CriaProcesso name="btnCriaProcesso" />
                            <Limpar name="btnLimpa" clickHandler={limpaCampos} />
                        </ButtonContainer>
                    </Form>
                </Main>
            </Container>
        </DefaultLayout>
    );
}

export default CriarProcessoLicitacao;
