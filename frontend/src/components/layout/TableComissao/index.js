import React from 'react';
import PropTypes from 'prop-types';
import MaterialTable from 'material-table';
import { FaTrashAlt } from 'react-icons/fa';

import { tabelas } from './tabelas';

export default function TableComissao({ columns, data, fillData, ...rest }) {
    return (
        <MaterialTable
            style={{ marginLeft: 6, marginRight: 6, backgroundColor: 'transparent', color: '#fff' }}
            columns={columns}
            data={data}
            actions={[
                {
                    icon: () => <FaTrashAlt />,
                    tooltip: 'Excluir',
                    onClick: (_event, linha) => fillData(linha),
                },
            ]}
            options={tabelas.opcoes}
            icons={tabelas.icones}
            localization={tabelas.localizacao}
            {...rest}
        />
    );
}

TableComissao.propTypes = {
    columns: PropTypes.arrayOf(
        PropTypes.shape({
            title: PropTypes.string,
            field: PropTypes.string,
        })
    ),

    data: PropTypes.arrayOf(PropTypes.object),

    fillData: PropTypes.func.isRequired,
};

TableComissao.defaultProps = {
    columns: null,
    data: null,
};
