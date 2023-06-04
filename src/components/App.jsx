// App.jsx
import React, { Component } from 'react';

import fetchImages from 'utils/api';
import showMessage from 'utils/swalConfig';

import Layout from './layout';
import Searchbar from './Searchbar';
import ImageGallery from './ImageGallery';
import Button from './Button';
import Modal from './Modal';
import Spinner from './Spinner';
import { SpinnerWrapper } from './App.styled';

class App extends Component {
  state = {
    images: [],
    loading: false,
    error: null,
    searchQuery: '',
    currentPage: 1,
    largeImage: null,
    showModal: false,
    isLargeImageLoaded: false,
    hasMoreImages: true,
    total: 0,
  };

  componentDidUpdate(_, prevState) {
    const { searchQuery, currentPage } = this.state;
    const prevPage = prevState.currentPage;
    const prevQuery = prevState.searchQuery;

    if (prevQuery !== searchQuery || prevPage !== currentPage) {
      this.fetchImages(searchQuery, currentPage);
    }
  }

  fetchImages = async (searchQuery, currentPage) => {
    this.setState({ loading: true });

    try {
      const { hits, totalHits } = await fetchImages(searchQuery, currentPage);

      if (hits.length === 0) {
        return showMessage(
          `No images found for ${searchQuery}. Please try another query.`
        );
      }

      this.setState(prevState => ({
        images: [...prevState.images, ...hits],
        total: totalHits,
      }));
    } catch (error) {
      this.setState({ error: error.message });
    } finally {
      this.setState({ loading: false });
    }
  };

  handleSearchSubmit = newQuery => {
    if (newQuery === this.state.searchQuery) {
      return showMessage(
        'You entered the same search query. Please enter a new one.'
      );
    }

    this.setState({
      searchQuery: newQuery,
      currentPage: 1,
      images: [],
    });
  };

  loadMoreImages = () => {
    this.setState(prevState => ({ currentPage: prevState.currentPage + 1 }));
  };

  openModal = image => {
    this.setState({ largeImage: image, showModal: true });
  };

  closeModal = () => {
    this.setState({
      largeImage: null,
      showModal: false,
      isLargeImageLoaded: false,
    });
  };

  handleImageLoad = () => {
    this.setState({ isLargeImageLoaded: true });
  };

  render() {
    const {
      images,
      loading,
      error,
      largeImage,
      showModal,
      isLargeImageLoaded,
      hasMoreImages,
      total,
    } = this.state;

    const {
      handleSearchSubmit,
      openModal,
      loadMoreImages,
      closeModal,
      handleImageLoad,
    } = this;

    const totalPage = total / images.length;

    return (
      <Layout className="App">
        <Searchbar onSubmit={handleSearchSubmit} isSubmitting={loading} />
        {error && showMessage('Something went wrong...')}

        <ImageGallery images={images} onImageClick={openModal} />

        {loading && (
          <SpinnerWrapper>
            <Spinner />
          </SpinnerWrapper>
        )}
        {totalPage > 1 && !loading && images.length > 0 && hasMoreImages && (
          <Button onClick={loadMoreImages} />
        )}

        {showModal && (
          <Modal
            onClose={closeModal}
            largeImage={largeImage}
            isLargeImageLoaded={isLargeImageLoaded}
            onImageLoad={handleImageLoad}
          />
        )}
      </Layout>
    );
  }
}

export default App;
