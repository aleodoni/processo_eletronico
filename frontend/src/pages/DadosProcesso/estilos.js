export const styles = {
    lateral: {
      paddingLeft: 300,
    },
    fundoHeader: {
        background: '#EFF8FB',
        color: '#000000',
        height: '0px',
    },
    erro: {
        fontFamily: 'Arial, Helvetica, sans-serif',
        fontSize: '14px',
        color: 'red',
        paddingBottom: '10px',
    },
    labelUpload:  {
        cursor: 'pointer',
        fontFamily: 'Arial, Helvetica, sans-serif',
        fontSize: '16px',
        border: '1px solid',
        borderRadius: '5px',
        paddingTop: '3px',
        paddingBottom: '5px',
        paddingLeft: '10px',
        paddingRight: '10px',
        borderColor: '#4859B8',
        background: '#4859B8',
        color: '#FFFFFF',
        '&:hover': {
            backgroundColor: '#303F9F'
        }
    },
    modal: {
        position: 'absolute',
        fontFamily: "Arial, Helvetica, sans-serif",
        width: 400,
        border: '2px solid #116FBF',
        borderRadius: '5px',
        backgroundColor: '#FFFFFF',
        left: '40%',
        top: '40%',
        textAlign: 'center',
        padding: '10px;',
    },
    campoUpload:  {
        opacity: '0',
        position: 'absolute',
        zIndex: -1
    },
    containerDados: {
        display: 'grid',
        gridTemplateColumns: '240px 500px',
        gridGap: '5px',
        marginBottom: '14px'
    },
    containerBotoes: {
        display: 'grid',
        gridTemplateColumns: '170px 220px 140px 220px',
        gridGap: '5px'
    },
    containerArquivos: {
        display: 'grid',
        gridTemplateColumns: '775px',
        gridGap: '5px'
    },
    botaoTramita: {
        backgroundColor: 'green',
        '&:hover': {
            backgroundColor: '#3CB371'
        }
    },
    containerIniciativa: {
        display: 'grid',
        gridTemplateColumns: '773px',
        gridTemplateRows: '58px',
        gridGap: '5px',
        marginBottom: '14px',
    },
    fieldSetIniciativa: {
        borderColor: '#303F9F',
        borderRadius: '5px',
        fontFamily: 'Arial, Helvetica, sans-serif',
    },
    legendIniciativa: {
        color: '#303F9F',
        fontFamily: 'Arial, Helvetica, sans-serif',
    },
    descDadosIniciativa: {
        fontFamily: 'Arial, Helvetica, sans-serif',
        fontSize: '16px',
        fontWeight: 'normal',
        paddingBottom: '50px'
    },
    tituloDados: {
        fontFamily: 'Arial, Helvetica, sans-serif',
        fontSize: '14px',
        fontWeight: 'bold'
    },
    descDados: {
        fontFamily: 'Arial, Helvetica, sans-serif',
        fontSize: '14px',
        fontWeight: 'normal'
    },
    botaoComoLink: {
        background: 'none',
        border: 'none',
        padding: '3px',
        fontFamily: 'Arial, Helvetica, sans-serif',
        color: '#069',
        fontSize: '14px',
        textDecoration: 'underline',
        cursor: 'pointer'
    },
    menuHeader: {
      paddingLeft: '30px',
    }};

