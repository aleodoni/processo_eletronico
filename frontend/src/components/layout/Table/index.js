import React from 'react';
import PropTypes from 'prop-types';
import MaterialTable from 'material-table';
import { FaRegEdit } from 'react-icons/fa';

import { tabelas } from '../../../configs/tabelas';

export default function Table({ columns, data, fillData, ...rest }) {
    return (
        <MaterialTable
            style={{ marginLeft: 6, marginRight: 6 }}
            columns={columns}
            data={data}
            actions={[
                {
                    icon: () => <FaRegEdit />,
                    tooltip: 'Editar',
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

Table.propTypes = {
    columns: PropTypes.arrayOf(
        PropTypes.shape({
            title: PropTypes.string,
            field: PropTypes.string,
        })
    ),

    data: PropTypes.arrayOf(PropTypes.object),

    fillData: PropTypes.func.isRequired,
};

Table.defaultProps = {
    columns: null,
    data: null,
};
