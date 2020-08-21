import React from 'react';
import {
    FaAngleDoubleRight,
    FaAngleLeft,
    FaAngleDoubleLeft,
    FaAngleRight,
    FaSort,
} from 'react-icons/fa';

export const tabelas = {
    localizacao: {
        pagination: {
            labelDisplayedRows: '{from}-{to} de {count}',
            labelRowsSelect: 'linhas',
            nextTooltip: 'Próxima',
            firstTooltip: 'Primeira',
            lastTooltip: 'Última',
            previousTooltip: 'Anterior',
        },
        header: {
            actions: '',
        },
        body: {
            emptyDataSourceMessage: 'Sem registros para mostrar.',
        },
    },
    opcoes: {
        search: false,
        toolbar: false,
        pageSize: 10,
        headerStyle: {
            zIndex: 0,
            borderRadius: 4,
        },
    },
    icones: {
        FirstPage: () => <FaAngleDoubleLeft />,
        LastPage: () => <FaAngleDoubleRight />,
        NextPage: () => <FaAngleRight />,
        PreviousPage: () => <FaAngleLeft />,
        SortArrow: () => <FaSort />,
    },
};
