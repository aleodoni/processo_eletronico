import React, { useState, useEffect } from 'react';
import { FaRegSave, FaRegTrashAlt, FaSyncAlt, FaRegEdit } from 'react-icons/fa';
import MaterialTable from 'material-table';
import Check from '@material-ui/icons/Check';
import Clear from '@material-ui/icons/Clear';
import Snackbar from '@material-ui/core/Snackbar';
import Modal from '@material-ui/core/Modal';
import axios from '../../configs/axiosConfig';
import Autorizacao from '../../components/Autorizacao';
import Menu from '../../components/Menu';
import { tabelas } from '../../configs/tabelas';
import { Container, ContainerMenu1, ContainerMenu2, ContainerBotoes, AsideLeft, Main, Erro, ModalApaga, EstiloCheck } from './styles';
import Header from '../../components/Header';

function TelaMenu() {
    const [erro, setErro] = useState('');
    const [menId, setMenId] = useState(undefined);
    const [menIdPai, setMenIdPai] = useState('');
    const [menNome, setMenNome] = useState('');
    const [menUrl, setMenUrl] = useState('');
    const [telId, setTelId] = useState('');
    const [mmuId, setMmuId] = useState('');
    const [menOrdemPai, setMenOrdemPai] = useState('');
    const [telasMenu, setTelasMenu] = useState([]);
    const [menusPai, setMenusPai] = useState([]);
    const [telas, setTelas] = useState([]);
    const [modelos, setModelos] = useState([]);
    const [salva, setSalva] = useState(false);
    const [show, setShow] = useState(false);
    const [mensagemHint, setMensagemHint] = useState('');
    const [telInterna, setTelInterna] = useState(false);

    function handleMenId(e) {
        setMenId(e.target.value);
    }

    function handleMenIdPai(e) {
        setMenIdPai(e.target.value);
    }

    function handleTelInterna(e) {
        setTelInterna(e.target.checked);
    }

    function handleMenNome(e) {
        setMenNome(e.target.value);
    }

    function handleMenUrl(e) {
        setMenUrl(e.target.value);
    }

    function handleTelId(e) {
        setTelId(e.target.value);
    }

    function handleMmuId(e) {
        setMmuId(e.target.value);
    }

    function handleMenOrdemPai(e) {
        setMenOrdemPai(e.target.value);
    }

    function limpaCampos() {
        setMenId(undefined);
        setMenIdPai('');
        setMenNome('');
        setMenUrl('');
        setTelId('');
        setMmuId('');
        setMenOrdemPai('');
        setErro('');
        setTelInterna(false);
    }

    function preencheCampos(menId1, menIdPai1, menNome1, menUrl1, telId1, mmuId1, menOrdemPai1, telInterna1) {
        if (menIdPai1 === null) {
            menIdPai1 = '';
        }
        setMenId(menId1);
        setMenIdPai(menIdPai1);
        setMenNome(menNome1);
        setMenUrl(menUrl1);
        setTelId(telId1);
        setMmuId(mmuId1);
        setMenOrdemPai(menOrdemPai1);
        setTelInterna(telInterna1);
    }

    function carregaGrid() {
        axios({
            method: 'GET',
            url: '/tela-menu',
            headers: {
                authorization: sessionStorage.getItem('token'),
            },
        })
            .then(res => {
                setTelasMenu(res.data);
            })
            .catch(err => {
                console.log(err);
                setErro('Erro ao carregar registros.');
            });
    }

    function carregaPai() {
        axios({
            method: 'GET',
            url: '/menu-pai',
            headers: {
                authorization: sessionStorage.getItem('token'),
            },
        })
            .then(res => {
                const comboPai = [];
                comboPai.push(
                    <option key="" value="">
                        Selecione...
                    </option>
                );
                for (let i = 0; i < res.data.length; i++) {
                    comboPai.push(
                        <option key={res.data[i].men_id} value={res.data[i].men_id}>
                            {res.data[i].nome_pai}
                        </option>
                    );
                }
                setMenusPai(comboPai);
            })
            .catch(() => {
                setErro('Erro ao carregar pais.');
            });
    }

    function carregaModelo() {
        axios({
            method: 'GET',
            url: '/modelo-menu',
            headers: {
                authorization: sessionStorage.getItem('token'),
            },
        })
            .then(res => {
                const comboModelo = [];
                comboModelo.push(
                    <option key="" value="">
                        Selecione...
                    </option>
                );
                for (let i = 0; i < res.data.length; i++) {
                    comboModelo.push(
                        <option key={res.data[i].mmu_id} value={res.data[i].mmu_id}>
                            {res.data[i].mmu_nome}
                        </option>
                    );
                }
                setModelos(comboModelo);
            })
            .catch(() => {
                setErro('Erro ao carregar modelos.');
            });
    }

    function carregaTela() {
        axios({
            method: 'GET',
            url: '/telas',
            headers: {
                authorization: sessionStorage.getItem('token'),
            },
        })
            .then(res => {
                const comboTela = [];
                comboTela.push(
                    <option key="" value="">
                        Selecione...
                    </option>
                );
                for (let i = 0; i < res.data.length; i++) {
                    comboTela.push(
                        <option key={res.data[i].tel_id} value={res.data[i].tel_id}>
                            {res.data[i].tel_nome}
                        </option>
                    );
                }
                setTelas(comboTela);
            })
            .catch(() => {
                setErro('Erro ao carregar telas.');
            });
    }

    useEffect(() => {
        async function carrega() {
            carregaGrid();
            carregaPai();
            carregaModelo();
            carregaTela();
        }
        carrega();
    }, []);

    function abreHint(mensagem) {
        setSalva(true);
        setMensagemHint(mensagem);
    }

    function salvaTela() {
        if (menNome.trim() === '') {
            setErro('Nome em branco.');
            return;
        }
        if (menId === undefined) {
            axios({
                method: 'POST',
                url: '/menu',
                data: {
                    men_id: null,
                    men_id_pai: menIdPai,
                    men_url: menUrl,
                    tel_id: telId,
                    mmu_id: mmuId,
                    men_ordem_pai: menOrdemPai,
                    men_nome: menNome.trim(),
                    tel_interna: telInterna,
                },
                headers: {
                    authorization: sessionStorage.getItem('token'),
                },
            })
                .then(() => {
                    limpaCampos();
                    carregaGrid();
                    abreHint('Inserido com sucesso.');
                })
                .catch(() => {
                    setErro('Erro ao inserir registro.');
                });
        } else {
            axios({
                method: 'PUT',
                url: `menu/${menId}`,
                data: {
                    men_id_pai: menIdPai,
                    men_url: menUrl,
                    tel_id: telId,
                    mmu_id: mmuId,
                    men_ordem_pai: menOrdemPai,
                    men_nome: menNome.trim(),
                    tel_interna: telInterna,
                },
                headers: {
                    authorization: sessionStorage.getItem('token'),
                },
            })
                .then(() => {
                    limpaCampos();
                    carregaGrid();
                    abreHint('Editado com sucesso.');
                })
                .catch(() => {
                    setErro('Erro ao editar registro.');
                });
        }
    }

    function fechaModal() {
        setShow(false);
    }

    function exclui() {
        axios({
            method: 'DELETE',
            url: `menu/${menId}`,
            headers: {
                authorization: sessionStorage.getItem('token'),
            },
        })
            .then(() => {
                limpaCampos();
                carregaGrid();
                abreHint('Excluído com sucesso.');
                fechaModal();
            })
            .catch(err => {
                setErro(err.response.data.error);
                fechaModal();
            });
    }

    function fechaHint() {
        setSalva(false);
        setMensagemHint('');
    }

    function abreModal() {
        if (menId === undefined) {
            setErro('Selecione um registro para excluir.');
        } else {
            setShow(true);
        }
    }

    return (
        <>
            <Container>
                <Autorizacao tela="Menus" />
                <Header />
                <AsideLeft>
                    <Menu />
                </AsideLeft>
                <Main>
                    <fieldset>
                        <legend>Menus</legend>
                        <Erro>{erro}</Erro>
                        <form noValidate autoComplete="off">
                            <input id="menId" value={menId} onChange={handleMenId} type="hidden" />
                            <ContainerMenu1>
                                <fieldset>
                                    <legend>Menu pai</legend>
                                    <select id="selectPai" onChange={handleMenIdPai} value={menIdPai}>
                                        {menusPai}
                                    </select>
                                </fieldset>
                                <fieldset>
                                    <legend>Modelo de menu</legend>
                                    <select id="selectModelo" onChange={handleMmuId} value={mmuId}>
                                        {modelos}
                                    </select>
                                </fieldset>
                                <fieldset>
                                    <legend>Item</legend>
                                    <input required id="menNome" type="text" value={menNome} onChange={handleMenNome} size="60" maxLength="60" />
                                </fieldset>
                            </ContainerMenu1>
                            <ContainerMenu2>
                                <fieldset>
                                    <legend>Url</legend>
                                    <input id="menUrl" type="text" value={menUrl} onChange={handleMenUrl} size="70" maxLength="200" />
                                </fieldset>
                                <fieldset>
                                    <legend>Tela</legend>
                                    <select id="selectTela" onChange={handleTelId} value={telId}>
                                        {telas}
                                    </select>
                                </fieldset>
                                <fieldset>
                                    <legend>Ordem pai</legend>
                                    <input id="menOrdemPai" type="text" value={menOrdemPai} onChange={handleMenOrdemPai} size="5" maxLength="10" />
                                </fieldset>
                                <EstiloCheck>
                                    <input type="checkbox" name="interno" id="interno" value={telInterna} checked={telInterna} onChange={handleTelInterna} />
                                    <span>Tela interna</span>
                                </EstiloCheck>
                            </ContainerMenu2>
                        </form>
                        <ContainerBotoes>
                            <button type="button" id="btnSalva" onClick={salvaTela}>
                                <FaRegSave />
                                &nbsp;Salvar
                            </button>
                            <button type="button" id="btnExclui" onClick={abreModal}>
                                <FaRegTrashAlt />
                                &nbsp;Excluir
                            </button>
                            <button type="button" id="btnLimpa" onClick={limpaCampos}>
                                <FaSyncAlt />
                                &nbsp;Limpar campos
                            </button>
                        </ContainerBotoes>
                        <MaterialTable
                            columns={[
                                {
                                    hidden: true,
                                    field: 'men_id',
                                    type: 'numeric',
                                },
                                {
                                    hidden: true,
                                    field: 'men_id_pai',
                                    type: 'numeric',
                                },
                                {
                                    hidden: true,
                                    field: 'tel_interna',
                                    type: 'boolean',
                                },
                                {
                                    hidden: true,
                                    field: 'mmu_id',
                                    type: 'numeric',
                                },
                                {
                                    hidden: true,
                                    field: 'tel_id',
                                    type: 'numeric',
                                },
                                {
                                    title: 'Pai',
                                    field: 'nome_pai',
                                },
                                {
                                    title: 'Modelo',
                                    field: 'mmu_nome',
                                },
                                {
                                    title: 'Item',
                                    field: 'men_nome',
                                },
                                {
                                    title: 'Url',
                                    field: 'men_url',
                                },
                                {
                                    title: 'Tela',
                                    field: 'tel_nome',
                                },
                                {
                                    title: 'Ordem do pai',
                                    field: 'men_ordem_pai',
                                },
                            ]}
                            data={telasMenu}
                            actions={[
                                {
                                    icon: () => <FaRegEdit />,
                                    tooltip: 'Editar',
                                    onClick: (event, rowData) => preencheCampos(rowData.men_id, rowData.men_id_pai, rowData.men_nome, rowData.men_url, rowData.tel_id, rowData.mmu_id, rowData.men_ordem_pai, rowData.tel_interna),
                                },
                            ]}
                            options={tabelas.opcoes}
                            icons={tabelas.icones}
                            localization={tabelas.localizacao}
                        />
                        <Snackbar anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }} open={salva} onClose={fechaHint} autoHideDuration={500} message={mensagemHint} />
                        <Modal open={show} onClose={fechaModal}>
                            <ModalApaga>
                                <h3>Deseja apagar o registro?</h3>
                                <div>
                                    <button type="submit" startIcon={<Check />} onClick={exclui}>
                                        Sim
                                    </button>
                                    <button type="submit" startIcon={<Clear />} onClick={fechaModal}>
                                        Não
                                    </button>
                                </div>
                            </ModalApaga>
                        </Modal>
                    </fieldset>
                </Main>
            </Container>
        </>
    );
}

export default TelaMenu;
