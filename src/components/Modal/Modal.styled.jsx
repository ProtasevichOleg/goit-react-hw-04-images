import styled from 'styled-components';

export const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: rgba(0, 0, 0, 0.8);
  z-index: 1200;
`;

export const ModalEl = styled.div`
  /* max-width: calc(100vw - 48px);
  max-height: calc(100vh - 24px); */
`;

export const LargeImageStyled = styled.img`
  display: ${props => (props.isLargeImageLoaded ? 'block' : 'none')};
  max-width: 90vw;
  max-height: 90vh;
`;
