import { lighten } from 'polished';

export const defaultTheme = {
    primary: '#293689',
    error: '#d44059',
    input: 'rgba(48, 63, 159, 0.8)',
    placeholder: 'rgba(255, 255, 255, 0.5)',
    inputBackground: lighten(0.25, '#303f9f'),
    inputBorder: lighten(0.1, '#303f9f'),
    backGround: lighten(0.1, '#293689'),

    hover: lighten(0.2, '#303f9f'),
    gradient: 'linear-gradient(#25212e, #303f9f)',
    text: '#fff',
    label: '#ccc',
};
