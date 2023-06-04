import styled from 'styled-components';

export const Container = styled.div`
  width: 800px;
  margin: 0 auto;
  padding: 20px;
  background-color: ${props => props.theme.colors.containerBgColor};
`;
