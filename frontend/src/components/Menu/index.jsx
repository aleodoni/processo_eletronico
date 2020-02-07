import React, { Component } from 'react';
import { Collapse, List, ListItem, ListItemText } from '@material-ui/core';
import { Link } from 'react-router-dom';
import { FaHome, FaChevronCircleRight, FaChevronCircleDown } from 'react-icons/fa';
import { Container, Fundo } from './styles';

require('dotenv').config();

class Menu extends Component {
    constructor() {
        super();
        this.state = {
            data: [],
        };
    }

    async componentDidMount() {
        const dados = [];
        const data = JSON.parse(sessionStorage.getItem('menu'));

        Object.keys(data).forEach(key => {
            dados.push(data[key]);
        });

        this.setState({
            data: dados,
        });
    }

    handleOpen = () => {
        this.setState({ mostraModalSair: true });
    };

    handleClose = () => {
        this.setState({ mostraModalSair: false });
    };

    handleClick(item) {
        this.setState(prevState => ({ [item]: !prevState[item] }));
    }

    handler(children) {
        const { state } = this;

        return children.map(subOption => {
            if (!subOption.children) {
                return (
                    <div key={subOption.name}>
                        {subOption.name === 'Home' ? (
                            <Fundo>
                                <Link to={subOption.url} style={{ textDecoration: 'none' }}>
                                    <ListItem button key={subOption.name}>
                                        <FaHome color="#fff" size="2em" />
                                        <ListItemText inset primary={subOption.name} />
                                    </ListItem>
                                </Link>
                                <hr />
                            </Fundo>
                        ) : (
                            <Fundo>
                                <Link to={subOption.url} style={{ textDecoration: 'none' }}>
                                    <ListItem button key={subOption.name}>
                                        <span>
                                            <ListItemText inset primary={subOption.name} />
                                        </span>
                                    </ListItem>
                                </Link>
                            </Fundo>
                        )}
                    </div>
                );
            }
            return (
                <div key={subOption.name}>
                    <Fundo>
                        <ListItem button onClick={() => this.handleClick(subOption.name)}>
                            {state[subOption.name] ? <FaChevronCircleDown color="#fff" size="1em" /> : <FaChevronCircleRight color="#fff" size="1em" />}
                            <ListItemText inset primary={subOption.name} />
                        </ListItem>
                        <Collapse in={state[subOption.name]} timeout="auto" unmountOnExit>
                            {this.handler(subOption.children)}
                        </Collapse>
                    </Fundo>
                </div>
            );
        });
    }

    render() {
        const { data } = this.state;
        return (
            <>
                <Container>
                    <List>{this.handler(data)}</List>
                </Container>
            </>
        );
    }
}

export default Menu;
