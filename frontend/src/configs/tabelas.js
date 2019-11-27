import React from 'react';
import PrimeiroIcon from '@material-ui/icons/FirstPage';
import UltimoIcon from '@material-ui/icons/LastPage';
import ProximoIcon from '@material-ui/icons/NavigateNext';
import AnteriorIcon from '@material-ui/icons/NavigateBefore';
import OrdenaIcon from '@material-ui/icons/UnfoldMore';
export const tabelas = {
    localizacao:
    {
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
        }
    },
    opcoes:
    {
        search: false,
        toolbar: false,
        pageSize: 10,
    },
    icones: {
        FirstPage: () => <PrimeiroIcon />,
        LastPage: () => <UltimoIcon />,
        NextPage: () => <ProximoIcon />,
        PreviousPage: () => <AnteriorIcon />,
        SortArrow: () => <OrdenaIcon />,
    }
};
