import React from 'react';
import Collapse from '@material-ui/core/Collapse';

export default class TabelaManifestacoes extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            datas: [
                { name: 'or1', status: 11 },
                { name: 'or3', status: 2 },
                { name: 'or2', status: 22 },
            ],
            expanded: [],
            isOpen: true,
        };
    }

    toogleContent(openIs) {
        this.setState({
            isOpen: !openIs,
        });
    }

    render() {
        return (
            <>
                <table>
                    <thead className="text-primary">
                        <tr>
                            <th>Name</th>
                            <th>Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.state.datas.map((data, i) => (
                            <tr id={i} onClick={this.toogleContent.bind(this, this.state.isOpen)}>
                                <td>{data.name}</td>
                                <td>
                                    <Collapse isOpen={this.state.isOpen}>{data.status}</Collapse>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </>
        );
    }
}
