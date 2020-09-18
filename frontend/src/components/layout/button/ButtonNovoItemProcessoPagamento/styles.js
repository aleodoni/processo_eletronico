import styled from 'styled-components';
import { lighten } from 'polished';

const handleColorType = cor => {
    switch (cor) {
        case true:
            return 'color: #A9A9A9;cursor: default;';
        default:
            return 'color: #fff;cursor: pointer;';
    }
};

const handleColorHover = corHover => {
    switch (corHover) {
        case true:
            return 'background: transparent;';
        default:
            return lighten(0.2, '#303f9f');
    }
};

export const Container = styled.button`
    display: flex;
    align-items: center;

    background: ${({ theme }) => theme.primary};
    border: 0;
    border-radius: 4px;
    height: 36px;
    padding: 0 15px;
    ${({ cor }) => handleColorType(cor)};
    margin: 0 0 10px;
    font-size: 14px;
    transition: background 0.2s;

    &:hover {
        ${({ corHover }) => handleColorHover(corHover)};
        /* background: ${({ theme }) => theme.hover}; */
    }

    svg {
        margin-right: 10px;
        margin-left: 5px;
    }
`;
