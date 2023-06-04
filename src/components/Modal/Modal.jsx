// Modal.jsx
import React, { Component } from 'react';
import { createPortal } from 'react-dom';
import PropTypes from 'prop-types';

import Spinner from 'components/Spinner';
import { Overlay, ModalEl, LargeImageStyled } from './Modal.styled';

const modalRoot = document.querySelector('#modal-root');

class Modal extends Component {
  componentDidMount() {
    window.addEventListener('keydown', this.handleKeyDown);
  }

  componentWillUnmount() {
    window.removeEventListener('keydown', this.handleKeyDown);
  }

  handleKeyDown = event => {
    const { onClose } = this.props;
    if (event.code === 'Escape') {
      onClose();
    }
  };

  handleBackdropClick = event => {
    const { onClose } = this.props;
    if (event.currentTarget === event.target) {
      onClose();
    }
  };

  render() {
    const {
      largeImage: { largeImageURL, tags },
      isLargeImageLoaded,
      onImageLoad,
    } = this.props;

    return createPortal(
      <Overlay onClick={this.handleBackdropClick}>
        <ModalEl>
          {!isLargeImageLoaded && <Spinner />}
          <LargeImageStyled
            src={largeImageURL}
            alt={`Image of ${tags}`}
            onLoad={onImageLoad}
            isLargeImageLoaded={isLargeImageLoaded}
          />
        </ModalEl>
      </Overlay>,
      modalRoot
    );
  }
}

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
