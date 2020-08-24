import { lighten } from 'polished';

export const defaultTheme = {
    primary: '#009688',
    error: '#d44059',
    input: '#009688',
    placeholder: 'rgba(255, 255, 255, 1)',
    inputBackground: lighten(0.1, '#00796b'),
    inputBorder: lighten(0.1, '#009688'),
    backGround: lighten(0.1, '#009688'),

    hover: lighten(0.1, '#009688'),
    gradient: 'linear-gradient(#25212e, #009688)',
    text: '#fff',
    label: '#ccc',
};
