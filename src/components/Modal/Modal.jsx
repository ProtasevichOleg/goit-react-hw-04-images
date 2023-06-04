// Modal.jsx
import React, { useEffect } from 'react';
// import { createPortal } from 'react-dom';
import PropTypes from 'prop-types';

import Spinner from 'components/Spinner';
import { Overlay, ModalEl, LargeImageStyled } from './Modal.styled';

// const modalRoot = document.querySelector('#modal-root');

const Modal = ({ onClose, largeImage, isLargeImageLoaded, onImageLoad }) => {
  useEffect(() => {
    const handleKeyDown = event => {
      if (event.code === 'Escape') {
        onClose();
      }
    };

    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [onClose]);

  const handleBackdropClick = event => {
    if (event.currentTarget === event.target) {
      onClose();
    }
  };

  const { largeImageURL, tags } = largeImage;

  return (
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
