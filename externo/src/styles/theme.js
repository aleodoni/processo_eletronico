import { lighten } from 'polished';

export const defaultTheme = {
    primary: '#2E8B57',
    error: '#d44059',
    input: '#2E8B57',
    placeholder: 'rgba(255, 255, 255, 0.5)',
    inputBackground: lighten(0.25, '#2E8B57'),
    inputBorder: lighten(0.1, '#2E8B57'),
    backGround: lighten(0.1, '#2E8B57'),

    hover: lighten(0.2, '#2E8B57'),
    gradient: 'linear-gradient(#25212e, #2E8B57)',
    text: '#fff',
    label: '#ccc',
};
