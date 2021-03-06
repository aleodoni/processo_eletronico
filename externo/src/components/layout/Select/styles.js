import styled from 'styled-components';
import img from '../../../assets/seta-combo.jpg';

export const Container = styled.div`
    display: flex;
    flex-direction: column;
    flex: ${(props) => props.size};

    padding-left: 5px;
    padding-right: 4px;

    span.error {
        font-size: 14px;
        color: ${({ theme }) => theme.error};
        align-self: flex-start;
        margin: 0 0 10px;
        font-weight: bold;
    }

    label {
        font-size: 16px;
        font-weight: bold;
        margin-bottom: 3px;
        color: ${({ theme }) => theme.label};
    }
`;

export const BasicSelect = styled.select`
    display: flex;

    appearance: none;
    background: url(${img}) no-repeat #2e8b57 right;

    background-color: ${({ theme }) => theme.inputBackground};
    height: 28px;
    border: 0;
    border-radius: 4px;
    padding: 0 5px;
    color: ${({ theme }) => theme.text};
    margin: 1px 0 10px;

    option {
        display: flex;
        min-height: 36px;
        height: 36px;
        color: ${({ theme }) => theme.primary};
    }

    option:hover {
        background: #fff !important;
    }
`;
