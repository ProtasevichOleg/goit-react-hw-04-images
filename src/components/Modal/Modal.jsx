// Modal.jsx
import React, { useEffect } from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';

import useKeyPress from 'hooks/useKeyPress';

import Spinner from 'components/Spinner';
import { Overlay, ModalEl, LargeImageStyled } from './Modal.styled';

const modalRoot = document.querySelector('#modal-root');

const Modal = ({ onClose, largeImage, isLargeImageLoaded, onImageLoad }) => {
  const escapePressed = useKeyPress('Escape');

  useEffect(() => {
    if (escapePressed) {
      onClose();
    }
  }, [escapePressed, onClose]);

  const handleBackdropClick = event => {
    if (event.currentTarget === event.target) {
      onClose();
    }
  };

  const { largeImageURL, tags } = largeImage;

  const modalContent = (
    <Overlay onClick={handleBackdropClick}>
      <ModalEl>
        {!isLargeImageLoaded && <Spinner />}
        <LargeImageStyled
          src={largeImageURL}
          alt={`Image of ${tags}`}
          onLoad={onImageLoad}
          isLargeImageLoaded={isLargeImageLoaded}
        />
      </ModalEl>
    </Overlay>
  );

  return ReactDOM.createPortal(modalContent, modalRoot);
};

Modal.propTypes = {
  onClose: PropTypes.func.isRequired,
  largeImage: PropTypes.shape({
    largeImageURL: PropTypes.string.isRequired,
    tags: PropTypes.string.isRequired,
  }).isRequired,
  isLargeImageLoaded: PropTypes.bool.isRequired,
  onImageLoad: PropTypes.func.isRequired,
};

export default Modal;
