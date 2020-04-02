import { lighten } from 'polished';

export const defaultTheme = {
    primary: '#303f9f',
    error: '#d44059',
    input: 'rgba(48, 63, 159, 0.8)',
    placeholder: 'rgba(255, 255, 255, 0.5)',

    hover: lighten(0.1, '#303f9f'),
    gradient: 'linear-gradient(#25212e, #303f9f)',
    text: '#fff',
};
