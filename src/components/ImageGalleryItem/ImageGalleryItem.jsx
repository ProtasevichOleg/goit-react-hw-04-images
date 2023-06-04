// ImageGalleryItem.jsx
import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { GalleryItem, GalleryImage } from './ImageGalleryItem.styled';

class ImageGalleryItem extends Component {
  handleClick = () => {
    const { image, onImageClick } = this.props;

    onImageClick(image);
  };

  render() {
    const { webformatURL, tags } = this.props.image;

    return (
      <GalleryItem onClick={this.handleClick}>
        <GalleryImage src={webformatURL} alt={`Image of ${tags}`} />
      </GalleryItem>
    );
  }
}

ImageGalleryItem.propTypes = {
  image: PropTypes.shape({
    webformatURL: PropTypes.string.isRequired,
    tags: PropTypes.string.isRequired,
  }).isRequired,
  onImageClick: PropTypes.func.isRequired,
};

export default ImageGalleryItem;
