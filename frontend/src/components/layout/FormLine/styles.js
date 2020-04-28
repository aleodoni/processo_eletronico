import styled from 'styled-components';

export const Container = styled.div`
    display: flex;
    flex-direction: row;
    flex: ${props => props.size};
`;
