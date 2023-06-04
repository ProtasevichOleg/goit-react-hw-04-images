// ImageGalleryItem.jsx
import React from 'react';
import PropTypes from 'prop-types';

import { GalleryItem, GalleryImage } from './ImageGalleryItem.styled';

const ImageGalleryItem = ({ image, onImageClick }) => {
  const handleClick = () => {
    onImageClick(image);
  };

  const { webformatURL, tags } = image;

  return (
    <GalleryItem onClick={handleClick}>
      <GalleryImage src={webformatURL} alt={`Image of ${tags}`} />
    </GalleryItem>
  );
};

ImageGalleryItem.propTypes = {
  image: PropTypes.shape({
    webformatURL: PropTypes.string.isRequired,
    tags: PropTypes.string.isRequired,
  }).isRequired,
  onImageClick: PropTypes.func.isRequired,
};

export default ImageGalleryItem;
