import React, { Component } from 'react';
import { Collapse, List, ListItem, ListItemText, withStyles } from '@material-ui/core';
import { Link } from 'react-router-dom';
import { FaHome, FaChevronCircleRight, FaChevronCircleDown, FaCircle } from 'react-icons/fa';
import { Container, Fundo } from './styles';
import { defaultTheme } from '../../styles/theme';

require('dotenv').config();

const StyledListItem = withStyles({
    root: {
        '&:hover': {
            backgroundColor: defaultTheme.hover,
        },
    },
})(ListItem);

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
                                    <StyledListItem button key={subOption.name}>
                                        <FaHome color="#fff" size="20px" />
                                        <ListItemText inset primary={subOption.name} />
                                    </StyledListItem>
                                </Link>
                                <hr />
                            </Fundo>
                        ) : (
                            <Fundo>
                                <Link to={subOption.url} style={{ textDecoration: 'none' }}>
                                    <StyledListItem button key={subOption.name}>
                                        <FaCircle color="#fff" size="1em" />
                                        <ListItemText
                                            primary={subOption.name}
                                            style={{ marginLeft: 10 }}
                                        />
                                    </StyledListItem>
                                </Link>
                            </Fundo>
                        )}
                    </div>
                );
            }
            return (
                <div key={subOption.name}>
                    <Fundo>
                        <StyledListItem button onClick={() => this.handleClick(subOption.name)}>
                            {state[subOption.name] ? (
                                <FaChevronCircleDown color="#fff" size="1em" />
                            ) : (
                                <FaChevronCircleRight color="#fff" size="1em" />
                            )}
                            <ListItemText style={{ marginLeft: 10 }} primary={subOption.name} />
                        </StyledListItem>
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
            <Container>
                <List dense disablePadding>
                    {this.handler(data)}
                </List>
            </Container>
        );
    }
}

export default Menu;
