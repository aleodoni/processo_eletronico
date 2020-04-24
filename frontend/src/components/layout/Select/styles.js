import styled from 'styled-components';
import Select from 'react-select';

export const Container = styled.div`
    display: flex;
    flex-direction: column;
    width: 100%;

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
        margin-left: 5px;
        margin-bottom: 3px;
        color: ${({ theme }) => theme.label};
    }
`;

export const BasicSelect = styled(Select)`
  .react-select__single-value {
      color: ${({ theme }) => theme.text};
    }
  }

  .react-select__placeholder {
      color: ${({ theme }) => theme.text};
  }

  .react-select__control {
    margin-left: 4px;
    margin-right: 4px;
  }
`;
